import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import tw from 'twrnc';
import { usePushNotifications } from "../notifications";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2)
  console.log(expoPushToken?.data ?? "");

  return (
    <View class="flex-row justify-between items-center mx-4 mt-4" style={tw`flex-row justify-between items-center mx-4 mt-4`}>
      <View style={tw``}>
        <Text
        class="font-SpaceGroteskBold"
          style={{
            fontFamily: "SpaceGroteskBold",
            ...tw`text-2xl text-blue-600 dark:text-white font-extrabold uppercase`,
          }}
        >
          HK Free Press
        </Text>
      </View>

      {/* Switch and Search Icon */}
      <View class="space-x-4" style={tw`flex-row rounded-full justify-center items-center`}>
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
        <Text>  </Text>

        {/* Search */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={tw`bg-gray-200 dark:bg-blue-800  rounded-full p-2`}
        >
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "blue"}
            
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
