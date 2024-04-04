import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  /**
   * VARIABLES
   */

  // Fullscreen
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement ? true : false
  );

  // Theme
  const [theme, setTheme] = useState("dark");

  // Mobile
  const [isMobile, setIsMobile] = useState(false);

  /**
   * FUNCTIONS
   * */

  const handleResizeWindow = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Handle effects
  // Music api
  // https://sheets.googleapis.com/v4/spreadsheets/1LHdX1CrJQct6f6t1Cx8IxvtdLUjwd5kG0yPH9R0saRY/values/'sheet1'!A2:F1000?key=AIzaSyCo3Wls8gIK0QuoUW3LlO4tbZD6DSxqe6g

  // Handle toggle fullscreen
  useEffect(() => {
    const toggleFullScreen = (e) => {
      e.preventDefault();

      if (e.keyCode === 122) {
        // Key code F11
        setIsFullScreen((prev) => !prev);
      }
    };

    document.addEventListener("keyup", toggleFullScreen);

    return () => {
      document.removeEventListener("keyup", toggleFullScreen);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    handleResizeWindow();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const value = useMemo(() => {
    return {
      isFullScreen,
      setIsFullScreen,
      theme,
      setTheme,
      isMobile,
      setIsMobile,
    };
  }, [isFullScreen, setIsFullScreen, theme, setTheme, isMobile, setIsMobile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
