import ButtonOpacity from "@/components/ButtonOpacity";
import ContainerView from "@/components/ContainerView";
import useRemoviHeader from "@/hooks/useRemoviHeader";
import { useRouter } from "expo-router";
import { Text } from "react-native";

const SignIn = () => {
  const router = useRouter();
  useRemoviHeader();
  return (
    <ContainerView>
      <Text className="text-white">SignIn screen</Text>

      <ButtonOpacity className="mt-4" onPress={() => router.push("/sign-up")}>
        Sign up
      </ButtonOpacity>
    </ContainerView>
  );
};

export default SignIn;
