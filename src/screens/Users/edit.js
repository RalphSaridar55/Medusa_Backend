import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import { emailValidator } from "../../helpers/emailValidator";
import { RenderPicker } from "../../components/Picker";
import { documentBlobConverter } from "../../helpers/documentBlobConverter";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import {
  Headline,
  TextInput,
  IconButton,
} from "react-native-paper";
import { docValidator } from "../../helpers/docValidator";
import CollapsibleList from "react-native-collapsible-list";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as apiPortfolio from '../../core/apis/apiPortfolioServices';
import * as apiServices from "../../core/apis/apiUserServices";
import * as ApiDocument from "../../core/apis/apiDocumentService"
import * as DocumentPicker from "expo-document-picker";
import styles from "./edit_style";
import { subUser } from "./map";
import {TouchableOpacityButton} from '../../components/TouchableOpacity'

export default class EditUsers extends Component {
  state = {
    id:0,
    email: "",
    username: "",
    subject: "",
    message: "",
    country_id:0,
    countries:[],
    country_code:'',
    state:'',
    city:'',
    street:'',
    phone:'',
    postal:'',
    role: null,
    role_name:'',
    permissions: "",
    docs: "",
    docsError: "",
    roles:[],
    selectedItems: [],
    userPermissions: [],

    company_name:"",
    userDataToEdit: {},
    isOpen: false,
    showModal: false,
    isLoading: true,
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
      this.state.role,
      "\n",
      this.state.role_name,
      "\n",
      this.state.userPermissions,
      "\n",
      this.state.docs
    ); 
    if (
      this.state.username.length < 1 ||
      this.state.role.role_name.length < 1 ||
      this.state.userPermissions.length < 1 ||
      this.state.country_code.length < 1 ||
      this.state.phone.length < 1 ||
      this.state.state.length < 1 ||
      this.state.city.length < 1 ||
      this.state.street.length < 1 ||
      this.state.postal.length < 1 
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
      /* let array=[];
      this.state.userPermissions.map((i)=>{
        array.push({permission_id:i.permission_id,permission_name:i.permission_name,permission_module_name: i.permission_module_name,})
      }) */
      this.setState({isLoading:true})
      //Alert.alert("Success", "Signup should run");
       let payload = {
        id:this.state.id,
        sub_user_email: this.state.email,
        //to be changed
        country_code:this.state.country_code,
        country_id:this.state.country_id,
        mobile_number:this.state.phone,
        state:this.state.state,
        city:this.state.city,
        street:this.state.street,
        postal_code:this.state.postal,
        company_name: this.state.username,
        company_reg_doc: this.state.docs,
        role_name: this.state.role.role_name,
        role_id: /* this.state.role?.role?this.state.role.role: */this.state.role.role_id,
        permissions: this.state.userPermissions,
      };
      console.log("PAYLOAD ",payload)
      if(typeof(this.state.company_reg_doc=="string")){
        this.editUserData(payload)
      }
      else{
        new Promise (async(resolve,reject)=>{
          let payloadToSend = [
            {uri:this.state.docs.uri,name:this.state.docs.name},
          ]
          resolve (Promise.all(await documentBlobConverter(payloadToSend)))
        }).then((res)=>{
          let company = this.state.docs.name
          return ([
            {document:res[0], extension:company.substring(company.length-4,company.length)},
          ])
        }).then(async(res)=>{
          let company_reg_doc = await ApiDocument.uploadDoc({document:res[0].document,extension:res[0].extension}).catch(err=>console.log("Error:",err.response.data.message))
          return await company_reg_doc
        }).then((res)=>{
          payload.company_reg_doc = res
          this.editUser(payload)
        })
      }
    }
  };

  editUserData = (payload) =>{
    apiServices.updateSubUser(payload).then((res) => {
      this.setState({isLoading:false});
      Alert.alert("User Modification","User Was Modified",[
        {text:"OK",onPress:()=>this.props.navigation.goBack()}
      ]);
    }).catch(err=>{
      console.log("Error:\n",err)
      this.setState({isLoading:false});
      Alert.alert("Error",err.response.data.message);
    });
  } 

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
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
        this.setState({ docs: result, docError: false });
      } catch (error) {
        this.setState({ docError: true });
      }
    }
  };

  getCountries(){
    apiPortfolio.getCountries().then((res)=>{
      this.setState({countries:res})
    })
  }

  changeRole(selection) {
    console.log("SELECTION:",selection);
    /* console.log("ROLES:",this.state.roles)
    let resultFind = this.state.roles.filter((i)=>
      i.id === selection
    ) */
    //console.log("RESULT FIND: ",resultFind)
    apiServices.getRoleDetails(selection).then((res) => {
      let array = [];
      res.data.permissions.map((item) => {
        array.push({
          permission_id: item.id,
          permission_module_name: item.permission_name,
          permission_name: item.permission_name,
        });
      })
      this.setState({
        userPermissions: array,
        role: { role_id: res.data.id, role_name: res.data.role_name },
        isLoading:false
      });
    });
  }

  componentDidMount() {
    console.log("ROUTE DATA: ",this.props.route.params.item)
    this.getCompanyName();
    this.getCountries();
    this.getPermissions();
    this.getRoles();
    this.setState({
      userDataToEdit: this.props.route.params.item,
      userPermissions: this.props.route.params.item.permissions,
      role: {
        role_id:this.props.route.params.item.role_id,
        role_name: this.props.route.params.item.role_name
      },
      id:this.props.route.params.item.id,
      username:this.props.route.params.item.username,
      email:this.props.route.params.item.email,
      docs:this.props.route.params.item.company_reg_doc,
      state:this.props.route.params.item.state,
      city:this.props.route.params.item.city,
      street:this.props.route.params.item.street,
      country_id:this.props.route.params.item.country_id,
      country_code:this.props.route.params.item.country_code,
      postal:this.props.route.params.item.postal_code+"",
      phone:this.props.route.params.item.mobile_number
    });
  }

  setOpen = (isOpen) => {
    this.setState({
      isOpen,
    });
  };
  
  getRoles = () => {
    apiServices.getRoleList(1,"user").then((result) => {
       let roles = []
    /*result.data.data.map((i)=>{
        roles.push(i.role_name)
    }) */
      result.data.data.map((item)=>{
        roles.push({label:item.role_name,value:item.id})
      })
      this.setState({ roles: roles, });
      //this.changeRole(roles[0].value);
      this.setState({isLoading:false})
      //this.setState({roles:result})
    });
  };

  drawInputs(){
    return subUser.map((item,index)=>{
      switch(item.type){
        case 'textfield':
            return <TextInput
              key={index}
              label={item.label}
              placeholder={item.placeholder}
              keyboardType={item.keyboardType}
              mode="outlined"
              outlineColor="#C4C4C4"
              onChangeText={(e)=>this.setState({[item.value]:e})}
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state[item.value]}
            />
        case 'picker':
          return <RenderPicker 
          key={index}
          containerStyle={styles.dropdown}
          selectedValue={this.state[item.value]}
          onValueChange={(itemValue, itemIndex) => 
            this.setState({[item.value]:itemValue})
          }
          map={this.state[item.items]}
          /* chosenLabel={this.state[item.chosenLabel]}
          chosenValue={this.state[item.chosenValue]} */
      />
      }
    })
  }

  setPermission = async (callback) => {
    await this.setState((state) => ({
      permissions: callback(state.permissions),
    }));
  };

  getPermissions = () => {
    apiServices.getPermissionsList().then((result) => {
      console.log('compo func',result);
      let permissions = [];
      //console.log(result)
      result.data.map((i) => {
        permissions.push({ label: i.permission_name, value: i.id });
      });
      this.setState({ permissions: permissions });
      console.log(this.state.permissions);
      //this.setState({roles:result})
    }).catch(err=>Alert.alert("err",err.response.data.message));
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
              marginTop: 20,
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
              
            </View>
            {this.drawInputs()}
            
            {this.state.roles.length>0 &&<RenderPicker 
                containerStyle={styles.dropdown}
                selectedValue={this.state.role.role_id}
                onValueChange={(itemValue, itemIndex) => 
                  this.changeRole(itemValue)
                }
                map={this.state.roles}
            />}

            <View
              style={{
                marginVertical: 10,
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
            <TouchableOpacityButton 
            text="Apply Changes" 
            onPress={()=>this.editUser()}
            additionalButtonStyle={styles.loginBtn}/>
            {/* <TouchableOpacity style={styles.loginBtn} onPress={()=> this.editUser()}>
              <Text style={styles.loginText}>Apply Changes</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
