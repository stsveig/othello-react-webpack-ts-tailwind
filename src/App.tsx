import { useEffect } from "react";
import { Game } from "./components/Game";
import "./tailwind.css";

export const App = () => {
  console.log("hello from App.tsx:5");

  useEffect(() => {
    const updateViewportHeightVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Run initialiation on page load
    updateViewportHeightVariable();

    window.addEventListener("resize", updateViewportHeightVariable);
    window.addEventListener("orientationchange", updateViewportHeightVariable);

    return () => {
      window.removeEventListener("resize", updateViewportHeightVariable);
      window.removeEventListener(
        "orientationchange",
        updateViewportHeightVariable
      );
    };
  }, []);

  return (
    <div className="px-1">
      <Game />
    </div>
  );
};
