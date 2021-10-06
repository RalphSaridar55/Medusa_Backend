import * as apiServices from "../../core/apis/apiUserServices";
import React, { Component } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import { Headline } from "react-native-paper";
import styles from "./list_style";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default class Users extends Component {
  constructor(props) {
    super(props);
    //this.getSubUsers();
    this.state = {
      isLoading: true,
      image:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
      users: [],
      calls: [
        {
          id: 1,
          name: "User 1",
          status: "Last Active 1/2/2021 ",
          role: "Admin",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 2,
          name: "User 2",
          status: "Last Active 1/2/2021 ",
          role: "Employee",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 3,
          name: "User 3",
          status: "Last Active 1/2/2021 ",
          role: "Admin",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 4,
          name: "User 4",
          status: "Last Active 1/2/2021 ",
          role: "Manager",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 5,
          name: "Erick Doe",
          status: "Last Active 1/2/2021 ",
          role: "Manager",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 6,
          name: "Francis Doe",
          status: "Last Active 1/2/2021 ",
          role: "Admin",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 8,
          name: "Matilde Doe",
          status: "Last Active 1/2/2021 ",
          role: "Employee",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
        {
          id: 9,
          name: "John Doe",
          status: "Last Active 1/2/2021 ",
          role: "Admin",
          image:
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        },
      ],
    };
  }

  getSubUsers = () => {
    apiServices.getSubUsers().then((result) => {
      console.log("USER LIST", result);
      this.setState({ users: result, isLoading: false });
    });
  };

  componentDidMount() {
    this.getSubUsers();
    this.retrieveData();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.getSubUsers();
      this.retrieveData();
    });
  }

  retrieveData = async () => {
    try {
      console.log("+++Inside the AsyncStorage Function");
      const value = await AsyncStorage.getItem("company_name");
      console.log("Company name is ", value);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Spinner visible={this.state.isLoading} />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            this.props.navigation.navigate("UserEdit", { item: item })
          }
        >
          <View style={styles.row}>
            <Image source={{ uri: this.state.image }} style={styles.pic} />
            <View>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.nameTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.username}
                </Text>
              </View>
              <View style={styles.msgContainer}>
                <Text style={styles.msgTxt}>{item.role_name}</Text>
              </View>
            </View>
          </View>
            <View>
              <Text style={styles.mblTxt}>
                Last Active {item.last_login.substr(0, 10)}
              </Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: "#E9F3FF",
            flexDirection: "column",
          }}
        >
          <View style={styles.mainContainer}>
            <Headline
              style={{ margin: 20, marginVertical: 20, color: "#698EB7" }}
            >
              Manage Users
            </Headline>
            <FlatList
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={this.state.users}
              style={{ height: height * 0.7 }}
              keyExtractor={(item) => {
                return parseInt(item.id);
              }}
              renderItem={this.renderItem}
            />
          </View>
        </View>

        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate("UserCreate")}
          >
            <Text style={styles.loginText}>Add User</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
