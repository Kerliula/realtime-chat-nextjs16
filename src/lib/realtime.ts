import { Realtime, InferRealtimeEvents } from "@upstash/realtime";
import { redis } from "@/lib/redis";
import z from "zod/v4";

const message = z.object({
  id: z.string(),
  sender: z.string().min(1).max(100),
  text: z.string().min(1).max(1000),
  timestamp: z.number(),
  roomId: z.string().min(1),
  token: z.string().min(1).optional(),
});

const schema = {
  chat: {
    message,
    destroy: z.object({
      isDestroyed: z.literal(true),
      roomId: z.string().min(1),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export type Message = z.infer<typeof message>;
