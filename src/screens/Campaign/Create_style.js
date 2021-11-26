import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('screen').width

export const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: "#6E91EC",
        fontWeight: 'bold',
        marginBottom: 5
    },
    inputView: {
        backgroundColor: "#fff",
        marginBottom: 10,
        flex: 1,
        height:50,
        borderRadius:5,
        paddingHorizontal:10,
        borderWidth:0.5,
        borderColor:'lightgray'
    },
    selectedDateContainerStyle: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#6E91EC",
    },
    selectedDateStyle: {
      fontWeight: "bold",
      color: "white",
    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth,
        paddingHorizontal: 20
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        marginVertical: 20,
        paddingVertical: 40,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    loginBtn: {
        flex: 1,
        paddingHorizontal: 5,
        //marginHorizontal: 20,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    loginBtnText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginVertical: 20
    },
    bannerTitle: {
        fontSize: 24
    },
    bannerInfo: {
        fontSize: 12,
        color: 'gray'
    },
    bannerPrice: {
        fontSize: 16,
        color: '#31C2AA'
    },
    modalBoxInputs: {
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 14,
        marginVertical: 5,
        borderColor: "#C4C4C4",
        color: "#C4C4C4",
        flex: 1,
    },
    modalInputs: {
        borderWidth: 0.5,
        color:'#31c2aa',
        borderColor: '#31c2aa',
        borderRadius: 10,
        width: screenWidth * 0.7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },
    pickerstyle: {
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 14,
        marginVertical: 5,
        borderColor: "#C4C4C4",
        color: "#C4C4C4"
    },
    docPicker: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: screenWidth * 0.87,
        borderColor: '#31c2aa',
        //color: '#31c2aa',
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
})