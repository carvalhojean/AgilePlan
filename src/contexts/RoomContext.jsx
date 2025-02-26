import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const RoomContext = createContext();
const socket = io("http://localhost:3001", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ["websocket", "polling"],
});

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [devVotes, setDevVotes] = useState({});
  const [qaVotes, setQaVotes] = useState({});
  const [isDevRevealed, setIsDevRevealed] = useState(false);
  const [isQaRevealed, setIsQaRevealed] = useState(false);

  const createRoom = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRoom({
      code,
      createdAt: new Date().toISOString(),
      isActive: true,
    });
    return code;
  };

  const joinRoom = (code, participant) => {
    if (room?.code === code) {
      socket.emit('join_room', { roomCode: code, participant });
      return true;
    }
    return false;
  };

  const leaveRoom = (participantId) => {
    if (room) {
      socket.emit('leave_room', { roomCode: room.code, participantId });
      setParticipants((prev) => prev.filter((p) => p.id !== participantId));
      setDevVotes((prev) => {
        const newVotes = { ...prev };
        delete newVotes[participantId];
        return newVotes;
      });
      setQaVotes((prev) => {
        const newVotes = { ...prev };
        delete newVotes[participantId];
        return newVotes;
      });
    }
  };

  const submitVote = (participantId, value, type = "dev") => {
    if (room) {
      socket.emit('submit_vote', { roomCode: room.code, participantId, value, type });
      if (type === "dev") {
        setDevVotes((prev) => ({
          ...prev,
          [participantId]: value,
        }));
      } else if (type === "qa") {
        setQaVotes((prev) => ({
          ...prev,
          [participantId]: value,
        }));
      }
    }
  };

  const revealVotes = (type = "dev") => {
    if (room) {
      socket.emit('reveal_votes', { roomCode: room.code, type });
      if (type === "dev") {
        setIsDevRevealed(true);
      } else if (type === "qa") {
        setIsQaRevealed(true);
      }
    }
  };

  const resetVotes = (type = "dev") => {
    if (room) {
      socket.emit('reset_votes', { roomCode: room.code, type });
      if (type === "dev") {
        setDevVotes({});
        setIsDevRevealed(false);
      } else if (type === "qa") {
        setQaVotes({});
        setIsQaRevealed(false);
      }
    }
  };

  const closeRoom = () => {
    setRoom(null);
    setParticipants([]);
    setDevVotes({});
    setQaVotes({});
    setIsDevRevealed(false);
    setIsQaRevealed(false);
  };

  useEffect(() => {
    socket.on("participant_joined", (participant) => {
      setParticipants((prev) => [...prev, participant]);
    });

    socket.on("participant_left", (participantId) => {
      setParticipants((prev) => prev.filter((p) => p.id !== participantId));
    });

    socket.on("vote_submitted", ({ participantId, value, type }) => {
      if (type === "dev") {
        setDevVotes((prev) => ({ ...prev, [participantId]: value }));
      } else if (type === "qa") {
        setQaVotes((prev) => ({ ...prev, [participantId]: value }));
      }
    });

    socket.on("votes_revealed", (type) => {
      if (type === "dev") {
        setIsDevRevealed(true);
      } else if (type === "qa") {
        setIsQaRevealed(true);
      }
    });

    socket.on("votes_reset", (type) => {
      if (type === "dev") {
        setDevVotes({});
        setIsDevRevealed(false);
      } else if (type === "qa") {
        setQaVotes({});
        setIsQaRevealed(false);
      }
    });

    return () => {
      socket.off("participant_joined");
      socket.off("participant_left");
      socket.off("vote_submitted");
      socket.off("votes_revealed");
      socket.off("votes_reset");
    };
  }, []);

  const value = {
    room,
    participants,
    devVotes,
    qaVotes,
    isDevRevealed,
    isQaRevealed,
    createRoom,
    joinRoom,
    leaveRoom,
    submitVote,
    revealVotes,
    resetVotes,
    closeRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
