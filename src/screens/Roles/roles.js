import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { Headline, DataTable, IconButton } from 'react-native-paper';
import styles from './roles_styles';
import * as apiUserServices from '../../core/apis/apiUserServices'
import Spinner from 'react-native-loading-spinner-overlay';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calls: [
                { id: 1, name: "Role A", status: "4 " },
                { id: 2, name: "Role C", status: "14 ", },
                { id: 3, name: "Role D", status: "2 ", },
                { id: 4, name: "Role E ", status: "1 ", },
                { id: 5, name: "Role A", status: "4 " },
                { id: 6, name: "Role C", status: "14 ", },
                { id: 7, name: "Role D", status: "2 ", },
                { id: 8, name: "Role E ", status: "1 ", },
                { id: 9, name: "Role A", status: "4 " },
                { id: 20, name: "Role C", status: "14 ", },
                { id: 31, name: "Role D", status: "2 ", },
                { id: 42, name: "Role E ", status: "1 ", },
                { id: 13, name: "Role A", status: "4 " },
                { id: 24, name: "Role C", status: "14 ", },
                { id: 35, name: "Role D", status: "2 ", },
                { id: 46, name: "Role E ", status: "1 ", },
                { id: 17, name: "Role A", status: "4 " },
                { id: 28, name: "Role C", status: "14 ", },
                { id: 39, name: "Role D", status: "2 ", },
                { id: 40, name: "Role E ", status: "1 ", },

            ],
            roles:[],
            isLoading:true,
        };
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    componentDidMount(){
        apiUserServices.getRoleList().then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false})
        })
    }

    componentDidMount() {
        apiUserServices.getRoleList().then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false})
        })
  
      this.focusListener = this.props.navigation.addListener("focus", () => {
        
        apiUserServices.getRoleList().then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false})
        })
      });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E9F3FF',marginTop:20}} >
                <Spinner visible={this.state.isLoading}/>
                <Headline
                style={{ margin: 20, marginBottom: 20, color: "#698EB7" }}
                >
                Roles
                </Headline>
                <View style={{ maxHeight: height*0.9,flex:1}}>
                        <ScrollView style={{ maxHeight: height*0.75,marginHorizontal:20}} showsVerticalScrollIndicator={false}>
                            {this.state.roles?.map((i,index)=>(
                            <TouchableOpacity 
                            style={styles.touchable}
                            key={index}
                            onPress={()=>{
                                this.props.navigation.navigate("Edit",{item:i})
                            }}>
                                <View style={{ paddingTop: 20, paddingBottom: 20, display:'flex', flexDirection:'row',justifyContent:'space-between' }}>
                                    <Text>{i.role_name}</Text>
                                    <Text numeric style={{ marginRight: 15,color:'#C4C4C4' }}>{i.num_of_permission} Permissions</Text>
                                </View>
                            </TouchableOpacity>
                            ))
                            }
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.loginBtn}
                     onPress={() => this.props.navigation.navigate('Create')}>
                        <Text style={styles.loginText}>Add Role</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}
