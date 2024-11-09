import React from "react";
import styles from "../style/main.module.css";
import CreateProjectButton from "../component/CreateProjectButton";
import PreviewProject from "../component/PreviewProject";

const MainPage: React.FC = () => {
  return (
    <div className={styles.outer_container}>
      <div className={styles.main_container}>
        <p className={styles.title}>Project</p>
        <div className={styles.inner_container}>
          <CreateProjectButton />
          <PreviewProject />
          <PreviewProject />
          <PreviewProject />
          <PreviewProject />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
