const styles = theme => ({
    root: {
        padding: '10px',
        flexGrow: 1,
        maxWidth: 752,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    btn01: {
        marginTop: `26px`,
    },
    btn02: {
        margin: `26px 0 20px`,
    },
    btnGenerate: {
        marginLeft: `15px`,
    },
    settingsCell: {
        textAlign: `right`,
    },
    wordsCount: {
        width: `100px`,
    },
    bottomPanelSpacer: {
        width: '100%',
        height: `84px`,
    },
    wordInputWrapper: {
        position: 'fixed',
        bottom: '0',
        margin: '10px 0',
        padding: '0 20px',
        width: '100%',
        border: '1px solid blue',
        borderWidth: '1px 0',
        background: '#fff',
    },
});

export default styles;
