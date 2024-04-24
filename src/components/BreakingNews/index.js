import { View, Text, Dimensions } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation, } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";

var { width } = Dimensions.get("window");

export default function BreakingNews({ newsProps, label }) {
  const [timedData, setTimedData] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    filterTimedData();
  }, [newsProps])

  const filterTimedData = () => {
    if (newsProps){
      const today = new Date(); // Get the current date
      const thisTimeYesterday = new Date(today.setDate(today.getDate() - 1))  
      const filteredArticles = newsProps.filter((item) => {
        const itemDate = new Date(item.publishedAt);
        return (itemDate.getTime() > thisTimeYesterday.getTime());
      });
      setTimedData(filteredArticles);
    };
    }

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
    <View>
      {/* Carousal */}
      <Carousal
        data={timedData}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
