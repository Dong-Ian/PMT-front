import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/main.module.css";

const CreateProjectButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/create-project")}
      className={styles.create_button}
    >
      <p>+</p>
    </div>
  );
};

export default CreateProjectButton;
