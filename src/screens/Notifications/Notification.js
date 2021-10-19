import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import CollapsibleList from "react-native-collapsible-list";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import * as apiService from "../../core/apis/apiChatServices";
import styles from "./style_notification";
const data = {
  subject: "Changing the price",
  date: "01-03-2021",
  Message: `Cras sagittis tempus tortor. Sed et vulputate eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam et metus semper, lobortis mauris et, pellentesque arcu. Integer tristique vel leo ac tristique. Mauris ac vulputate libero.
   Ut condimentum quis metus eleifend convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris mi nulla, elementum quis mollis ut, aliquet non quam. Ut et interdum metus, sodales vestibulum quam.
  In ac velit sem. Etiam justo nisl, dapibus ut orci id, scelerisque malesuada felis. Aliquam non justo porttitor, hendrerit velit quis, porttitor elit. Donec finibus tempus eros eget aliquet. Donec malesuada consequat mauris, nec convallis neque tempus a.
   Vivamus convallis feugiat diam at sagittis. Integer eget dictum diam, eget auctor neque. Curabitur id posuere nibh. Morbi finibus purus vitae urna tempor rhoncus. Donec venenatis ex at viverra sagittis. Praesent purus ante, hendrerit ut ipsum maximus, pulvinar convallis purus.
    Duis in tincidunt lacus. Pellentesque venenatis facilisis nulla ac ullamcorper. Aenean vehicula odio non facilisis vulputate. Vivamus feugiat et ipsum at faucibus. Phasellus sed risus tortor.
  Etiam porttitor gravida elit, non sollicitudin enim condimentum ac.\n Pellentesque pulvinar eu neque non volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed et lorem nec velit laoreet pharetra sit amet eget tellus.
   Pellentesque condimentum accumsan magna. Suspendisse a auctor ex. Aenean rhoncus ante felis, eget tincidunt elit dignissim dictum. Aliquam non placerat orci. Quisque vulputate ante sodales nulla tempus molestie. Maecenas consequat lacus mi. Sed pharetra magna vel lorem rhoncus,
    quis egestas tellus imperdiet. Phasellus accumsan dolor augue, ac pretium tellus imperdiet non. Morbi ornare enim nec libero aliquam, at facilisis eros eleifend. Nunc quis finibus sem, eget placerat enim.
  Suspendisse elementum tristique lectus, nec bibendum nulla feugiat eu. Phasellus blandit lectus in volutpat ullamcorper. Nullam commodo porttitor lorem non ultricies. Nulla sapien massa, ultrices id placerat ut, consectetur et odio. Aenean eget magna velit.
   In tempus tempus tempus. Fusce in sodales neque. Donec scelerisque, nibh vitae sodales feugiat, enim risus iaculis ex, sed placerat erat magna in arcu. Etiam efficitur ligula quis bibendum molestie. Praesent vulputate laoreet pharetra. Nulla eleifend venenatis augue,
    vitae placerat velit varius vel. Phasellus et dui est.\n Ut lorem nisi, rhoncus eget purus sit amet, tempus consequat urna. Nulla facilisi. Proin a augue feugiat, elementum orci mattis, iaculis libero. Cras ac mauris dolor.
  Fusce imperdiet, sapien vitae volutpat commodo, augue purus congue elit, vitae placerat sem neque id mi. Sed sed posuere enim. Proin molestie dapibus mollis. Mauris non lobortis leo, vitae elementum tortor. Sed suscipit elit at turpis tincidunt rhoncus
  . Aenean eget fermentum turpis. Mauris ligula dui, volutpat ut scelerisque ut, pulvinar ut augue. Maecenas hendrerit turpis orci.
  Duis laoreet lacus sit amet sem eleifend gravida. Nulla vitae nisi mattis, iaculis risus vel, tempor massa. In viverra urna vitae tempus faucibus. Nullam sit amet sem quis neque tempus tempus. Vivamus pretium, orci sit amet mollis maximus, odio arcu malesuada turpis,
   ac tempor est neque scelerisque felis. Proin iaculis massa nulla.`,
};

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

const Notification = () => {
  const [replies, setReplies] = useState();
  const [price, setPrice] = useState({ value: "", error: false });
  const [reply, setReply] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sendAction = () => {
    console.log("Should send a text");
  };

  useEffect(() => {
      setIsVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={isVisible} />
          <Image source={require('../../../assets/images/logo.png')}/>
          <View style={styles.titleContainer}>
            <Text style={styles.subject}>{data.subject}</Text>
            <Text style={styles.date}>{data.date}</Text>
          </View>
          <ScrollView style={styles.messageContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.message}>{data.Message}</Text>
          </ScrollView>
    </View>
  );
};

export default Notification;
