import { useContext, useEffect, useState } from "react";
import iconsun from "../../assets/icons/day.svg";
import iconnight from "../../assets/icons/night.svg";
import iconhouse from "../../assets/icons/house.svg";
import iconprev from "../../assets/icons/prev-song.svg";
import iconnext from "../../assets/icons/next-song.svg";
import iconplay from "../../assets/icons/play-icon.svg";
import iconvolumn from "../../assets/icons/vol-on.svg";
import iconmutevolumn from "../../assets/icons/vol-off.svg";
import iconfullscreen from "../../assets/icons/fullscreen-icon.svg";
import iconmixer from "../../assets/icons/menu-mixer-tool-hovered.svg";
import iconscenes from "../../assets/icons/menu-scenes-tool-hovered.svg";

import { AppContext } from "../../contexts/AppProvider";

export default function Navbar(params) {
  const appContext = useContext(AppContext);
  const { theme, setTheme, isMobile, setIsFullScreen } = appContext;

  const [time, setTime] = useState("time loading ...");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const amOrPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes} ${amOrPm}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {isMobile && (
        <div className="absolute flex items-center justify-between top-2 left-[50%] translate-x-[-50%] border border-gray-500 rounded-lg p-2 bg-[var(--nav-bg)] text-[var(--text-nav)] backdrop-blur-[10px] shadow-lg">
          <div className="group-item ps-2 flex items-center justify-center pe-2 gap-1">
            <button>
              <img src={iconprev} alt="" />
            </button>
            <button>
              <img src={iconplay} alt="" />
            </button>
            <button>
              <img src={iconnext} alt="" />
            </button>
            <button>
              <img src={iconvolumn} alt="" />
            </button>
            <button>
              <img src={iconmutevolumn} alt="" />
            </button>
          </div>
        </div>
      )}
      <div className="absolute flex items-center justify-between bottom-2 left-2 right-2 z-[20] border border-gray-500 rounded-lg p-4 bg-[var(--nav-bg)] text-[var(--text-nav)] backdrop-blur-[10px] shadow-lg">
        <div className="nav_head flex items-center justify-start">
          <div className="time me-4">{time}</div>
          <div
            className={`toggle_theme cursor-pointer relative w-[48px] px-[2px] h-[24px] rounded-[1000px] overflow-hidden ${
              theme === "light" ? "bg-[#fed021]" : "bg-[#6c5ce7]"
            }`}
          >
            <div
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className={`btn_toggle flex items-center justify-center absolute gap-1 top-[50%] translate-y-[-50%] transition-all duration-300 ease-in-out ${
                theme === "light" && "translate-x-[-24px]"
              }`}
            >
              <div className="sun w-[20px] h-[20px] flex items-center justify-center object-cover">
                <img src={iconsun} alt="" className="w-auto h-auto" />
              </div>
              <div className="circle w-[20px] h-[20px] bg-[var(--text-nav)] rounded-full"></div>
              <div className="moon w-[20px] h-[20px] flex items-center justify-center object-cover">
                <img src={iconnight} alt="" className="w-auto h-auto" />
              </div>
            </div>
          </div>
        </div>
        <div className="nav_center flex items-center justify-start">
          <div className="group-item flex items-center justify-center pe-2 border-e border-gray-500">
            <button>
              <img src={iconhouse} alt="" />
            </button>
          </div>
          {!isMobile && (
            <div className="group-item ps-2 flex items-center justify-center pe-2 gap-1 border-e border-gray-500">
              <button>
                <img src={iconprev} alt="" />
              </button>
              <button>
                <img src={iconplay} alt="" />
              </button>
              <button>
                <img src={iconnext} alt="" />
              </button>
              <button>
                <img src={iconvolumn} alt="" />
              </button>
              <button>
                <img src={iconmutevolumn} alt="" />
              </button>
            </div>
          )}
          <div className="group-item ps-2 flex items-center justify-center pe-2 gap-1 border-e border-gray-500">
            <button>
              <img src={iconmixer} alt="" />
            </button>
            <button>
              <img src={iconscenes} alt="" />
            </button>
          </div>
          <div className="group-item ps-2 flex items-center justify-center pe-2 gap-1">
            <button
              onClick={() => {
                setIsFullScreen((prev) => !prev);
              }}
            >
              <img src={iconfullscreen} alt="" />
            </button>
          </div>
        </div>
        <div className="nav_tail"></div>
      </div>
    </>
  );
}
