import { useState } from 'react';

export const useUI = () => {
  const [showChat, setShowChat] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCoinsScreen, setShowCoinsScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleStartClick = () => {
    setShowLanding(false);
    setShowWelcomeScreen(true);
  };

  const handleBackClick = () => {
    setShowChat(false);
    setShowWelcomeScreen(true);
  };

  return {
    showChat,
    showWelcomeScreen,
    showLanding,
    showProfileMenu,
    showCoinsScreen,
    showSettings,
    isSidebarOpen,
    setShowChat,
    setShowWelcomeScreen,
    setShowLanding,
    setShowProfileMenu,
    setShowCoinsScreen,
    setShowSettings,
    setIsSidebarOpen,
    handleStartClick,
    handleBackClick
  };
}; 