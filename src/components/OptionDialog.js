import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import styles from './OptionDialog.styles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class OptionDialog extends React.Component {
    static PropTypes = {
        classes: PropTypes.object.isRequired,
        setBaseWords: PropTypes.func,
    };

    state = {
        open: false,
        wordsOptText: '',
        wordsListLen: 0,
    };

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);

        props.forwardRef.open = this.open;
    }

    /**
     * @public
     */
    open(wordsList) {
        let wordsOptText = wordsList.join('\n');
        console.log('wordsOptText,', wordsOptText, wordsList);
        this.setState({ open: true, wordsOptText, wordsListLen: wordsList.length });
    }

    handleCloseClick = () => {
        this.setState({ open: false });
    };

    handleSaveClick = () => {
        this.props.setBaseWords(this.state.wordsOptText);
        this.setState({ open: false });
    };

    listLenSet = debounce(list => {
        this.setState({ wordsListLen: list.trim().split('\n').length });
    }, 500);

    handleChange = e => {
        let wordsOptText = e.target.value;
        this.setState({ wordsOptText });
        this.listLenSet(wordsOptText);
    };

    render() {
        const { classes } = this.props;
        const { wordsOptText, wordsListLen } = this.state;

        return (
            <Dialog fullScreen open={this.state.open} onClose={this.handleCloseClick} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleCloseClick} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            Settings
                        </Typography>
                        <Button color="inherit" onClick={this.handleSaveClick}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <TextField
                    className={classes.inputWords}
                    label={`Words list (${wordsListLen})`}
                    multiline
                    value={wordsOptText}
                    // rows={14}
                    onChange={this.handleChange}
                    // className={classes.textField}
                    margin="normal"
                    // helperText="hello"
                    variant="outlined"
                />
            </Dialog>
        );
    }
}

export default withStyles(styles)(OptionDialog);
