import { TextInput, TextInputProps } from "react-native";

const Input = ({ value, placeholder, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      className="flex-1 w-full text-white border-b border-accent"
      placeholder={placeholder?.toUpperCase()}
      placeholderTextColor="#A8B5DB"
      value={value}
    />
  );
};

export default Input;
