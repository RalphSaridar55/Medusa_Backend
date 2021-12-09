import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: "#e9f3ff",
        flex: 1,
    },
    cardContainer:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'lightgray',
        marginHorizontal:20,
        marginVertical: 20,
        padding:20,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    totalSalesContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:10,
    },
    totalLabel:{
        fontSize:20,
        fontFamily:'Adam-Bold',
    },
    totalValue:{
        fontSize:20,
        fontFamily:'Adam-Bold',
        color:'#31C2AA',
    },
    totalGraphContainer:{
        backgroundColor:'red',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    weekSalesContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    weekValue:{
        color:'#31C2AA',
        fontFamily:'Adam-Bold'
    },
    totalOrders:{
        fontSize:26,
        color:'#31C2AA',
    },
    totalCustomers:{
        fontSize:26,
        color:'#31C2AA',
        fontFamily:'Adam-Bold'
    },
    ordersLabel:{
        fontSize:12,
        fontFamily:'Adam-Bold'
    },
    customersLabel:{
        fontSize:12
    },
    recentOrdersData:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'lightgray',
        marginBottom:5
    },
    roLabel:{
        color:'#6893B9',
        fontFamily:'Adam-Bold'
    },
    roValue:{
        color:'#6893B9',
        fontFamily:'Adam-Bold'
    },
    topProductsContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
    },
    productImageContainer:{
    },
    productImage:{
        width:150,
        height:150,
    }
})