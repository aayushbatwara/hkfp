import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import tw from 'twrnc';

export default function CategoriesCard({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <View>
      <ScrollView
      class="space-x-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.title == activeCategory;
          let activeButtonClass = isActive
            ? "bg-green-700 "
            : "bg-black/10 dark:bg-neutral-400 ";
          let activeTextClass = isActive
            ? "text-white "
            : "text-gray-600 dark:text-neutral-600 ";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              style={tw`flex items-center`}
              class="space-y-1"
            >
              <View
              style={[tw`rounded-full py-2 px-4 ${activeButtonClass}`]}
              >
                <Text
                style={[tw`capitalize ${activeTextClass}`, 
                { fontSize: hp(1.6) }]}

                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
