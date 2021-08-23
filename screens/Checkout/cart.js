// // //  import React, { useState } from 'react';
// // //  import { Text, View } from 'react-native';

// // //  import Stepper from 'react-native-stepper-ui';

// // //  const MyComponent = (props) => {
// // //      return (
// // //          <View>
// // //              <Text>{props.title}</Text>
// // //              <View>
// // //                  {props.children}
// // //              </View>
// // //          </View>
// // //      );
// // //  };

// // //  const content = [
// // //      <MyComponent title="Component 1" >
// // //          <Text>Hello</Text>
// // //      </MyComponent>,

// // //      <MyComponent title="Component 2" />,
// // //      <MyComponent title="Component 3" />,
// // //  ];

// // //  const Cart = () => {
// // //      const [active, setActive] = useState(0);

// // //      return (
// // //          <View>
// // //              <Stepper
// // //                  active={active}
// // //                  content={content}
// // //                  onBack={() => setActive((p) => p - 1)}
// // //                  onFinish={() => alert('Finish')}
// // //                  onNext={() => setActive((p) => p + 1)}
// // //              />
// // //          </View>
// // //      );
// // //  };

// // //  export default Cart;



 import React, { useState } from "react";
 import {
   StyleSheet,
   Text,
   View,
   TextInput,
   Button,
   TouchableOpacity,
 } from "react-native";
 import * as DocumentPicker from "expo-document-picker";

 const Cart = () => {
   const pickDocument = async () => {
     let result = await DocumentPicker.getDocumentAsync({});
     console.log(result.uri);
     console.log(result);
   };

   return (
     <View style={styles.background}>
       <Text style={styles.file}>Upload CSV File</Text>
       <View style={styles.button}>
         <TouchableOpacity>
           <Button
             title="upload your file"
             color="black"
             onPress={pickDocument}
           />
         </TouchableOpacity>
       </View>
     </View>
   );
 };

 const styles = StyleSheet.create({
   background: {
     backgroundColor:
       "radial-gradient(ellipse at left bottom,    rgb(163, 237, 255) 0%,    rgba(57, 232, 255, 0.9) 59%,    rgba(48, 223, 214, 0.9) 100% )",
   },
   file: {
     color: "black",
     marginHorizontal: 145,
   },
   button: {
     marginHorizontal: 60,
   },
 });

 export default Cart;

