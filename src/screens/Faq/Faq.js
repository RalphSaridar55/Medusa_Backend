import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { styles } from './FaqStyles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import CollapsibleList from "react-native-collapsible-list";

const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const data = [
    { id: 1, question: "Who are we?", answer: message },
    { id: 2, question: "What we do?", answer: message },
    { id: 3, question: "Where we are?", answer: message },
    { id: 4, question: "Who are we?", answer: message },
    { id: 5, question: "What we do?", answer: message },
    { id: 6, question: "Where we are?", answer: message },
    { id: 7, question: "Who are we?", answer: message },
    { id: 8, question: "What we do?", answer: message },
    { id: 9, question: "Where we are?", answer: message },
    { id: 10, question: "Who are we?", answer: message },
    { id: 11, question: "What we do?", answer: message },
    { id: 12, question: "Where we are?", answer: message },
    { id: 13, question: "Who are we?", answer: message },
    { id: 14, question: "What we do?", answer: message },
    { id: 15, question: "Where we are?", answer: message },
];

const Faq = () => {
    const [search,setSearch] = useState("");

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#fff'}}>                    
            <View style={styles.searchBar}>
                <TextInput
                value={search}
                onChangeText={(text)=>setSearch(text)}
                style={styles.search}
                placeholder='Search'
                />
                <Ionicons name="search" size={18} color="black" />
            </View>
            <View style={styles.container}>
             {data.filter((item,index)=>item.question.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
             .map((item,index)=>{
                return <CollapsibleList
                    key={index}
                    wrapperStyle={styles.wrapperStyle}
                    numberOfVisibleItems={0}
                    buttonPosition="top"
                    buttonContent={
                    <View style={{ flexDirection: "row", marginVertical: 15, justifyContent:'space-between' }}>
                        <Text style={styles.question}>{item.question}</Text>
                        <Octicons name="chevron-down" size={18} color="#31C2AA" />
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