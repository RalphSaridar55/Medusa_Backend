import React, { Component } from "react";
import SelectMultiple from "react-native-select-multiple";
import * as apiPortfolio from '../../core/apis/apiPortfolioServices';
import * as ApiDocument from "../../core/apis/apiDocumentService"
import Spinner from "react-native-loading-spinner-overlay";
import CollapsibleList from "react-native-collapsible-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emailValidator } from "../../helpers/emailValidator";
import { RenderPicker } from "../../components/Picker";
import { subUser } from "./map";
import { documentBlobConverter } from "../../helpers/documentBlobConverter";
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
import { TouchableOpacityButton } from "../../components/TouchableOpacity";

export default class AddUsers extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
    this.state = {
      email: "",
      subject: "",
      message: "",
      company_name:"",
      username: "",
      country_id:0,
      countries:[
      ],
      country_code:'',
      state:'',
      city:'',
      street:'',
      phone:'',
      postal:'',
      role:{
        role_id:0,
        role_name:"Role 1"
      },
      docs: "",
      docsError: "",
      userPermissions: [],
      selectedItems: [],
  
      roles: [
        /* {
          label:"Role 1",
          value:0
        } */
      ],
      permissions: "",
      docError: true,
      openPermissions: false,
      isLoading:true,
    };
  }
  

  /* onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }; */

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
    console.log(
      this.state.username,
      this.state.role.role_name,
      this.state.userPermissions,
      this.state.country_code,
      this.state.phone,
      this.state.state,
      this.state.city,
      this.state.street,
      this.state.postal,)
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
    else if (!this.state.docs.name)
      Alert.alert(
        "Identification File Error",
        "Please attach the required file"
      );
    else {
      this.setState({isLoading:true})
      //Alert.alert("Success", "Signup should run");
       let payload = {
        //id:this.state.id,
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
        role_id: this.state.role.role_id,
        permissions: this.state.userPermissions,
      };
      console.log("PAYLOAD ",payload)
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
        payload.company_reg_doc=res
      apiServices.addSubUser(payload).then((res) => {
        console.log("RES:\n",res)
        this.setState({isLoading:false});
        Alert.alert("User Creation",res,[
          {text:"Ok",onPress:()=>this.props.navigation.goBack()}
        ]);
      }).catch(err =>{
        console.log("Error:\n",err)
        this.setState({isLoading:false});
        Alert.alert("Error",err.response.data.message);
        });
      })
      }
  };

  getRoles = () => {
    apiServices.getRoleList(1,"user").then((result) => {
      
      console.log("roles \n", result.data.data);
      /* let roles = []
    result.data.data.map((i)=>{
        roles.push(i.role_name)
    }) */
      let roles = [];
      result.data.data.map((item)=>{
        roles.push({label:item.role_name,value:item.id})
      })
      this.setState({ roles: roles, });
      this.changeRole(roles[0].value);
      this.setState({isLoading:false})
      //this.setState({roles:result})
    });
  };
  

  getCountries(){
    console.log("RUNNING COUNTRIES")
    apiPortfolio.getCountries().then((res)=>{
      //console.log("COUNTRIES: ",res)
      this.setState({countries:res})
    })
  }

  componentDidMount() {
    this.getCountries();
    this.getRoles();
    console.log("REF: ",this.myRef.current.state.collapsed)
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

  /* componentDidUpdate() {
    this.state.permissions;
    this.state.userPermissions;
  } */

  /* onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }; */

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

  changeRole(selection) {
    console.log("SELECTION:",selection);
    if (selection != 0) {
      apiServices.getRoleDetails(selection).then((res) => {
        //console.log("RES: ",res)
        let array = [];
        res.data.permissions.map((item) => {
          array.push({
            permission_id: item.id,
            permission_module_name: item.permission_name,
            permission_name: item.permission_name,
          });
        });
        this.setState({
          userPermissions: array,
          role: { role_id: res.data.id, role_name: res.data.role_name },
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
          containerStyle={[styles.dropdown,{marginBottom:10}]}
          selectedValue={this.state[item.value]}
          onValueChange={(itemValue, itemIndex) => 
            this.setState({[item.value]:itemValue})
          }
          map={this.state[item.items]}
      />
      }
    })
  }

  /* onSelectionsChange = (item) => {
    // item is array of { label, value }
    this.setState({ userPermissions: item });
    console.log(this.state.userPermissions);
  }; */

  render() {
    /* const { selectedItems } = this.state; */

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
              marginTop: 20,
            }}
          >
            <Headline style={{ marginBottom: 10, color: "#698EB7" }} onPress={()=>{
              console.log("PRESSED");
              if(this.myRef.current.state.collapsed)
                this.myRef.current.toggle();
              /* this.myRef.current.state.collapsed=!this.myRef.current.state.collapsed; */
              console.log("COLLAPSED: ",this.myRef.current.state.collapsed)
              }}>
              Create Sub User
            </Headline>
            {this.drawInputs()}
            {this.state.roles.length>0 &&<RenderPicker 
                prompt="Roles"
                containerStyle={styles.dropdown}
                selectedValue={this.state.role.role_id}
                onValueChange={(itemValue, itemIndex) => 
                  this.changeRole(itemValue)
                }
                map={this.state.roles}
            />}
            <View
              style={{
                marginVertical: 20,
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#DCDCDC",
              }}
            >
              <CollapsibleList
                ref={this.myRef}
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
            <TouchableOpacityButton
            style={styles.loginBtn}
            text="Create"
            onPress={() => this.createUser()}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
