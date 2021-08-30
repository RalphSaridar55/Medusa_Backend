import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';
import Nav from "./navigations/StackNavigator"

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <>

      <Nav /></>

  );
}

