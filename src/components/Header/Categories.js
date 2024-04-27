import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from "nativewind";

const HorizontalScrollComponent = ({ selectedItems, handleItemPress, categories }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories &&
          categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleItemPress(item)}
              style={[
                styles.item,
                isDarkMode && styles.itemDark,
                selectedItems.includes(item) && styles.selectedItem,
                selectedItems.includes(item) && isDarkMode && styles.selectedItemDark,
              ]}
            >
              <Text style={[styles.itemText, isDarkMode && styles.itemTextDark]}>
                {item == "China" ? "Mainland" : item}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 50,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  containerDark: {
    backgroundColor: '#1c1c1c',
  },
  scrollContainer: {
    alignItems: 'flex-start',
    // paddingVertical: 5,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  itemDark: {
    backgroundColor: '#333333',
  },
  selectedItem: {
    backgroundColor: '#ffca28',
  },
  selectedItemDark: {
    backgroundColor: '#ffca28',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'SpaceGroteskBold',
    color: '#2563eb',
  },
  itemTextDark: {
    color: '#ffffff',
  },
});

export default HorizontalScrollComponent;