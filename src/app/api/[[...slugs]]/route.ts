import { redis } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";
import { z } from "zod";
import { Message, realtime } from "@/lib/realtime";

const ROOM_TTL_SECONDS = 60 * 10; // 10 minutes

const rooms = new Elysia({ prefix: "/rooms" })
  .post("/create", async () => {
    const roomId = nanoid();

    await redis.hset(`meta:${roomId}`, {
      connected: [],
      createdAt: Date.now().toString(),
    });

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

    return { roomId };
  })
  .get(
    "/getTimeRemaining",
    async ({ query }) => {
      const roomId = query.roomId;
      const timeRemaining = await redis.ttl(`meta:${roomId}`);
      return { timeRemaining };
    },
    { query: z.object({ roomId: z.string().min(1) }) }
  );

const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ body, roomId, token }) => {
      const { sender, text } = body;

      console.log("Posting message to room:", roomId);

      const roomExists = await redis.exists(`meta:${roomId}`);

      if (!roomExists) {
        throw new Error("Room does not exist");
      }

      const message: Message = {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        roomId,
      };

      await redis.rpush(`messages:${roomId}`, { ...message, token });
      await realtime.channel(roomId).emit("chat.message", message);

      const remaining = await redis.ttl(`meta:${roomId}`);

      await redis.expire(`messages:${roomId}`, remaining);
      await redis.expire(`meta:${roomId}`, remaining);
      await redis.expire(roomId, remaining);
    },
    {
      query: z.object({
        roomId: z.string().min(1),
      }),
      body: z.object({
        sender: z.string().min(1).max(100),
        text: z.string().min(1).max(1000),
      }),
    }
  )
  .get(
    "/",
    async ({ roomId, token }) => {
      const messages = await redis.lrange<Message>(`messages:${roomId}`, 0, -1);

      return {
        messages: messages.map((m) => ({
          ...m,
          token: m.token === token ? m.token : undefined,
        })),
      };
    },
    { query: z.object({ roomId: z.string().min(1) }) }
  );

const app = new Elysia({ prefix: "/api" }).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
