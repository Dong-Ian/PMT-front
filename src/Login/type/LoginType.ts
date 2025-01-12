export interface LoginFunctionProps {
  accessToken: string;
  email: string;
  name: string;
  image: string;
}

export interface TextFieldProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
