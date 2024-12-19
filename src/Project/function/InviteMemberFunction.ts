import { InviteProps } from "../type/Project.type";

export default async function InviteMemberFunction({
  token,
  projectSeq,
  member,
}: InviteProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/project/invite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      projectSeq: projectSeq,
      userEmail: member,
      isEditable: "1",
    }),
  });

  const res = await result.json();
  console.log("invite member function:", res);
  return res;
}
