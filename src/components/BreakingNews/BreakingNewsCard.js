import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc';

var { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={tw`relative`}>
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
            ...tw`rounded-3xl`,
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
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

        {/* Title and Author */}
        
        <View style={tw`absolute bottom-2 left-4 justify-end h-[60%]`}>
        <View style={tw``}>
              <Text style={tw`text-neutral-300 text-sm font-medium`}>
                {item?.author}
              </Text>
            </View>
          <View class="space-y-1" style={tw``}>
            <View style={tw` max-w-[98%]`}>
              <Text style={tw`text-white text-base font-semibold capitalize`}>
                {item.title}
                {/* {item.title.length > 100
                  ? item.title.slice(0, 100) + "..."
                  : item.title.split("-")[0] || "N/A"} */}
              </Text>
            </View>

          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
