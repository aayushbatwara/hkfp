import { View, Text } from "react-native";
import React from "react";
import tw from 'twrnc';
import { useColorScheme } from "nativewind";

export default function MiniHeader({ label }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={tw`px-4 my-4 justify-between flex-row items-center`}>
      <Text
        style={{
          ...tw`text-xl text-blue-600 dark:text-white`,
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>

      {/* <Text style={{...tw`text-base text-${colorScheme == "dark" ? 'neutral-300' : 'gray-600'}`,fontFamily: "SpaceGroteskMedium",}}>
        View all
      </Text> */}
    </View>
  );
}
