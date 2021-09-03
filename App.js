import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { LogBox } from 'react-native';
import Nav from "././src/navigations/StackNavigator"

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <>
      <Nav />
    </>

  );
}

