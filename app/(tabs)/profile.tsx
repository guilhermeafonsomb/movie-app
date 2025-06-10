import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ButtonOpacity from "@/components/ButtonOpacity";
import ContainerView from "@/components/ContainerView";
import Input from "@/components/Input";
import { icons } from "@/constants/icons";
import { useAccountStore } from "@/store/account.store";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { user } = useAccountStore();

  return (
    <ContainerView>
      <View className="flex-1 flex items-center max-h-52 relative">
        <View className="flex-1 w-full flex items-end justify-end bg-light-100 opacity-80 ">
          <TouchableOpacity
            className="mr-4 mb-2"
            onPress={() => console.log("Open Camera")}
          >
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="absolute w-full items-center bottom-0">
          <View className="w-28 h-28  rounded-full items-center justify-center  border-4 bottom-[-50px] border-white">
            <Image className="size-16" tintColor="#FFF" source={icons.person} />
          </View>
        </View>
      </View>
      <ScrollView
        className="mt-20"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", padding: 10 }}
      >
        <Text className="text-white font-bold uppercase text-center whitespace-pre-line max-w-72 ">
          {user?.name}
        </Text>

        <View className="flex-1 w-full flex items-center px-4 gap-4 mt-10">
          <Input
            placeholder="USER NAME"
            onChangeText={(text: any) => console.log(text)}
            value={user?.name.toUpperCase()}
          />

          <Input
            placeholder="e-mail"
            onChangeText={(text: any) => console.log(text)}
            value={user?.email}
          />

          <ButtonOpacity
            className="mt-4"
            onPress={() => router.push("/sign-in")}
          >
            {user?.name ? "Save" : "Sign in"}
          </ButtonOpacity>
        </View>
      </ScrollView>
    </ContainerView>
  );
};

export default Profile;
