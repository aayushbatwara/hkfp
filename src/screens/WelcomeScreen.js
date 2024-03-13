import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import tw from 'twrnc';
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View
      // source={require("../../assets/images/welcome/reporter.jpg")}
      style={tw`flex-1 justify-center items-center pb-6 bg-green-900`}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />  
      <View class="space-y-4" //this space doesn't actually work
      style={{
        marginBottom: hp(25),
        ...tw`flex-1 items-center justify-end max-w-[85%]`}}>
      <Text class="font-SpaceGroteskBold"
  style={tw`font-bold text-4xl shadow-2xl text-white text-center tracking-wider text-[${wp(10)}px]`}
      >
  Stay Informed from Day One
</Text>
<Text
  class="font-SpaceGroteskMedium"
  style={tw`font-bold text-white text-center max-w-[85%] leading-6 tracking-wider text-[${wp(4)}px]`}
>
  Discover the Latest News with our Seamless Onboarding Experience.
</Text>
      </View>

      <TouchableOpacity
        style={tw`bg-white rounded-full p-4 justify-center items-center w-[90%] mt-8`}
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text style={tw`text-base text-green-900`}>Getting Started</Text>
      </TouchableOpacity>
    </View>
  );
}
