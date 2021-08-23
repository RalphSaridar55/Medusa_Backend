import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from './navigations/StackNavigator';
import BottomTabNavigator from "./navigations/TabNavigator"
import DrawerNavigator from './navigations/DrawerNavigator';
import { LogBox } from 'react-native';

export default function App() {

  useEffect(() => {
   LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
