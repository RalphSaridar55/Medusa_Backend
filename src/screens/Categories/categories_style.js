import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F3FF'
    },
    list: {
        paddingHorizontal: 5,
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: "#DCDCDC",
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#31c2aa",
        fontWeight: 'bold'
    }
});

export default styles;