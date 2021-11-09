import React,{useState,useEffect} from 'react';
import {View,Text, ScrollView, FlatList, Image, TouchableOpacity} from 'react-native'
import { List, Checkbox, Button, Appbar, Searchbar, IconButton, Title } from 'react-native-paper';
import ActionSheet from "react-native-actions-sheet";
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../Products/listing_style';
//import Image from '../../../assets/images/mycampaign1.jpg'

const SponsoredProducts = () =>{

    const [data,setData] = useState([
        {id:1,product_name:"product 1",image:`${require('../../../assets/images/mycampaign1.jpg')}`,description:"This is a descriptionThis is a descriptionThis is a description of our promoted product This is a description of our promoted product"},
        {id:2,product_name:"product 2",image:`${require('../../../assets/images/mycampaign2.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:3,product_name:"product 3",image:`${require('../../../assets/images/mycampaign1.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:4,product_name:"product 4",image:`${require('../../../assets/images/mycampaign2.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:5,product_name:"product 5",image:`${require('../../../assets/images/mycampaign1.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:6,product_name:"product 6",image:`${require('../../../assets/images/mycampaign2.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:7,product_name:"product 7",image:`${require('../../../assets/images/mycampaign1.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:8,product_name:"product 8",image:`${require('../../../assets/images/mycampaign2.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:9,product_name:"product 9",image:`${require('../../../assets/images/mycampaign1.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"},
        {id:10,product_name:"product 10",image:`${require('../../../assets/images/mycampaign2.jpg')}`,description:"This is a description of our promoted product This is a description of our promoted product"}
    ]);
    const [filterData,setFilterData] = useState([]);
    const [visible,setVisible] = useState({spinner:true,search:false});
    const [search,setSearch] = useState("");
    useEffect(()=>{
        setFilterData(data)
        setVisible({...visible,spinner:false})
    },[])

    return(
    <View style={styles.container}>
        <Spinner visible={visible} />
        <View>
            <Appbar style={{backgroundColor:"#E9F3FF" , color:"#fff"}}>
                <Appbar.Content title={filterData?.filter
                (i=>i.product_name.toLowerCase().includes(search.toLowerCase())).length + " " + "Results"} /* onPress={this.setView} */ style={{ fontSize: 14 }} />
                <Appbar.Action icon="magnify" onPress={()=> this.onclick()}
                    style={!visible.search&&{backgroundColor:'#31C2AA'}}  color={!visible.search?"#E9F3FF":"black"}/>
            </Appbar>
        </View>
        <View style={{paddingHorizontal:15,paddingVertical:10,}}>
            <Searchbar
                onChangeText={(e)=>setSearch(e)}
                placeholder="Search"
                style={{ display: visible.search ? 'none' : 'flex', }}
            />
        </View>
        <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={filterData.filter
                (i=>i.product_name.toLowerCase().includes(search.toLowerCase()))}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
                return item.id;
            }}
            renderItem={({ item }) => {
                return (
                    <View style={[styles.card,{borderRadius:15}]}>
                        <View style={styles.cardHeader}>
                        </View>
                        <Image style={styles.userImage} source={item.image}  resizeMode="contain"/>
                        <View style={styles.cardFooter}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={styles.name}>{item.product_name}</Text>
                                <Text style={{color:'gray',paddingTop:10,textAlign:'center'}}>{item.description.length>100?item.description.substring(0,100)+"...":item.description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={()=>console.log(123)}
                            style={[styles.loginBtn]}
                        >
                            <Text style={styles.loginBtnText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )
            }} />
    </View>
    )
}

export default SponsoredProducts