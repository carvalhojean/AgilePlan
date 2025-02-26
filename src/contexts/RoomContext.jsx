import { createContext, useContext, useState, useEffect } from "react";

const RoomContext = createContext();

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
      setParticipants((prev) => [...prev, participant]);
      return true;
    }
    return false;
  };

  const leaveRoom = (participantId) => {
    setParticipants((prev) => prev.filter((p) => p.id !== participantId));
    setVotes((prev) => {
      const newVotes = { ...prev };
      delete newVotes[participantId];
      return newVotes;
    });
  };

  const submitVote = (participantId, value, type = "dev") => {
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
  };

  const revealVotes = (type = "dev") => {
    if (type === "dev") {
      setIsDevRevealed(true);
    } else if (type === "qa") {
      setIsQaRevealed(true);
    }
  };

  const resetVotes = (type = "dev") => {
    if (type === "dev") {
      setDevVotes({});
      setIsDevRevealed(false);
    } else if (type === "qa") {
      setQaVotes({});
      setIsQaRevealed(false);
    }
  };

  const closeRoom = () => {
    setRoom(null);
    setParticipants([]);
    setVotes({});
    setIsRevealed(false);
  };

  useEffect(() => {
    if (participants.length === 0 && room) {
      closeRoom();
    }
  }, [participants]);

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
