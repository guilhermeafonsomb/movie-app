import clsx from "clsx";
import { View } from "react-native";

interface ContainerViewProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerView = ({
  children,
  className,
  ...props
}: ContainerViewProps) => {
  return (
    <View className={clsx("bg-primary flex-1", className)} {...props}>
      {children}
    </View>
  );
};

export default ContainerView;
