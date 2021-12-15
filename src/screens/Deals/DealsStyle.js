import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 5,
        //backgroundColor: "#E9F3FF",
    },
    listContainer: {
        alignItems: 'center'
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardFooter:{
        paddingVertical:10
    },
    userImage: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontFamily:'Adam-Bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        //alignSelf: 'center',
        color: "#696969",
        fontFamily:'Inter-Black-Light'
    },
})