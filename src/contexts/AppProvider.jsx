import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement ? true : false
  );

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

  const value = useMemo(() => {
    return {
      isFullScreen,
      setIsFullScreen,
    };
  }, [isFullScreen, setIsFullScreen]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
