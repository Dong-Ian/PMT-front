import { TextFieldProps } from "../type/LoginType";
import styles from "../style/login.module.css";

const Email = ({ value, onChange }: TextFieldProps) => {
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div className={styles.input}>
      <input
        className={styles.inputfield}
        onChange={handleEmail}
        type="text"
        placeholder="이메일"
        name="email"
        value={value}
      />
    </div>
  );
};

export default Email;
