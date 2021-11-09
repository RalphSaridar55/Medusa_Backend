import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#fff",
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
      fontSize: 21,
      color: "#6E91EC",
      fontWeight: "bold",
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'lightgray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    contentList: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 60,
        height: 60,
    },

    card: {

        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        flex: 1,
        alignSelf: "flex-start",
        color: "#000",
        fontWeight: 'bold'
    },
    total: {
        fontSize: 18,
        flex: 1,
        alignSelf: "flex-start",
        color: "#3399ff",
        margin: 10,
        fontWeight: 'bold'
    },
    totalcard: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    totalcount: {
        fontSize: 18,
        flex: 1,
        alignSelf: "flex-end",
        color: "#3399ff",
        margin: 10,
        fontWeight: 'bold'
    }
    ,
    count: {
        fontSize: 14,
        flex: 1,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        color: "#698EB7",
        width: 200
    },
    value: {
        marginTop: 5,
        marginBottom: 5
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
});

export default styles;