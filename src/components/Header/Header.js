import {Switch, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import tw from 'twrnc';

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={tw`flex-row justify-between items-center mx-4 mt-4`}>
      <View style={tw``}>
        <Text
          style={{
            fontFamily: "SpaceGroteskBold",
            ...tw`text-2xl text-blue-600 dark:text-white font-extrabold uppercase`,
          }}
        >
          HK Free Press
        </Text>
      </View>

      {/* Switch and Search Icon */}
      <View style={tw`flex-row rounded-full justify-center items-center`}>
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




