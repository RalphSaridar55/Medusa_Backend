import { StatusBar } from 'expo-status-bar';
import React, { useEffect,createContext ,useState} from 'react'
import { LogBox } from 'react-native';
import Nav from "././src/navigations/StackNavigator"

export const ProductContext = createContext();
export default function App() {
  const [product,setProduct] = useState("tesst");
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs()
  }, [])
  return (
    <>
      <ProductContext.Provider value={{product,setProduct}}>
        <Nav />
      </ProductContext.Provider>
    </>

  );
}

