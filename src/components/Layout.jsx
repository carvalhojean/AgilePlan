import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Typography,
  Avatar,
} from "@mui/material";
import {
  AccountCircle,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as AboutIcon,
  Feedback as FeedbackIcon,
  MoreVert as MoreIcon,
  Casino as PlanningPokerIcon,
} from "@mui/icons-material";
import VotingScreen from "./VotingScreen";
import HomeScreen from "./HomeScreen";

const Layout = ({ onLogout }) => {
  const [currentTab, setCurrentTab] = useState("home");
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
  };

  const topMenuItems = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    {
      id: "planning-poker",
      label: "Planning Poker",
      icon: <PlanningPokerIcon />,
    },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    { id: "about", label: "About", icon: <AboutIcon /> },
    { id: "feedback", label: "Feedback", icon: <FeedbackIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#1a1d21",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 240,
          bgcolor: "#1e2124",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <Typography variant="h6" color="white">
            Agile Plan
          </Typography>
        </Box>

        <List sx={{ pt: 2 }}>
          {topMenuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              selected={currentTab === item.id}
              onClick={() => setCurrentTab(item.id)}
              sx={{
                py: 1.5,
                color: "white",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <List
          sx={{ mt: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}
        >
          {bottomMenuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              selected={currentTab === item.id}
              onClick={() => setCurrentTab(item.id)}
              sx={{
                py: 1.5,
                color: "white",
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            p: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            <AccountCircle />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="white">
              Riley Carter
            </Typography>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
              riley@email.com
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleProfileClick}
            sx={{ color: "white" }}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Paper>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#1a1d21",
          height: "100vh",
          color: "white",
          marginLeft: "240px",
          width: "calc(100vw - 240px)",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {currentTab === "home" && <HomeScreen />}
          {currentTab === "planning-poker" && <VotingScreen />}
          {currentTab === "settings" && (
            <Typography variant="h4">Settings</Typography>
          )}
          {currentTab === "about" && (
            <Typography variant="h4">About</Typography>
          )}
          {currentTab === "feedback" && (
            <Typography variant="h4">Feedback</Typography>
          )}
        </Container>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: "#1e2124",
            color: "white",
            "& .MuiMenuItem-root": {
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.04)",
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
