import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import { emailValidator } from "../../helpers/emailValidator";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import {
  Headline,
  Paragraph,
  TextInput,
  Dialog,
  Button,
  Provider,
  IconButton,
  Portal,
  List,
  Avatar,
  Card,
  Searchbar,
  Checkbox,
} from "react-native-paper";
import { docValidator } from "../../helpers/docValidator";
import CollapsibleList from "react-native-collapsible-list";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MultiSelect from "react-native-multiple-select";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import * as apiServices from "../../core/apis/apiUserServices";
import * as DocumentPicker from "expo-document-picker";
import styles from "./edit_style";
import { Ionicons } from "@expo/vector-icons";

const items = [
  {
    value: "1",
    label: "Role 1",
  },
  {
    value: "2",
    label: "Role 2",
  },
  {
    value: "3",
    label: "Role 3",
  },
];

const permissions = [
  {
    value: "1",
    label: "Permission 1",
  },
  {
    value: "2",
    label: "Permission 2",
  },
  {
    value: "3",
    label: "Permission 3",
  },
];

export default class EditUsers extends Component {
  state = {
    id:0,
    email: "",
    username: "",
    subject: "",
    message: "",
    role: {
      role_id: 0,
      role_name: "",},
    permissions: "",
    docs: "",
    docsError: "",
    roles:[
      {
        created_at: "2021-09-29T14:06:03.480Z",
        id: 0,
        num_of_permission: 9,
        role_name: "Role 1",
        status: 3,
        updated_at: "2021-09-29T14:51:56.502Z",
      }
    ],
    selectedItems: [],
    userPermissions: [],

    company_name:"",
    userDataToEdit: {},
    isOpen: false,
    showModal: false,
    isLoading: false,
    docError:false,
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

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

  editUser = () => {
    console.log(
      "DATA: ",
      this.state.email,
      "\n",
      this.state.username,
      "\n",
      this.state.role.role_name,
      "\n",
      this.state.userPermissions,
      "\n",
      this.state.docs
    ); 
    if (
      this.state.username.length < 1 ||
      this.state.role.role_name.length < 1 ||
      this.state.userPermissions.length < 1
    )
      Alert.alert("Input Error", "Please Fill all fields");
    else if (emailValidator(this.state.email).length > 0)
      Alert.alert("Email Error", "Please Insert a Valid Email");
    else if (!this.state.docs)
      Alert.alert(
        "Identification File Error",
        "Please attach the required file"
      );
    else {
      let array=[];
      this.state.userPermissions.map((i)=>{
        array.push({permission_id:i.permission_id,permission_name:i.permission_name,permission_module_name: i.permission_module_name,})
      })
      this.setState({isLoading:true})
      //Alert.alert("Success", "Signup should run");
       let payload = {
        id:this.state.id,
        sub_user_email: this.state.email,
        //to be changed
        company_name: this.state.username,
        company_reg_doc: this.state.docs,
        role_name: this.state.role.role_name,
        role_id: this.state.role.role_id,
        permissions: array,
      };
      console.log("PAYLOAD ",payload)
      apiServices.updateSubUser(payload).then((res) => {
        this.setState({isLoading:false});
        Alert.alert("User Modification","User Was Modified");
      });
    }
  };


  deleteSubUser = (id) => {
    apiServices.deleteSubUsers(id).then((res) => {
      console.log("Deleted", res);
      this.props.navigation.navigate("UserList");
    });
  };

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    let test = docValidator(result.name);
    if (test == true){
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or png type of files"
      );
      this.setState({docError:true, docs:""})
      }
    else {
      console.log(result);
      try {
        this.setState({ docs: result.uri, docError: false });
      } catch (error) {
        this.setState({ docError: true });
      }
    }
  };

  changeRole(selection) {
    console.log(selection);
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
  }

  componentDidMount() {
    console.log("ROUTE DATA: ",this.props.route.params.item)
    this.getCompanyName();
    this.getPermissions();
    this.getRoles();
    this.setState({
      userDataToEdit: this.props.route.params.item,
      userPermissions: this.props.route.params.item.permissions,
      role: {
        role_id: this.props.route.params.item.role_id,
        role_name: this.props.route.params.item.role_name,
      },
      id:this.props.route.params.item.id,
      username:this.props.route.params.item.username,
      email:this.props.route.params.item.email,
      docs:this.props.route.params.item.company_reg_doc
    });
  }

  setOpen = (isOpen) => {
    this.setState({
      isOpen,
    });
  };
  
  getRoles = () => {
    apiServices.getRoleList().then((result) => {
      /* let roles = []
    result.data.data.map((i)=>{
        roles.push(i.role_name)
    }) */
      this.setState({ roles: result.data.data.sort((a,b)=>a.id===this.props.route.params.item.role_id) });
      console.log("roles \n", result.data.data);
      //this.setState({roles:result})
    });
  };

  setPermission = async (callback) => {
    await this.setState((state) => ({
      permissions: callback(state.permissions),
    }));
  };

  getPermissions = () => {
    apiServices.getPermissionsList().then((result) => {
      //console.log('compo func',result);
      let permissions = [];
      //console.log(result)
      result.data.map((i) => {
        permissions.push({ label: i.permission_name, value: i.id });
      });
      this.setState({ permissions: permissions });
      console.log(this.state.permissions);
      //this.setState({roles:result})
    });
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
        <Spinner visible={this.state.isLoading} />
        <ScrollView>
          <View
            style={{
              flex: 1,
              padding: 15,
              justifyContent: "center",
              marginTop: 100,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Headline style={{ color: "#698EB7" }}>Edit Sub User</Headline>
              <Ionicons
                name="trash-outline"
                size={30}
                color="red"
                onPress={() =>
                  Alert.alert(
                    "Delete Sub-user",
                    "Are you sure you want to delete this sub-user?",
                    [
                      { text: "No", onPress: () => console.log("refused") },
                      {
                        text: "Yes",
                        onPress: () =>
                          this.deleteSubUser(this.state.userDataToEdit.id),
                      },
                    ]
                  )
                }
              />
            </View>
            <TextInput
              label="Email"
              placeholder="email@gmail.com"
              mode="outlined"
              outlineColor="#C4C4C4"
              onChangeText={(e)=>this.setState({email:e})}
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state.email}
            />

            <TextInput
              label="Username"
              mode="outlined"
              outlineColor="#C4C4C4"
              onChangeText={(e)=>this.setState({username:e})}
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={
                this.state.username
              }
            />

            <View style={styles.dropdown}>
              <Picker
                selectedValue={this.state.role}
                onValueChange={(itemValue, itemIndex) => 
                  this.changeRole(itemValue)
                }
              >
                {this.state.roles?.map((option) => (
                  <Picker.Item
                  style={{color:'black'}}
                  key={option.id}
                  value={{ id: option.id, name: option.role_name }}
                  label={option.role_name}
                  />
                ))}
              </Picker>
            </View>

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
                    <Text style={{ paddingLeft: 10, fontSize: 16, color:'gray' }}>
                      Permissions
                    </Text>
                  </View>
                }
              >
                <View style={{ paddingHorizontal: 6, paddingBottom: 10 }}>
                  {this.state.userPermissions.length > 0 ? (
                    this.state.userPermissions.map((i,index) => (
                      <Text
                        key={index}
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
            
            {/* <DropDownPicker
            style={styles.dropDownPickerSellers}
            listMode="FLATLIST"
            categorySelectable={true}
            //error when multiple={true}
            multiple={false}
            placeholder="Permissions"
            searchable={false}
            open={this.state.isOpen}
            value={this.state.permissions}
            items={permissions}
            setOpen={this.setOpen}
            setValue={this.setPermission}
          /> */}
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
                Company registration doc (.pdf .png)
              </Text>{this.state.docError == true ? (
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
            <TouchableOpacity style={styles.loginBtn} onPress={()=> this.editUser()}>
              <Text style={styles.loginText}>Apply Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
