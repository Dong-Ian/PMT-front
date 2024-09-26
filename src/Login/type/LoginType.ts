export interface LoginFunctionProps {
  email: string;
  password: string;
}

export interface TextFieldProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
