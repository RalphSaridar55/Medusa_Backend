import { StatusBar } from 'expo-status-bar';
import React, { useEffect,createContext ,useState} from 'react'
import { LogBox } from 'react-native';
import Nav from "././src/navigations/StackNavigator"

export const HeadContext = createContext();
export default function App() {
  const [product,setProduct] = useState("tesst");
  const [userData,setUserData] = useState(); 
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <>
      <HeadContext.Provider value={{product:product/* ,setProduct:setProduct ,userData:userData,setUserData:setUserData */}}>
        <Nav />
      </HeadContext.Provider>
    </>

  );
}

