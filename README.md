# Realtime-chat - NextJS16

This is a private, self-destructing chat room application built with Next.js 16, featuring anonymous real-time messaging and rooms that automatically expire after 10 minutes. Users can create rooms, share links, and communicate instantly with WebSocket-based updates.

The project was developed by following the YouTube course "Build a Complete Real-Time Chat with Next.js 16, Redis, Tailwind (2025)" by Josh Tried Coding, incorporating modern web technologies for a seamless, terminal-inspired user experience.

**Course reference:**  
[Build a Complete Real-Time Chat with Next.js 16, Redis, Tailwind (2025)](https://youtu.be/D8CLV-MRH0k?si=k1ydbmSYh8pXI1k-)

## Features
- Anonymous Chat Rooms: Users get auto-generated usernames like anonymous-cat-abc12
- Self-Destructing Rooms: Rooms expire after 10 minutes automatically
- Real-Time Messaging: Instant message updates using Upstash Realtime
- Room Management: Create new rooms, copy room links, manually destroy rooms
- Authentication: Token-based auth via HTTP-only cookies
- Error Handling: Handles room not found, room full, and destroyed room scenarios
- Message History: Persistent messages during room lifetime

## Tech Stack
- Framework: Next.js 16 (App Router)
- Backend: Elysia.js (API framework), Upstash Redis (data storage), Upstash Realtime (real-time messaging)
- State Management: TanStack Query (React Query)
- Validation: Zod
- Language: TypeScript
- Styling: Tailwind CS

## API Endpoints
- `POST /api/rooms/create` — Creates a new chat room
- `GET /api/rooms/getTimeRemaining?roomId={roomId}` — Gets remaining time for a room in seconds
- `POST /api/messages?roomId={roomId}` — Posts a new message to the room
- `GET /api/messages?roomId={roomId}` — Retrieves messages for the room

## Installation

**1.** Clone the repository:
```bash
git clone https://github.com/Kerliula/realtime-chat-nextjs16.git
cd realtime-chat-nextjs16
```
**2.** Install dependencies:
```bash
npm install
# or
yarn install
```
**3.** Copy .env.example to .env and configure your environment variables:
```bash
cp .env.example .env
```
**4.** Start the local development server:
```bash
npm run dev
# or
yarn dev
```
**5.** Open your browser and navigate to:
```bash
http://localhost:3000
```

## License
This project is for learning purposes and is open for personal use.
