import { View, Text } from "react-native";
import React from "react";
import tw from 'twrnc';

export default function MiniHeader({ label }) {
  return (
    <View style={tw`px-4 my-4 justify-between flex-row items-center`}>
      <Text
        style={{
          ...tw`text-xl text-green-800 dark:text-white`,
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          ...tw`text-base text-gray-600 dark:text-neutral-300 `,
          fontFamily: "SpaceGroteskMedium",
        }}
      >
        View all
      </Text>
    </View>
  );
}
