import { TextFieldProps } from "../type/LoginType";
import styles from "../style/login.module.css";

const Password = ({ value, onChange }: TextFieldProps) => {
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div className={styles.input}>
      <input
        className={styles.inputfield}
        onChange={handlePassword}
        type="password"
        placeholder="비밀번호"
        name="password"
        value={value}
      />
    </div>
  );
};

export default Password;
