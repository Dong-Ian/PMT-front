export interface LoginFunctionProps {
  email: string;
  name: string;
  image: string;
}

export interface TextFieldProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
