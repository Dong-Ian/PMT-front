import { useRecoilValue } from "recoil";
import { TextFieldProps } from "../type/LoginType";
import { modeState } from "../../Utils/Atom/Atom";
import styles from "../style/login.module.css";

const Password = ({ value, onChange }: TextFieldProps) => {
  const mode = useRecoilValue(modeState);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div className={styles.input}>
      <input
        className={mode ? styles.light_input : styles.dark_input}
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
