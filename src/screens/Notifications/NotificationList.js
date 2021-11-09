import React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./style_notificationList";
import { Avatar, Card, IconButton } from "react-native-paper";

const List = ({ navigation }) => {
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;
  const dummyData = [
    {
      username: `User`,
      key: 1,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 2,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 3,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 4,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 5,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 6,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 7,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 8,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
    {
      username: `User`,
      key: 9,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "Read",
    },
    {
      username: `Username`,
      key: 10,
      subject: "Changing price",
      text: "Please do change the price of this item. Please do change the price of this item",
      date: "02-07-2021",
      status: "NotRead",
    },
  ];

  return (
    <View>
      <ScrollView style={styles.chatsContainer}>
        {dummyData
          //.sort((i) => (i.status === "NotRead" ? -1 : 1))
          .map((item, key) => {
            return (
              <View
                style={[
                  item.status == "Read"
                    ? { backgroundColor: "#E9F3FF" }
                    : { backgroundColor: "#E9F3FF" },
                ]}
              >
                <TouchableOpacity
                  key={key}
                  style={styles.containerChat}
                  onPress={() =>
                    navigation.navigate("Notifications", {
                      screen: "NotificationChat",
                    })
                  }
                >
                  <Card.Title
                    title={item.subject}
                    titleStyle={{ fontSize: 17}}
                    subtitle={item.text}
                    subtitleNumberOfLines={2}
                    left={(props) => (
                      <Avatar.Icon size={20} {...props} icon="bell"/>
                    )}
                    right={(props) => <Text style={{color:"#31C2AA"}}>{item.date}</Text>}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default List;
