import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react'
import * as API from '../../core/apis/apiProductServices';
import {styles} from './DealsStyle';

const Deals = () =>{

    const [deals,setDeals] = useState([])
    useEffect(()=>{
        API.getFilteredProducts(1,null,null,null,null,null).then((res)=>{
            console.log("RESULT: ",res)
            setDeals(res.data)
        })
    },[])

    return(
        <View>
        <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={deals}
            horizontal={false}
            numColumns={2}
            // onEndReachedThreshold={5}
            // onScroll={({nativeEvent}) => {
            //     //console.log("length",this.state.total)
            //     if (this.isCloseToBottom(nativeEvent) && this.state.filterProducts.length<this.state.total) {
            //         let page = this.state.page + 1; 
            //         this.loadMore(page);
            //     }
            //   }}
            keyExtractor={(item,index) => {
                return index.toString();
            }}
            renderItem={({ item }) => {
                return <TouchableOpacity style={[styles.card,{borderRadius:15,marginBottom:20}]} onPress={()=>this.props.navigation.navigate("Detailed",{item:item})}>
                    
                    <View style={{backgroundColor:'orange', borderTopLeftRadius: 15, borderTopRightRadius: 15,paddingVertical:5,alignItems:'center',marginBottom:20}}>
                        <Text style={{color:'#fff', fontFamily:'Adam-Bold', fontSize:18}}>Deals</Text>
                    </View>
                    <Image style={[styles.userImage,{marginBottom:20}]} source={{ uri: item?.images[0]?.media }}  resizeMode="cover"/>
                    <View style={styles.cardFooter}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.name,{textAlign:'center'}]}>{item.product_name}</Text>
                            <Text style={styles.position}>${item.price} / Piece</Text>
                            <Text style={styles.position}>Available Qu. {item.current_stock}</Text>
                            <Text style={styles.position}> Min. Order {item.min_purchase_qty}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }} />
        </View>
    )
} 

export default Deals