import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface SeachBarProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ onPress, placeholder }: SeachBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
        source={icons.search}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#A8B5DB"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
