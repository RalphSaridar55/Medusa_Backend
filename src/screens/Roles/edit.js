import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import { Headline, Paragraph, TextInput, List, Avatar, Card } from 'react-native-paper';
import SelectMultiple from "react-native-select-multiple";
import CollapsibleList from 'react-native-collapsible-list';
import styles from "./style"
import * as apiServices from '../../core/apis/apiUserServices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import Spinner from "react-native-loading-spinner-overlay";
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
        permission:[],
        route_data:{},
        fetchedRole: [
            {
                id: "1",
                name: "name"
            },
            {
                id: "2",
                name: "name 2"
            }
        ],

        isLoading:false,

    }

    componentDidMount(){
        console.log("ROUTE PROPS: ",this.props.route.params.item);
        this.setState({
            route_data:this.props.route.params.item,
            role:this.props.route.params.item.role_name,
        })
        this.getUserData();
        apiServices.getRoleDetails(this.props.route.params.item.id).then((res)=>{
            console.log("FROM THE FUNCTION: ",res)
            let perm = []
            res.data.permissions.map((item)=>{
                perm.push({label:item.permission_name,value:item.id})
            })
            this.setState({permission:perm})
        })
        apiServices.getPermissionsList().then((res)=>{
            console.log("STATE PERMISSION: ",this.state.permission)
            let permissions = []
            this.state.permission.map((item)=>{
                permissions.push(item)
            })
            console.log("PERM RESULT: ",res.data )
            /* let result = this.state.permission.find(x=>{
              return  x.value==71
            }); */

            
            let results = res.data.filter((i)=>{
                let id = permissions.find(id=>{
                   return id.value==i.id
                });
                console.log("ID IS: ",id)
                return i.id !== id?.value;
            })
            console.log("RESULTS: ",results)
            results.map((item)=>{
                permissions.push({label:item.permission_name,value:item.id})
            })
            this.setState({permissions:permissions})
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
    deleteRole = (id) =>{
        apiServices.deleteRole(id).then((res)=>{
            console.log("From the component function:" ,res);
            this.props.navigation.goBack();
        }).catch(err=>{Alert.alert("Error",err.response.data.message)})
    }

    editRole = (id) =>{
        if(this.state.roleError || this.state.permission.length<1 || this.state.role.length<1)
            Alert.alert("Role Error","Please fill the required fields")
        else{
            let formed_permissions = []
            this.state.permission.map((item)=>{
                if(item.value)
                    formed_permissions.push(item.value)
            })

            let payload = {
                role_name:this.state.role,
                permission_id:formed_permissions,
                role_id:id
            }
            console.log("PAYLOAD SHOULD BE: ",payload)
            this.setState({isLoading:true});
            apiServices.editRole(payload).then((res)=>{
                this.setState({isLoading:false});
                console.log("RESULT FROM API: ",res)
                Alert.alert("Role",res,[{text:"OK",onPress:()=>this.props.navigation.goBack()}])
            }).catch(err=>{
                console.log("Error:\n",err)
                this.setState({isLoading:false});
                Alert.alert("Error",err.response.data.message);
            })
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
                style={{
                    flex: 1,
                }}>
                <Spinner visible={this.state.isLoading} />
                <View style={{ flex: 1, padding: 15,marginTop:20}}>
                            
                    <View
                    style={{
                        marginBottom: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    <Headline style={{ marginBottom: 10, color: "#698EB7", fontWeight: "bold" }}>Edit Role #{this.state.route_data?.id}</Headline>
                    <Ionicons
                        name="trash-outline"
                        size={30}
                        color="red"
                        onPress={() =>
                        Alert.alert(
                            "Delete Role",
                            "Are you sure you want to delete this Role?",
                            [
                            { text: "No", onPress: () => console.log("refused") },
                            {
                                text: "Yes",
                                onPress: () =>
                                this.deleteRole(this.state.route_data.id),
                            },
                            ]
                        )
                        }
                    />
                    </View>
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
                        <Text>Permissions</Text>
                      </View>
                    }
                  >
                    <View
                        style={{height:height*0.4}}>
                        <SelectMultiple
                            items={this.state.permissions}
                            selectedItems={this.state.permission}
                            labelStyle={{color:'black'}}
                            selectedLabelStyle	={{color:'#698EB7'}}
                            onSelectionsChange={(item) =>{
                                this.setState({permission:item})
                                console.log("CHOSEN PERMISSION: ",item)
                            }
                            }
                        />
                    </View>
                    </CollapsibleList>

                </View>
                <TouchableOpacityButton onPress={()=>this.editRole(this.props.route.params.item.id)}
                text="Edit Role" />
                {/* <TouchableOpacity style={styles.loginBtn} onPress={()=>this.editRole(this.props.route.params.item.id)}>
                    <Text style={styles.loginText}>Edit Role</Text>
                </TouchableOpacity> */}

            </ImageBackground>
        );
    }
}

