import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image className="size-10" tintColor="#FFF" source={icons.person} />
        <Text className="text-gray-500 text-base">
          Fazer uma tela de profile
        </Text>
      </View>
    </View>
  );
};

export default Profile;
