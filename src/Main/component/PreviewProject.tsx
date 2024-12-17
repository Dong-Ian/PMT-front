import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/main.module.css";
import { PreviewProjectProps } from "../type/Main.type";

const PreviewProject: React.FC<PreviewProjectProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project?projectSeq=${props.projectSeq}`)}
      className={styles.create_button}
    >
      <p>preview</p>
    </div>
  );
};

export default PreviewProject;
