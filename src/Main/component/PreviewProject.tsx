import React from "react";
import styles from "../style/main.module.css";
import { PreviewProjectProps } from "../type/Main.type";

const PreviewProject: React.FC<PreviewProjectProps> = (props) => {
  console.log(props);
  return (
    <div className={styles.create_button}>
      <p>preview</p>
    </div>
  );
};

export default PreviewProject;
