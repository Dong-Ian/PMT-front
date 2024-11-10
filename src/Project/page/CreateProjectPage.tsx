import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/project.module.css";

import Select from "react-select";
import { TextInput, TagsInput, Button } from "@mantine/core";

import CreateProjectFunction from "../function/CreateProjectFunction";

const CreateProjectPage: React.FC = () => {
  const navigation = useNavigate();
  const token = useRecoilValue(tokenState);

  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectType, setProjectType] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [inviteUsers, setInviteUsers] = useState<string[]>([]);

  const options = [
    { value: "개인", label: "개인 프로젝트" },
    { value: "회사", label: "회사 프로젝트" },
    { value: "동아리", label: "동아리 프로젝트" },
    { value: "학교", label: "학교 프로젝트" },
  ];

  function handleProjectTypeChange(
    selectedOption: { value: string; label: string } | null
  ) {
    setProjectType(selectedOption);
  }

  function handleInputChange(newValue: string) {
    setInputValue(newValue);
  }

  function CancelCreateProject() {
    const result = window.confirm(
      "현재까지의 내용은 저장되지 않습니다.\n그래도 취소하시겠습니끼?"
    );
    if (result) navigation("/main");
  }

  async function CreateProject() {
    if (projectTitle === "") {
      alert("프로젝트 제목을 입력해주세요.");
      return;
    }

    const result = window.confirm("프로젝트를 생성하시겠습니까?");
    if (result) {
      const result = await CreateProjectFunction({
        token,
        title: projectTitle,
        projectType: projectType,
      });

      if (result.code === "USER0000") {
        alert("프로젝트가 생성되었습니다.");
        navigation("/project");
        return;
      }
    }
  }

  return (
    <div className={styles.outer_container}>
      <div className={styles.main_container}>
        <p className={styles.main_title}>프로젝트 생성</p>
        <div className={styles.inner_container}>
          <div className={styles.title}>
            <p>프로젝트 명</p>
            <TextInput
              value={projectTitle}
              onChange={(event) => setProjectTitle(event.currentTarget.value)}
              placeholder="프로젝트 제목을 입력해주세요"
              style={{ width: "100%", maxWidth: "530px" }}
            />
          </div>

          <TagsInput
            value={inviteUsers}
            onChange={setInviteUsers}
            placeholder="초대할 유저 아이디를 입력하고 Enter 키를 눌러 추가하세요"
          />

          <Select
            options={options}
            value={projectType}
            onChange={handleProjectTypeChange}
            placeholder="프로젝트 유형을 선택하세요"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </div>
        <div className={styles.button}>
          <Button
            onClick={CreateProject}
            variant="filled"
            color="rgb(173, 216, 230)"
          >
            프로젝트 생성하기
          </Button>
          <Button onClick={CancelCreateProject} variant="default">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
