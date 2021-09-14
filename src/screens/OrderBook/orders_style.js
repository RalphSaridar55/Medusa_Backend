import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        // backgroundColor: "#ffffff",

    },
    container: {
        paddingRight: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#ffffff",
        margin: 5,
        borderRadius: 10
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',

    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
    },
    time: {
        fontSize: 10,
        color: "#31C2AA"
    },
    status: {
        fontSize: 12,
        color: "#698EB7"
    }
});

export default styles;