import React, { Component } from "react";
import SelectMultiple from "react-native-select-multiple";
import Spinner from "react-native-loading-spinner-overlay";
import CollapsibleList from "react-native-collapsible-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailValidator } from "../../helpers/emailValidator";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Headline, TextInput, IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";
import styles from "./create_style";
import { docValidator } from "../../helpers/docValidator";
import * as apiServices from "../../core/apis/apiUserServices";
import { AntDesign } from "@expo/vector-icons";

export default class AddUsers extends Component {
  state = {
    email: "",
    subject: "",
    message: "",
    company_name:"",
    username: "",
    role: {
      role_id: 0,
      role_name: "",
    },
    docs: {},
    docsError: "",
    userPermissions: [],
    selectedItems: [],

    roles: [
      {
        id: 1,
        num_of_permission: 1,
        role_name: "role 1",
        status: 2,
      },
    ],
    permissions: [
      { label: "permission 1", id: 1 },
      { label: "permission 2", id: 2 },
    ],
    docError: true,
    openPermissions: false,
    isLoading:false,
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  createUser = () => {
    /* console.log(
      "DATA: ",
      this.state.email,
      "\n",
      this.state.username,
      "\n",
      this.state.role,
      "\n",
      this.state.userPermissions,
      "\n",
      this.state.docs
    ); */
    if (
      this.state.username.length < 1 ||
      this.state.role.role_name.length < 1 ||
      this.state.userPermissions.length < 1
    )
      Alert.alert("Input Error", "Please Fill all fields");
    else if (emailValidator(this.state.email).length > 0)
      Alert.alert("Email Error", "Please Insert a Valid Email");
    else if (!this.state.docs.name)
      Alert.alert(
        "Identification File Error",
        "Please attach the required file"
      );
    else {
      this.setState({isLoading:true})
      //Alert.alert("Success", "Signup should run");
       let payload = {
        sub_user_email: this.state.email,
        //to be changed
        company_name: this.state.username,
        company_reg_doc: this.state.docs.uri,
        role_name: this.state.role.role_name,
        role_id: this.state.role.role_id,
        permissions: this.state.userPermissions,
      };
      console.log("PAYLOAD ",payload)
      apiServices.addSubUser(payload).then((res) => {
        console.log("RES:\n",res)
        this.setState({isLoading:false});
        Alert.alert("User Creation",res);
      }).catch(err =>{
        console.log("Error:\n",err)
        this.setState({isLoading:false});
        Alert.alert("Error","Something went wrong, please your inputs and try again");
      } );
    }
  };

  getRoles = () => {
    apiServices.getRoleList().then((result) => {
      /* let roles = []
    result.data.data.map((i)=>{
        roles.push(i.role_name)
    }) */
      this.setState({ roles: result.data.data });
      console.log("roles \n", result.data.data);
      //this.setState({roles:result})
    });
  };

  componentDidMount() {
    this.getRoles();
    //this.getCompanyName();
  }

  getCompanyName= async()=>{
    try {
      console.log("+++Inside the AsyncStorage Function")
      const value = await AsyncStorage.getItem('company_name');
      console.log("Company name is ",value)
      if (value !== null) {
        // We have data!!
        this.setState({company_name:value})
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  componentDidUpdate() {
    this.state.permissions;
    this.state.userPermissions;
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true){
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or png type of files"
      );
      this.setState({docError:true})
      }
    else {
      console.log(result);
      try {
        this.setState({ docs: result, docError: false });
      } catch (error) {
        this.setState({ docError: true });
      }
    }
  };
  onMultiChange() {
    console.log();
  }

  changeRole(selection) {
    console.log(selection);
    if (selection.id != 0) {
      apiServices.getRoleDetails(selection.id).then((res) => {
        let array = [];
        res.data.permissions.map((item) => {
          array.push({
            permission_id: item.id,
            permission_module_name: item.permission_name,
            permission_name: item.permission_name,
          });
          this.setState({
            userPermissions: array,
            role: { role_id: selection.id, role_name: selection.name },
          });
        });
      });
    } else {
      this.setState({
        userPermissions: [],
        role: {
          role_id: 0,
          role_name: "",
        },
      });
    }
  }

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ userPermissions: selectedFruits });
    console.log(this.state.userPermissions);
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ScrollView>
      <Spinner visible={this.state.isLoading} />
          <View
            style={{
              flex: 1,
              padding: 15,
              justifyContent: "center",
              marginTop: 100,
            }}
          >
            <Headline style={{ marginBottom: 10, color: "#698EB7" }}>
              Create Sub User
            </Headline>
            <TextInput
              label="Email"
              placeholder="email@gmail.com"
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              onChangeText={(e) => this.setState({ email: e})}
            />
            <TextInput
              label="Username"
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              onChangeText={(e) => this.setState({ username: e})}
            />
            {/* Drop down  */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "#fff",
              }}
            >
              <Picker
                selectedValue={this.state.role}
                onValueChange={(itemValue, itemIndex) =>
                  this.changeRole(itemValue)
                }
              >
                <Picker.Item value={{ id: 0, name: "Roles" }} label="Roles" style={{color:'gray'}}/>
                {this.state.roles.map((option) => (
                  <Picker.Item
                    style={{color:'black'}}
                    key={option.id}
                    value={{ id: option.id, name: option.role_name }}
                    label={option.role_name}
                  />
                ))}
              </Picker>
            </View>
            {/* should be a list  */}
            <View
              style={{
                marginVertical: 20,
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#DCDCDC",
              }}
            >
              <CollapsibleList
                numberOfVisibleItems={0}
                buttonPosition="top"
                wrapperStyle={{ backgroundColor: "#fff" }}
                buttonContent={
                  <View
                    style={{
                      backgroundColor: "#fff",
                      height: 50,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ paddingLeft: 10, fontSize: 16, color:'gray'}}>
                      Permissions
                    </Text>
                  </View>
                }
              >
                <View style={{ paddingHorizontal: 6, paddingBottom: 10 }}>
                  {this.state.userPermissions.length > 0 ? (
                    this.state.userPermissions.map((i,index) => (
                      <Text
                        style={{
                          paddingBottom: 5,
                          borderBottomColor: "#DCDCDC",
                          borderBottomWidth: 1,
                        }}
                      >
                        {index+1}    {i.permission_name}
                      </Text>
                    ))
                  ) : (
                    <Text style={{ paddingBottom: 5, borderBottomWidth: 0 }}>
                      Please Select a role first
                    </Text>
                  )}
                </View>
              </CollapsibleList>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <IconButton
                icon="plus"
                size={20}
                onPress={this.pickDocument}
                style={{ backgroundColor: "#698EB7" }}
                color="#fff"
              />
              <Text
                style={{ marginLeft: 10, color: "#698EB7", fontWeight: "bold" }}
              >
                Company registraction doc (.pdf .png)
              </Text>
              {this.state.docError == true ? (
                <AntDesign
                  style={{ position: "absolute", right: 1 }}
                  name="closecircle"
                  size={24}
                  color="red"
                />
              ) : (
                <AntDesign
                  style={{ position: "absolute", right: 1 }}
                  name="checkcircle"
                  size={24}
                  color="green"
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => this.createUser()}
            >
              <Text style={styles.loginText}>Create</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
