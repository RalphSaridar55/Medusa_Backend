import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import { Headline, Paragraph, TextInput, List, Avatar, Card } from 'react-native-paper';
import SelectMultiple from "react-native-select-multiple";
import CollapsibleList from 'react-native-collapsible-list';
import styles from "./style"
import * as apiServices from '../../core/apis/apiUserServices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableOpacityButton } from '../../components/TouchableOpacity';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class AddRole extends Component {
    state = {
        email: "",
        subject: "",
        message: "",
        user_type:0,
        role:'', roleError:false, roleErrorText:'',
        permissions:[],
        visible:false,
        permission:[],
        fetchedRole: [
            {
                id: "1",
                name: "name"
            },
            {
                id: "2",
                name: "name 2"
            }
        ]
    }

    componentDidMount(){
        this.getUserData();
        apiServices.getPermissionsList().then((res)=>{
            let array=[]
            console.log("FROM THE FUNCTION: ",res)
            res.data.map((item)=>{
                array.push({label:item.permission_name,value:item.id})
            })
            this.setState({permissions:array})
        })
    }

    setRoles = (e) => {
        this.setState({ roles: e.target.value }
        )
    }

    getUserData = async()=>{
        try {
          const value = JSON.parse(await AsyncStorage.getItem('user_details'));
          if (value !== null) {
            // We have data!!
            console.log("USER DETAILS: ",value);
            this.setState({user_type:value.user_type})
          }
        } catch (error) {
          // Error retrieving data
        }
    }

    createRole = () =>{
        this.setState({visible:true})
        if(this.state.roleError || this.state.permission.length<1 || this.state.role.length<1){
            Alert.alert("Role Error","Please fill the required fields")
            this.setState({visible:false})
            return;
        }
        else{
            let formed_permissions = []
            this.state.permission.map((item)=>{
                formed_permissions.push(item.value)
            })
            let payload = {
                role_name:this.state.role,
                permission_id:formed_permissions,
                user_type:this.state.user_type
            }
            console.log("PAYLOAD SHOULD BE: ",payload)
            apiServices.addRole(payload).then((res)=>{
                Alert.alert("Role",res,[
                    {text:"OK",onPress:()=>this.props.navigation.goBack()}
                  ])
                this.setState({visible:false})
            }).catch(err=>{
                console.log("Error:\n",err)
                this.setState({visible:false})
                Alert.alert("Error",err.response.data.message);});
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
                style={{
                    flex: 1,
                }}>
                <View style={{ flex: 1, padding: 15,marginTop:20}}>
                    <Spinner visible={this.state.visible} />
                    <Headline style={{ color: "#698EB7", fontFamily:'Adam-Bold' }}>Create a Role</Headline>
                    <TextInput
                        label="Role name*"
                        placeholder="Role"
                        mode="outlined"
                        outlineColor="#C4C4C4"
                        value={this.state.role}
                        theme={{ colors: { primary: '#31c2aa' } }}
                        style={styles.inputView}
                        onChangeText={(e)=>this.setState({role:e})}
                        error={this.state.roleError}
                        onBlur={()=>{
                            if(this.state.role.length<1)
                                this.setState({roleError:true,roleErrorText:'Field can\'t be empty'})
                            else
                                this.setState({roleError:false,roleErrorText:''})
                        }}
                    />
                    <CollapsibleList
                    style={{ marginVertical: 10 }}
                    wrapperStyle={{
                      borderWidth: 0,
                      borderColor: "#A6A6A6",
                      borderRadius: 5,
                      height:height*0.4
                    }}
                    buttonPosition="top"
                    numberOfVisibleItems={0}
                    buttonContent={
                      <View
                        style={[
                          styles.docPicker,
                          {
                            borderColor: "#A6A6A6",
                            backgroundColor: "#fff",
                            marginVertical: 0,
                          },
                        ]}
                      >
                        <Text style={{fontFamily:'Inter-Black-Light'}}>Permissions</Text>
                      </View>
                    }
                  >
                    <SelectMultiple
                        items={this.state.permissions}
                        selectedItems={this.state.permission}
                        labelStyle={{color:'black',fontFamily:'Inter-Black-Light'}}
                        selectedLabelStyle	={{color:'#698EB7'}}
                        onSelectionsChange={(item) =>{
                            this.setState({permission:item})
                            console.log("CHOSEN PERMISSION: ",item)
                        }
                        }
                        /* renderLabel={(label)=>{
                        [element.value]=="category"?tlabel:<Text>Label</Text>
                        }} */	
                    />
                    </CollapsibleList>

                </View>
                <TouchableOpacityButton  onPress={()=>this.createRole()}  text="Create Role"/>
                
            </ImageBackground>
        );
    }
}

