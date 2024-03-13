import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
export default function DiscoverScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const navigation = useNavigation();
  const [withoutRemoved, setWithoutRemoved] = useState([]);

  useEffect(() => {}, [activeCategory]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);

    const filteredArticles = discoverNew?.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    setWithoutRemoved(filteredArticles || []);
  };

  return (
    <SafeAreaView style={tw`pt-8 bg-white dark:bg-neutral-900`}>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <View style={tw`px-4 mb-6 justify-between`}>
          <Text
            style={{
              ...tw`text-3xl text-green-800 dark:text-white`,
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>

          <Text
            style={{
              ...tw`text-base text-gray-600 dark:text-neutral-300 `,
              fontFamily: "SpaceGroteskMedium",
            }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View style={tw`mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full`}>
          <TouchableOpacity style={tw`pl-2`}>
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            style={tw`pl-4 flex-1 font-medium text-black tracking-wider`}
          />
        </View>

        {/* Categories */}
        <View style={tw`flex-row mx-4`}>
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View style={tw`h-full`}>
          {/* Header Title */}
          <View style={tw`my-4 mx-4 flex-row justify-between items-center`}>
            <Text
              style={{
                ...tw`text-xl dark:text-white`,
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Discover
            </Text>

            <Text
              style={{
                ...tw`text-base text-green-800 dark:text-neutral-300`,
                fontFamily: "SpaceGroteskBold",
              }}
            >
              View all
            </Text>
          </View>

          {isDiscoverLoading ? (
            <View style={tw`justify-center items-center`}>
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection newsProps={withoutRemoved} label="Discovery" />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
