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
import { TouchableOpacityButton } from '../../components/TouchableOpacity';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page:1,
            total_roles:0,
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
        apiUserServices.getRoleList(1,"role").then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false,total_roles:res.data.total_count})
        })
    }

    componentDidMount() {
        apiUserServices.getRoleList(1,"role").then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false,total_roles:res.data.total_count})
        })
  
      this.focusListener = this.props.navigation.addListener("focus", () => {
        
        apiUserServices.getRoleList(1,"role").then((res)=>{
            console.log('FROM FUNCTION: ',res.data.data)
            this.setState({roles:res.data.data,isLoading:false,total_roles:res.data.total_count})
        })
      });
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

    loadMore=(page)=>{
        this.setState({isLoading:true,page:page});
        apiUserServices.getRoleList(page,"role").then((res)=>{
            let result = this.state.roles.concat(res.data.data);
            this.setState({roles:result,isLoading:false})
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E9F3FF' }} >
                <Spinner visible={this.state.isLoading}/>
                <Headline
                style={{ margin: 20, marginBottom: 20, color: "#698EB7" }}
                >
                Roles
                </Headline>
                <View style={{ maxHeight: height*0.9,flex:1}}>
                        <ScrollView style={{ maxHeight: height*0.75,marginHorizontal:20}} showsVerticalScrollIndicator={false}
                        onScroll={({nativeEvent}) => {
                            if (this.isCloseToBottom(nativeEvent) && this.state.roles.length<this.state.total_roles) {
                                let page = this.state.page + 1; 
                                this.loadMore(page);
                            }
                          }}
                        >
                            {this.state.roles?.map((i,index)=>(
                            <TouchableOpacity 
                            style={styles.touchable}
                            key={index}
                            onPress={()=>{
                                this.props.navigation.navigate("Edit",{item:i})
                            }}>
                                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                    {/* <View style={{ paddingTop: 20, paddingBottom: 20, display:'flex', flexDirection:'column',justifyContent:'space-between' }}> */}
                                        <Text>{i.role_name}</Text>
                                        <Text numeric style={{ marginRight: 15,color:'#C4C4C4' }}>{i.num_of_permission} Permissions</Text>
                                    {/* </View> */}
                                </View>
                            </TouchableOpacity>
                            ))
                            }
                        </ScrollView>
                    </View>
                    <TouchableOpacityButton 
                     onPress={() => this.props.navigation.navigate('Create')}
                     text="Add Role"/>
            </View>
        );
    }
}
