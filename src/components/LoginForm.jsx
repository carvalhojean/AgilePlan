import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleRoomCodeSubmit = () => {
    if (roomCode.trim()) {
      onLogin();
    }
  };

  const handleCreateRoom = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(code);
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
                  onChange={(e) => setRoomCode(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleRoomCodeSubmit();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleRoomCodeSubmit}
                  sx={{ minWidth: "100px" }}
                >
                  Enter
                </Button>
              </Box>
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
