import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Redis from 'ioredis';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const REDIS_URL = "redis://default:p9bR9clD3v34i0BA33oDIZY5NM7LokeY@redis-17752.c308.sa-east-1-1.ec2.redns.redis-cloud.com:17752";
const redis = new Redis(REDIS_URL);
const redisSubscriber = new Redis(REDIS_URL);

app.use(express.json());

app.post('/api/check-room', async (req, res) => {
  const { roomCode } = req.body;
  try {
    const roomExists = await redis.exists(`room:${roomCode}`);
    res.json({ exists: roomExists === 1 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check room existence' });
  }
});

redisSubscriber.subscribe('room-events');

redisSubscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  io.to(event.roomCode).emit(event.type, event.data);
});

io.on('connection', (socket) => {
  socket.on('join_room', ({ roomCode, participant }) => {
    socket.join(roomCode);
    redis.set(`room:${roomCode}`, 'active');
    redis.publish('room-events', JSON.stringify({
      type: 'participant_joined',
      roomCode,
      data: participant
    }));
  });

  socket.on('leave_room', ({ roomCode, participantId }) => {
    socket.leave(roomCode);
    redis.publish('room-events', JSON.stringify({
      type: 'participant_left',
      roomCode,
      data: participantId
    }));
  });

  socket.on('submit_vote', ({ roomCode, participantId, value, type }) => {
    redis.publish('room-events', JSON.stringify({
      type: 'vote_submitted',
      roomCode,
      data: { participantId, value, type }
    }));
  });

  socket.on('reveal_votes', ({ roomCode, type }) => {
    redis.publish('room-events', JSON.stringify({
      type: 'votes_revealed',
      roomCode,
      data: type
    }));
  });

  socket.on('reset_votes', ({ roomCode, type }) => {
    redis.publish('room-events', JSON.stringify({
      type: 'votes_reset',
      roomCode,
      data: type
    }));
  });

  socket.on('disconnect', () => {
    // Handle disconnection
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});