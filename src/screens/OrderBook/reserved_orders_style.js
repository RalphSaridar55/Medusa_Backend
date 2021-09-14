import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
        backgroundColor: "#ebf0f7"
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
    },

    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: "flex-start",
        color: "#3399ff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: "flex-start",
        color: "#6666ff",
        width: 200
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
});

export default styles;