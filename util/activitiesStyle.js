import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainView: {
        margin: 5,
        flex: 1,
    },
    titleText: {
        color: "blue",
        fontSize: 16,
        fontWeight: 'bold'
    },
    valueText: {
        fontSize: 18
    },
    dayView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    dayText: {
        fontSize: 18,
        fontWeight: "700"
    },
    slotText: {
        fontSize: 18,
        paddingHorizontal: 5,
    },
    imageText: {
        position: 'absolute',
        padding: 10
    },
    ratingView: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default styles;