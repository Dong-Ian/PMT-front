import React, { useState } from "react";
import styles from "../style/project.module.css";

import { Input } from "@mantine/core";

import InviteMemberFunction from "../function/InviteMemberFunction";
import { TokenProps } from "../../Utils/type/UtilType";

interface InviteMemberComponentProps extends TokenProps {
  projectSeq: string;
}

const InviteMemberComponent: React.FC<InviteMemberComponentProps> = ({
  projectSeq,
  token,
}) => {
  const [inviteMember, setInviteMember] = useState<string>("");

  async function InviteMember() {
    if (inviteMember.length === 0) {
      alert("초대하려는 멤버의 이메일을 입력해주세요.");
      return;
    }

    if (projectSeq) {
      const result = await InviteMemberFunction({
        token,
        projectSeq,
        member: inviteMember,
      });

      if (result.code === "0000") {
        alert("초대가 완료되었습니다.");
      }
    }
  }
  return (
    <div className={styles.invite_container}>
      <Input
        className={styles.invite_input}
        value={inviteMember}
        onChange={(event) => setInviteMember(event.currentTarget.value)}
        placeholder="멤버를 초대하세요"
      />
      <button onClick={InviteMember}>초대하기</button>
    </div>
  );
};

export default InviteMemberComponent;
