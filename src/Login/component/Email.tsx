import { TextFieldProps } from "../type/LoginType";

const Email = ({ value, onChange }: TextFieldProps) => {
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;
    onChange(value);
  }

  return (
    <div>
      <p>이메일</p>
      <input
        onChange={handleEmail}
        type="text"
        placeholder="Email"
        name="email"
        value={value}
      />
    </div>
  );
};

export default Email;
