import React from "react";
import { Divider, Headline } from "react-native-paper";
import { View, ScrollView, Text } from "react-native";
import aboutStyle from "./aboutStyle";
import { Image, Dimensions } from "react-native";
import { Paragraph, List } from "react-native-paper";


const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 200;

const images = [
  require('../../../assets/about1.jpg'),
  require('../../../assets/about2.jpg'),
  require('../../../assets/about3.jpg'),
];
const data = [
  {title:'Our Vision',text:`Cupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.\n\nCupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.`,
  image:images[0]},
  {title:'Our Approach',text:`Cupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.\n\nCupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.`,
  image:images[1]},
  {title:'Our Process',text:`Cupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.\n\nCupidatat ea aliquip id Lorem dolore Lorem eu. Consectetur nisi culpa ea esse incididunt ad excepteur deserunt eu. Sunt non labore magna incididunt ut exercitation enim nulla Lorem minim cillum. Consequat et reprehenderit fugiat enim est cillum nulla duis veniam esse aute nisi quis.`,
  image:images[2]},
]

const About = () => {

  // const renderPage=(image, index)=> {
  //   return (
  //     <View key={index}>
  //       <Image
  //         style={{ width: BannerWidth, height: BannerHeight }}
  //         source={image}
  //       />
  //     </View>
  //   );
  // }

    return (
      <View style={aboutStyle.container}>
        {/* <Headline style={aboutStyle.headLine}>About us </Headline> */}
        <ScrollView showsVerticalScrollIndicator={false} style={aboutStyle.scrollview}>
          {data.map((item,index)=>
          <View key={index}>
            <View style={aboutStyle.textContainer}>
              <Text style={aboutStyle.title}>
                {item.title}
              </Text>
              <Text style={aboutStyle.descritpion}>
                {item.text}
              </Text>
            </View>
            
            <Image
              style={aboutStyle.img}
              source={item.image}
              resizeMode='cover'
            />
          </View>
          )}
          
        </ScrollView>
      </View>
    );
  }

  export default About


{/* <List.Section>
              <List.Accordion
                theme={{
                  colors: { primary: "#6E91EC", underlineColor: "transparent" },
                }}
                style={{ backgroundColor: "#fff" }}
                title="Our Vision"
                left={(props) => (
                  <List.Icon {...props} icon="eye-outline" />
                )}
              >
                <Paragraph
                  style={{
                    backgroundColor: "#fff",
                    flex: 1,
                    paddingHorizontal: 50,
                    paddingVertical: 20,
                  }}
                >
                  Lorem ipsum dolor sit amet. Sit culpa galisum ut veritatis
                  provident in commodi perferendis in aspernatur iure aut illum
                  sunt. Ut aperiam enim At voluptates facilis qui sunt possimus
                  est facere sapiente in doloremque sunt. Eum iusto 33 quae
                  dolores aut officiis illum et dolores alias est dolores ullam.
                  Ut quia amet sit placeat ipsam non dolore neque sit nobis
                  nobis ut nobis officiis. provident in commodi perferendis in
                  aspernatur iure aut illum sunt.
                  Lorem ipsum dolor sit amet. Sit culpa galisum ut veritatis
                  provident in commodi perferendis in aspernatur iure aut illum
                  sunt. Ut aperiam enim At voluptates facilis qui sunt possimus
                  est facere sapiente in doloremque sunt. Eum iusto 33 quae
                  dolores aut officiis illum et dolores alias est dolores ullam.
                  Ut quia amet sit placeat ipsam non dolore neque sit nobis
                  nobis ut nobis officiis. provident in commodi perferendis in
                  aspernatur iure aut illum sunt.
                </Paragraph>
              </List.Accordion>
              <List.Accordion
                theme={{
                  colors: { primary: "#6E91EC", underlineColor: "transparent" },
                }}
                style={{ backgroundColor: "#fff" }}
                title="Countries We Serve"
                left={(props) => (
                  <List.Icon {...props} icon="earth" />
                )}
              >
                <View
                style={{ backgroundColor: "#fff" }}>
                  {countries.map((item)=>{
                    return <List.Item title={item} />
                  })}
                </View>
              </List.Accordion>
              <List.Accordion
                theme={{
                  colors: { primary: "#6E91EC", underlineColor: "transparent" },
                }}
                style={{ backgroundColor: "#fff" }}
                title="FAQ"
                left={(props) => <List.Icon {...props} icon="comment-question-outline" />}
              >
                <View style={{paddingVertical:10, backgroundColor:'#fff'}}>
                {faq.map((item,index)=>{
                  return(
                    <View key={index}>
                      <Text style={{fontWeight:'bold',marginBottom:10}}>{item.question}</Text>
                      <Text style={{marginBottom:20}}>{item.answer}</Text>
                    </View>
                  )
                })}
                </View>
              </List.Accordion>
            </List.Section> */}
