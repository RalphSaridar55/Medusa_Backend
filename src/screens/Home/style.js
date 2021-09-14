import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    topProductContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginBottom: 5
    },
    flatListSliderContainer:{
        marginLeft: 10,
        marginRight: 10
    }, 
    imageContainer:{
        marginTop: 10,
        marginBottom: 10 
    },
    image:{
        width: 400,
        height: 100 
    },
    topSellingContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginBottom: 5 
    },
    flatListSliderContainer2:{
        flex: 1,
        flexDirection: 'row',
        margin: 10 
    },
    card:{
        flex:1
    },
    card2:{
        flex: 1,
        marginLeft: 5,
        marginRight: 5 
    },
    headlineTitle:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginBottom: 5
    },
    headlineContainer:{
        flex: 1,
        flexDirection: 'row',
        margin: 10 
    },
    insideHeadline:{
        flex: 1,
        marginLeft: 5,
        marginRight: 5 
    },
    imageAdContainer:{
        marginTop: 10,
        marginBottom: 10 
    },
    topBrandTitle:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10, 
        marginBottom: 5
    },
    topBrandContainer:{
        flex: 1,
        flexDirection: 'row',
        margin: 10 
    },
    insideTopBrand:{ 
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    topTitle:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginBottom: 5 
    },
    topContainer:{
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    insideTopContainer:{
        flex: 1,
        marginLeft: 5,
        marginRight: 5 
    },
    Bcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    B_container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10
    },
    container: {
        backgroundColor: "#e9f3ff",
        flex: 1,
    },
    header: { height: 50, backgroundColor: "#698eb7" },
    Title: {
        fontSize: 18,
    },
    avatarbg: {
        backgroundColor: "#31c2aa",
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});

export default styles;
