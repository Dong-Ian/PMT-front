import { CreateProjectFunctionProps } from "../type/Project.type";

export default async function CreateProjectFunction({
  token,
  title,
  inviteUsers,
  projectType,
}: CreateProjectFunctionProps) {
  const result = await fetch(`${process.env.REACT_APP_API}/project/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      title: title,
      inviteUsers: inviteUsers,
      projectType: projectType?.value,
    }),
  });

  const res = await result.json();

  return res;
}
