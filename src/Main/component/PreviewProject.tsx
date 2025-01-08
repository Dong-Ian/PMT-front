import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/main.module.css";
import { PreviewProjectProps } from "../type/Main.type";

const PreviewProject: React.FC<PreviewProjectProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.project}>
      <div
        onClick={() => navigate(`/project?projectSeq=${props.projectSeq}`)}
        className={styles.create_button}
      >
        <p>preview</p>
      </div>
      <div className={styles.project_description}>
        <div>
          <p className={styles.project_title}>{props.projectName}</p>
          <p className={styles.project_type}>{props.projectType}</p>
        </div>
        <p className={styles.project_mod_date}>
          마지막 수정일: {props.modDate}
        </p>
      </div>
    </div>
  );
};

export default PreviewProject;
