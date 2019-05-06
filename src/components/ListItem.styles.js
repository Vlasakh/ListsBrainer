import grey from '@material-ui/core/colors/grey';

const greyColor = grey[400]; // #F44336

const styles = theme => ({
    disabled: {
        color: greyColor,
    },
    wrapper: {
        display: 'inherit',
    },
    wrapperUpdate: {
        'animation-name': 'anim-info-updated',
        'animation-duration': '1.5s',
    },
    '@keyframes anim-info-updated': {
        '0%': {
            boxShadow: 'none',
            backgroundColor: 'none',
        },
        '30%': {
            boxShadow: '0px 0px 10px #fcffbf',
            borderRadius: '5px',
            backgroundColor: '#fcffbf',
        },
        '100%': {
            boxShadow: 'none',
            backgroundColor: 'none',
        },
    },
    liNum: {
        color: 'lightgray',
    },
    btnReload: {
        margin: '-12px 0',
    },
});

export default styles;
