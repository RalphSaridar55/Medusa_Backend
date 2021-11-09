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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
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

  
  deleteSubUser = (id) => {
    apiServices.deleteSubUsers(id).then((res) => {
      console.log("Deleted", res);
      this.props.navigation.navigate("UserList");
    }).catch(err=>{
      Alert.alert("Error",err.response.data.message);
    });
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Spinner visible={this.state.isLoading} />
        <View
          style={styles.touchable}
        >
          <View style={styles.Container}>
            <View style={styles.leftContainer}>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.nameTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.username}
                </Text>
                <Text style={styles.msgTxt}>{item.role_name}</Text>
                <Text style={styles.mblTxt}>
                  Last Active {item.last_login.substr(0, 10)}
                </Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.iconsContainer}>
                <Icon
                  name="pencil-outline"
                  color="gray"
                  size={24}
                  style={{ position: "relative", right: 20 }}
                    onPress={() =>
                      this.props.navigation.navigate("UserEdit", { item: item })
                  }
                />
                <Icon
                  name="trash-can-outline"
                  color="red"
                  size={24}
                  onPress={() =>
                    Alert.alert(
                      "Delete Address",
                      "Are you sure you want to delete this sub-user?",
                      [
                        { text: "No", onPress: () => console.log("refused") },
                        { text: "Yes", onPress: () => deleteSubUser(i.id) },
                      ]
                    )
                  }
                />
              </View>
            </View>
          </View>
        </View>
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
          <View>
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
