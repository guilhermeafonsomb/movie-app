import { icons } from "@/constants/icons";
import clsx from "clsx";
import React from "react";

import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonOpacityProps extends TouchableOpacityProps {
  icon?: any;
  children: string;
}

const ButtonOpacity = ({
  children,
  icon,
  className,
  ...props
}: ButtonOpacityProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        "w-full mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50",
        className
      )}
      {...props}
    >
      {icon && (
        <Image
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#FFF"
          source={icons.arrow}
        />
      )}
      <Text className="text-white font-semibold text-base">{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOpacity;
