
import { StyleSheet, StatusBar } from 'react-native';
const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        borderRadius: 20
    },
    containerStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center'
    },
    dropDownPickerSellers: {
        marginVertical: 10,
        borderRadius:5,
        borderColor:'lightgray',
        backgroundColor:'#f6f6f6',
    },
    dropDownPickerCountry: {
        marginVertical: 10,
        borderRadius:5,
        borderColor:'lightgray',
        backgroundColor:'#f6f6f6',
        height:60
    },
    autocomplete:{
        backgroundColor:'#f6f6f6',
        height:50,
        borderRadius:10,
        paddingLeft:10,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 12,
        textAlign: "right"
    },
    imgContainer: {
        flex: 1
    },
    link: {
        color: "#31C2AA",
        textAlign: "center",
        marginTop: 5
    },
    loginBtn: {
        marginTop:40,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    radioBtn: {
        flexDirection: 'row', justifyContent: 'center'
    },
    spacerStyle: {
        marginBottom: 15,
    },
    safeContainerStyle: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    MultiSelectContainer:{
        marginVertical:20,
        height:130
    },
    countryPicker:{
        borderRadius:1,
        marginVertical:10
    }
})


export default styles;