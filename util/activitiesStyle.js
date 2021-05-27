import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainView: {
        margin: 5,
        flex: 1,
    },
    titleText: {
        color: "#48ADF1",
        fontSize: 10,
        fontWeight: 'bold'
    },
    valueText: {
        fontSize: 15
    },
    dayView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    dayText: {
        fontSize: 12,
        fontWeight: "700"
    },
    slotText: {
        fontSize: 15,
        paddingHorizontal: 5,
    },
    imageText: {
        flexDirection: 'row',
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