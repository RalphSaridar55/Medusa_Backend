import React, { Component } from "react";
import { Divider, Headline } from "react-native-paper";
import { View, ScrollView } from "react-native";
import aboutStyle from "./aboutStyle";
import { Image, Dimensions } from "react-native";
import { Paragraph, List } from "react-native-paper";

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 200;
const countries = ['Lebanon','India','Bahrain','Dubai','USA','UK'];
const images = [
  "https://images.zoodmall.com/app/banner/main_banner_60ebe5af36df7.jpg",
  "https://images.zoodmall.com/app/banner/main_banner_60dc615c5fceb.jpg",
  "https://images.zoodmall.com/app/banner/main_banner_60face123151e.jpg",
];
export default class About extends Component {
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: image }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={aboutStyle.container}>
        <Headline style={aboutStyle.headLine}>About us </Headline>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={aboutStyle.img}
              source={{
                uri: "https://cdn.corporatefinanceinstitute.com/assets/team-cohesion.jpeg",
              }}
            ></Image>
          </View>
          <View>
            <List.Section>
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
              {/* <Divider></Divider>
              <List.Accordion
                style={{ backgroundColor: "#fff" }}
                title="Countries We Serve"
                left={(props) => <List.Icon {...props} icon="blur" />}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
              <Divider></Divider> */}
            </List.Section>
          </View>
        </ScrollView>
      </View>
    );
  }
}
