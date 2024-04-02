import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../contexts/AppProvider";

export default function Background(params) {
  const { background } = params;
  const appContext = useContext(AppContext);
  const { isFullScreen } = appContext;

  const [defaultScreenWidth, setDefaultScreenWidth] = useState(0); // set default screen width
  const [defaultScreenHeight, setDefaultScreenHeight] = useState(0); // set default screen height

  const getWindowSize = useCallback(() => {
    if (isFullScreen) {
      const appContainer = document.querySelector(".App");
      appContainer.requestFullscreen();
    }

    const screenWidth = window.innerWidth || 0;
    const screenHeight = window.innerHeight || 0;
    setDefaultScreenWidth(screenWidth);
    setDefaultScreenHeight(screenHeight);
  }, [isFullScreen]);

  useEffect(() => {
    getWindowSize();
  }, [getWindowSize, isFullScreen]);

  return (
    <div
      className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
      style={{
        width: defaultScreenWidth,
        height: defaultScreenHeight,
        maxWidth:
          defaultScreenHeight > defaultScreenWidth
            ? defaultScreenHeight * 2
            : defaultScreenWidth * 2,
      }}
    >
      <video
        className={`absolute top-0 left-0 bottom-0 right-0 object-cover`}
        style={{
          width: "100%",
          height: defaultScreenHeight,
          maxWidth:
            defaultScreenHeight > defaultScreenWidth
              ? defaultScreenHeight * 2
              : defaultScreenWidth * 2,
        }}
        autoPlay
        muted
        loop
      >
        <source src={background} type="video/mp4" />
      </video>
    </div>
  );
}
