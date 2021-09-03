// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import { Headline, Paragraph, TextInput, List } from 'react-native-paper';

// export default class Contact extends Component {
//     state = {
//         email: "",
//         subject: "",
//         message: "",
//     }
//     render() {
//         return (
//             <ImageBackground source={require('../../assets/images/Login-bg.png')} resizeMode="cover"
//                 style={{
//                     flex: 1,
//                     justifyContent: "center"
//                 }}>
//                 <View style={{ flex: 1, padding: 15, justifyContent: 'center' }}>
//                     <Headline style={{ marginBottom: 10, color: "#698EB7", fontStyle: "bold" }}>Get In Touch </Headline>
//                     <Paragraph style={{ marginBottom: 10, color: "#000" }}>Give us a call ror drop by anytime, we endeavour to answer all enquiries within 24 hours on business days. We will be happy to answer your questions.</Paragraph>
//                     <TextInput
//                         label="Email"
//                         placeholder="email@gmail.com"
//                         mode="outlined"
//                         outlineColor="#C4C4C4"
//                         theme={{ colors: { primary: '#31c2aa' } }}
//                         style={styles.inputView}
//                     />
//                     <TextInput
//                         label="Subject"
//                         mode="outlined"
//                         outlineColor="#C4C4C4"
//                         theme={{ colors: { primary: '#31c2aa' } }}
//                         style={styles.inputView}
//                     />
//                     <TextInput
//                         label="Message"
//                         mode="outlined"
//                         outlineColor="#C4C4C4"
//                         theme={{ colors: { primary: '#31c2aa' } }}
//                         style={styles.inputView}
//                     />


//                     <TouchableOpacity style={styles.loginBtn}>
//                         <Text style={styles.loginText}>Submit</Text>
//                     </TouchableOpacity>

//                 </View>


//             </ImageBackground>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 15,
//         justifyContent: "center",
//     },
//     inputView: {
//         backgroundColor: "#fff",
//         marginBottom: 10,
//         borderRadius: 25
//     },
//     inputText: {
//         height: 50,
//         color: "white"
//     },
//     forgot: {
//         color: "#31C2AA",
//         fontSize: 11,
//         textAlign: "right"
//     },
//     loginBtn: {
//         backgroundColor: "#31C2AA",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 20,
//         marginBottom: 10
//     },
//     loginText: {
//         color: "white"
//     },
//     signupText: {
//         color: "#31C2AA",
//         textAlign: "center"
//     }
// });



import {CountryPicker} from "react-native-country-codes-picker/components/CountryPicker";

export default function Contact() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '80%',
            height: 60,
            backgroundColor: 'black',
            padding: 10,
        }}
      >
        <Text style={{
            color: 'white',
            fontSize: 20
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>

      // For showing picker just put show state to show prop
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
}