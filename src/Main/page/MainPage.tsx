import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/main.module.css";

import CreateProjectButton from "../component/CreateProjectButton";
import PreviewProject from "../component/PreviewProject";

import GetProjectListFunction from "../function/GetProjectListFunction";
import { PreviewProjectProps } from "../type/Main.type";

const MainPage: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const navigation = useNavigate();
  const [previewProjectList, setPreviewProjectList] = useState<
    PreviewProjectProps[] | []
  >([]);

  const GetProjectList = async () => {
    const result = await GetProjectListFunction({ token });
    if (result.code === "0000") {
      setPreviewProjectList(result.result);
      return;
    }

    if (result.code.endsWith("001")) {
      navigation("/", { replace: true });
      return;
    }

    alert("프로젝트 정보를 불러오지 못하였습니다.");
    return;
  };

  useEffect(() => {
    GetProjectList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.outer_container}>
      <div className={styles.main_container}>
        <p className={styles.title}>Project</p>
        <div className={styles.inner_container}>
          <CreateProjectButton />
          {previewProjectList &&
            previewProjectList.map((project, index) => {
              return <PreviewProject key={index} {...project} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
