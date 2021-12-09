import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "./style_notification";
const data = {
  subject: "Changing the price",
  date: "01-03-2021",
  Message: `Cras sagittis tempus tortor.Aliquam non justo porttitor, hendrerit velit quis, porttitor elit. Donec finibus tempus eros eget aliquet. Donec malesuada consequat mauris, nec convallis neque tempus ,`,
};

const Notification = ({route}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [routeData,setRouteData] = useState();

  useEffect(() => {
    setRouteData(route.params)
    setIsVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={isVisible} />
      <Card>
        <Card.Title
          title={routeData?.senderData.name}
          titleStyle={{fontFamily:'Adam-Bold'}}
          subtitle={routeData?.created_at.substring(0,10)}
          subtitleStyle={{fontFamily:'Inter-Black-Light'}}
          left={(props) => <Avatar.Icon size={20} {...props} icon="bell" />}
        />
        <Card.Content>
          <ScrollView
            style={styles.messageContainer}
            showsVerticalScrollIndicator={false}
          >
            <Paragraph style={{fontFamily:'Inter-Black-Light'}}>{routeData?.message}</Paragraph>
          </ScrollView>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Notification;
