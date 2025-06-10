import { useNavigation } from "expo-router";
import { useEffect } from "react";

const useRemoviHeader = (remove = true) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (remove) return navigation.setOptions({ headerShown: false });
  }, [navigation, remove]);
};

export default useRemoviHeader;
