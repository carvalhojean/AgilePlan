import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleRoomCodeSubmit = async () => {
    if (roomCode.trim()) {
      try {
        const response = await fetch('http://localhost:3001/api/check-room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomCode: roomCode.trim() }),
        });

        const data = await response.json();
        if (data.exists) {
          setError("");
          onLogin();
        } else {
          setError("This room does not exist.");
        }
      } catch (err) {
        setError("Failed to verify room. Please try again.");
      }
    }
  };

  const handleCreateRoom = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(code);
    setError("");
    onLogin("planning-poker");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome to your Agile Plan
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter your room code to continue
          </Typography>
          <Box
            sx={{
              width: "100%",
              gap: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter room code"
                  fullWidth
                  value={roomCode}
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                    setError("");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleRoomCodeSubmit();
                    }
                  }}
                  error={!!error}
                />
                <Button
                  variant="contained"
                  onClick={handleRoomCodeSubmit}
                  sx={{ minWidth: "100px" }}
                >
                  Enter
                </Button>
              </Box>
              {error && (
                <Alert severity="error" sx={{ width: "100%" }}>
                  {error}
                </Alert>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  or, create a new one
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleCreateRoom}
                  sx={{ minWidth: "120px" }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
