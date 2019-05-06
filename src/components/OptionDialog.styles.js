const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    inputWords: {
        padding: '10px',
        '& [class^=MuiPrivateTextarea-textarea]': {
            height: 'calc(100vh - 150px) !important',
        },
    },
};

export default styles;
