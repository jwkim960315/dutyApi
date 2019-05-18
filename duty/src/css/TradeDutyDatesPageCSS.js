export default theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    message: {
        marginTop: 50,
        width: 450,
        height: 150
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 70
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
    },
    arrow: {
        height: 56,
        display: 'flex',
        alignItems: 'center'
    },
    deletes: {
        height: 56,
        color: "red"
    },
    erasers: {
        height: 56,
        color: "blue"
    },
    addButton: {
        height: 56
    }
})