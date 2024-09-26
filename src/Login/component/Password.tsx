import { TextFieldProps } from "../type/LoginType";

const Password = ({ value, onChange }: TextFieldProps) => {
  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    onChange(value);
  }

  return (
    <div>
      <p>비밀번호</p>
      <input
        onChange={handlePassword}
        type="password"
        placeholder="Password"
        name="password"
        value={value}
      />
    </div>
  );
};

export default Password;
