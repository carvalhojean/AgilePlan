import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import { RoomProvider } from "./contexts/RoomContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialTab, setInitialTab] = useState("home");

  const handleLogin = (tab = "home") => {
    setInitialTab(tab);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setInitialTab("home");
  };

  return (
    <RoomProvider>
      <div className="app">
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <Layout onLogout={handleLogout} initialTab={initialTab} />
        )}
      </div>
    </RoomProvider>
  );
}

export default App;
