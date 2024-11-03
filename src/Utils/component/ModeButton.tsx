import React from "react";
import { useRecoilState } from "recoil";
import { modeState } from "../Atom/Atom";
import styles from "../style/component.module.css";

const ModeButton: React.FC = () => {
  const [mode, setMode] = useRecoilState<boolean>(modeState);

  const handleToggle = () => {
    setMode((prev) => !prev);
  };

  return (
    <div
      className={`${styles.toggleSwitch} ${mode ? "" : styles.toggled}`}
      onClick={handleToggle}
    >
      <div className={styles.toggleButton}></div>
    </div>
  );
};

export default ModeButton;
