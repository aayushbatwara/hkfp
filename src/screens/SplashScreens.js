import { View, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc';

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("Welcome"); // Navigate to HomeTab
    }, 3000); // 3 seconds delay
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      // source={require("../../assets/images/welcome/reporter.jpg")}
      style={tw`flex-1 justify-center items-center`}
    >
      <LinearGradient
        colors={["rgba(8, 76, 156, 0.95)", "rgba(8, 76, 156, 0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        onLayout={onLayoutRootView}
        style={tw` `}
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        <Text style={tw`text-white text-3xl font-extrabold uppercase`}>
          Hong Kong
        </Text>
        <Text style={tw`text-white text-3xl font-extrabold uppercase`}>
          Free Press
        </Text>
      </View>
    </View>
  );
}
