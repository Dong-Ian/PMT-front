import { useRecoilValue } from "recoil";
import { TextFieldProps } from "../type/LoginType";
import { modeState } from "../../Utils/Atom/Atom";
import styles from "../style/login.module.css";

const Email = ({ value, onChange }: TextFieldProps) => {
  const mode = useRecoilValue(modeState);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div className={styles.input}>
      <input
        className={mode ? styles.light_input : styles.dark_input}
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
