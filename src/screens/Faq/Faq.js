import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './FaqStyles';
import React from 'react';
import CollapsibleList from "react-native-collapsible-list";



const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const data = [
    { id: 1, question: "Who are we ?", answer: message },
    { id: 2, question: "Who are we ?", answer: message },
    { id: 3, question: "Who are we ?", answer: message },
    { id: 4, question: "Who are we ?", answer: message },
    { id: 5, question: "Who are we ?", answer: message },
    { id: 6, question: "Who are we ?", answer: message },
    { id: 7, question: "Who are we ?", answer: message },
    { id: 8, question: "Who are we ?", answer: message },
    
];

const Faq = () => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>                                 
            <Image
              style={styles.img}
              source={require('../../../assets/about4.png')}
              resizeMode='cover'
            /> 
            <View style={styles.container}>
             {data.map((item,index)=>{
               return <CollapsibleList
                    key={index}
                    wrapperStyle={styles.wrapperStyle}
                    numberOfVisibleItems={0}
                    buttonPosition="top"
                    buttonContent={
                    <View style={{ flexDirection: "row", marginVertical: 15 }}>
                        <Text style={styles.question}>{index+1} - {item.question}</Text>
                    </View>
                    }
                >
                    <Text style={styles.answer}>{item.answer}</Text>
                </CollapsibleList>
            })}
          </View>
        </ScrollView>
    )
}

export default Faq