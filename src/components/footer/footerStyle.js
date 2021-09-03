import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: '7%',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    },
    rowView: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    textStyle: {
        fontWeight: '700'
    }
});