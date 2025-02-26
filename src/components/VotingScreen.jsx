import { useState } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";

const VotingScreen = () => {
  const [roomCode, setRoomCode] = useState(null);
  const [selectedValues1, setSelectedValues1] = useState([]);
  const [isRevealed1, setIsRevealed1] = useState(false);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [isRevealed2, setIsRevealed2] = useState(false);
  const votingValues = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, "?"];

  const generateRoomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(code);
  };

  const handleVoteSelect1 = (value) => {
    setSelectedValues1([...selectedValues1, value]);
  };

  const handleReset1 = () => {
    setSelectedValues1([]);
    setIsRevealed1(false);
  };

  const handleReveal1 = () => {
    setIsRevealed1(true);
  };

  const handleVoteSelect2 = (value) => {
    setSelectedValues2([...selectedValues2, value]);
  };

  const handleReset2 = () => {
    setSelectedValues2([]);
    setIsRevealed2(false);
  };

  const handleReveal2 = () => {
    setIsRevealed2(true);
  };

  if (!roomCode) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={generateRoomCode}
          sx={{
            bgcolor: "#2196f3",
            "&:hover": {
              bgcolor: "#1976d2",
            },
          }}
        >
          Create new room
        </Button>
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
          {roomCode}
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
                elevation={selectedValues1.includes(value) ? 6 : 1}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: selectedValues1.includes(value)
                    ? "#e3f2fd"
                    : "white",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
                onClick={() => handleVoteSelect1(value)}
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
          {selectedValues1.length > 0 ? (
            selectedValues1.map((value, index) => (
              <Paper
                key={index}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "white",
                  transform: isRevealed1 ? "rotateY(0deg)" : "rotateY(180deg)",
                  transition: "transform 0.6s",
                  position: "relative",
                }}
              >
                {isRevealed1 ? (
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
            onClick={handleReveal1}
            disabled={selectedValues1.length === 0}
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
            onClick={handleReset1}
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          QA Estimate
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {votingValues.map((value) => (
            <Grid item key={`vote2-${value}`}>
              <Paper
                elevation={selectedValues2.includes(value) ? 6 : 1}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: selectedValues2.includes(value)
                    ? "#e3f2fd"
                    : "white",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
                onClick={() => handleVoteSelect2(value)}
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
          {selectedValues2.length > 0 ? (
            selectedValues2.map((value, index) => (
              <Paper
                key={index}
                sx={{
                  width: 60,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "white",
                  transform: isRevealed2 ? "rotateY(0deg)" : "rotateY(180deg)",
                  transition: "transform 0.6s",
                  position: "relative",
                }}
              >
                {isRevealed2 ? (
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
            onClick={handleReveal2}
            disabled={selectedValues2.length === 0}
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
            onClick={handleReset2}
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
