import ButtonOpacity from "@/components/ButtonOpacity";
import ContainerView from "@/components/ContainerView";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

const SignUp = () => {
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <ContainerView>
      <Text className="text-white">SignUp screen</Text>

      <ButtonOpacity className="mt-4" onPress={() => router.push("/sign-in")}>
        Sign in
      </ButtonOpacity>
    </ContainerView>
  );
};

export default SignUp;
