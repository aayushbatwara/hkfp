import { View, ActivityIndicator } from "react-native";
import React from "react";
import tw from 'twrnc';

export default function Loading() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
}
