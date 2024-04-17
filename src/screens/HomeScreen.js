import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchTodaysNews, fetchNotTodaysNews, handleFetchFeed } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import tw from 'twrnc';
export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const today = new Date();
  
  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["fetchBreakingNewss"],
    queryFn: fetchTodaysNews,
  });

  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchNotTodaysNews,
  });

  return (
    // <SafeAreaView style={tw`flex-1 bg-white dark:bg-neutral-900`}>
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colorScheme === 'dark' ? '#0d0008' : 'white' }]}>
    <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View style={tw``}>
            <MiniHeader label="Today's News" />
            <BreakingNews label="Breaking News" data={data.articles}/>
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
            {isRecommendedLoading ? (
              <Loading />
            ) : (
              <NewsSection
                label="Recommendation"
                newsProps={recommendedNew.articles}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
