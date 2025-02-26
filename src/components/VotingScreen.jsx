import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useRoom } from "../contexts/RoomContext";

const VotingScreen = () => {
  const { room, createRoom, participants, devVotes, qaVotes, isDevRevealed, isQaRevealed, submitVote, revealVotes, resetVotes } = useRoom();
  const [participantId] = useState(() => `user-${Math.random().toString(36).substr(2, 9)}`);
  const votingValues = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];


  const handleVoteSelect = (value) => {
    submitVote(participantId, value);
  };

  const handleQaVoteSelect = (value) => {
    submitVote(participantId, value, 'qa');
  };

  useEffect(() => {
    if (!room) {
      createRoom();
    }
  }, [room, createRoom]);

  if (!room) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
        <Typography>Creating room...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          Room Code:
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {room.code}
        </Typography>
        <Typography variant="body2" sx={{ ml: 2, color: "rgba(255, 255, 255, 0.7)" }}>
          Participants: {participants.length}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Dev Estimate
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {votingValues.map((value) => (
            <Grid item key={`vote1-${value}`}>
              <Paper
                elevation={devVotes[participantId] === value ? 6 : 1}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: devVotes[participantId] === value
                    ? "#e3f2fd"
                    : "white",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
                onClick={() => handleVoteSelect(value)}
              >
                <Typography variant="h6">
                  {value === 0.5 ? "½" : value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 4,
            mb: 4,
            p: 3,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
            minHeight: 80,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Object.entries(devVotes).length > 0 ? (
            Object.entries(devVotes).map(([pid, value], index) => (
              <Paper
                key={index}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "white",
                  transform: isDevRevealed ? "rotateY(0deg)" : "rotateY(180deg)",
                  transition: "transform 0.6s",
                  position: "relative",
                }}
              >
                {isDevRevealed ? (
                  <Typography variant="h6">
                    {value === 0.5 ? "½" : value}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      bgcolor: "#1e88e5",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              No cards selected
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => revealVotes('dev')}
            disabled={Object.keys(devVotes).length === 0}
            sx={{
              bgcolor: "#90caf9",
              color: "#1a1d21",
              "&:hover": {
                bgcolor: "#42a5f5",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Reveal
          </Button>
          <Button
            variant="outlined"
            onClick={() => resetVotes('dev')}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.23)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>


      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          QA Estimate
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {votingValues.map((value) => (
            <Grid item key={`vote2-${value}`}>
              <Paper
                elevation={qaVotes[participantId] === value ? 6 : 1}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: qaVotes[participantId] === value
                    ? "#e3f2fd"
                    : "white",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
                onClick={() => handleQaVoteSelect(value)}
              >
                <Typography variant="h6">
                  {value === 0.5 ? "½" : value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 4,
            mb: 4,
            p: 3,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
            minHeight: 80,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Object.entries(qaVotes).length > 0 ? (
            Object.entries(qaVotes).map(([pid, value], index) => (
              <Paper
                key={index}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "white",
                  transform: isQaRevealed ? "rotateY(0deg)" : "rotateY(180deg)",
                  transition: "transform 0.6s",
                  position: "relative",
                }}
              >
                {isQaRevealed ? (
                  <Typography variant="h6">
                    {value === 0.5 ? "½" : value}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      bgcolor: "#1e88e5",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
              No cards selected
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => revealVotes('qa')}
            disabled={Object.keys(qaVotes).length === 0}
            sx={{
              bgcolor: "#90caf9",
              color: "#1a1d21",
              "&:hover": {
                bgcolor: "#42a5f5",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Reveal
          </Button>
          <Button
            variant="outlined"
            onClick={() => resetVotes('qa')}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.23)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VotingScreen;
