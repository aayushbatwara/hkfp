import { Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import Categories from "../components/Header/Categories.js";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import {fetchRawData, Article} from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import tw from 'twrnc';
import { usePushNotifications } from "../components/notifications";
export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const {expoPushToken, notification} = usePushNotifications();
  console.log(expoPushToken?.data ?? "");


  const { data: rawData, isLoading: isDataLoading } = useQuery({
    queryKey: ["rawDataKey"],
    queryFn: fetchRawData,
  });

  useEffect(() => {
    filterData()
  }, [selectedItems, rawData])
  

      //Handle Categories
  const handleItemPress = (item: string) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filterData = () => {
    //Change data
    if (rawData == null) return;
    if (selectedItems.length == 0){
      setFilteredArticles(rawData.articles)
      return
    }

    const myFilteredData = rawData.articles.filter((item) => {
      let returnValue = false
      for (let index = 0; index < selectedItems.length; index++) {
        const category = selectedItems[index];
        if(item.categories.includes(category)){
          returnValue = true
          break;
        }
      }
      return (returnValue)
    })
    setFilteredArticles(myFilteredData)
  }
  

  return (
    // <SafeAreaView style={tw`flex-1 bg-white dark:bg-neutral-900`}>
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colorScheme === 'dark' ? '#0d0008' : 'white' }]}>
    <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View>
        {/* Header */}
        <Header />

        <Categories selectedItems={selectedItems} categories={rawData?.topCategories} handleItemPress={handleItemPress}></Categories>

        {/* Breaking News */}
        {isDataLoading ? (
          <Loading />
        ) : (
          <View style={tw``}>
            <MiniHeader label="Last 24 Hours" />
            <BreakingNews label="Breaking News" newsProps={filteredArticles}/>
          </View>
        )}

        {/* Recommended News */}
        <View>
          <MiniHeader label="Recent News" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            {isDataLoading ? (
              <Loading />
            ) : (
              <NewsSection
                newsProps={filteredArticles}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
