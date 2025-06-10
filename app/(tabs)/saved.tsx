import ContainerView from "@/components/ContainerView";
import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";

const Saved = () => {
  return (
    <ContainerView>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image className="size-10" tintColor="#FFF" source={icons.save} />
        <Text className="text-gray-500 text-base">Fazer uma tela de saved</Text>
      </View>
    </ContainerView>
  );
};

export default Saved;
