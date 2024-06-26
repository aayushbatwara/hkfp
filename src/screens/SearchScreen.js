import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchNews } from "../../utils/NewsApi";
import { debounce } from "lodash";
import NewsSection from "../components/NewsSection/NewsSection";
import {   widthPercentageToDP as wp,  heightPercentageToDP as hp } from "react-native-responsive-screen";
import tw from 'twrnc';

export default function SearchScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (search) => {
    if (search && search?.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);

        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={tw`flex-1 bg-white dark:bg-neutral-900`}>
      {/* Search Input */}

      <View style={tw`mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg`}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor={"gray"}
// changed font below
          style={{fontSize: wp(10),...tw`font-medium text-black tracking-wider p-3 py-1 w-[90%]`}} />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="blue" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={tw`mx-4 mb-4 `}>
        <Text
          style={{
            ...tw`text-xl dark:text-white`,
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results?.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}
