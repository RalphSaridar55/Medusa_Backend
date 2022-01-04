import React, { useEffect,createContext ,useState} from 'react'
import {View, Text, Platform, AppRegistry} from 'react-native'
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import Nav from "././src/navigations/StackNavigator"
// import { useFonts } from 'expo-font';
import useFonts from './Hook';
import { registerRootComponent } from 'expo';

export const HeadContext = createContext();
export default function App() {
  const [product,setProduct] = useState("tesst");
  // const [userData,setUserData] = useState(); 
  const [IsReady, SetIsReady] = useState(false);

  
  // let [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/static/Inter-Medium.ttf'),
  //   'Inter-Black-Bold': require('./assets/fonts/static/Inter-Black.ttf'),
  // });

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  if(!IsReady){
    return <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />}
  else
    return (
      <>
        <HeadContext.Provider>
          <Nav />
        </HeadContext.Provider>
      </>

  );
}

if (Platform.OS == "android") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent(appName, () => App);
}