import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

import { MODE } from '../constants';
import ListItem from './ListItem';
import InputField from './InputField';
import OptionDialog from './OptionDialog';
import debounceEvent from '../utils/debounceEvent';

import styles from './Layout.styles';

class Layout extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        storage: PropTypes.shape({
            wordsCount: PropTypes.number,
            wordsList: PropTypes.array,
            mode: PropTypes.string,
        }),
        actions: PropTypes.shape({
            setWordsCount: PropTypes.func,
            generateWords: PropTypes.func,
            setBaseWords: PropTypes.func,
            setGuessMode: PropTypes.func,
            setLearnMode: PropTypes.func,
            setWord: PropTypes.func,
            replaceWord: PropTypes.func,
        }),
    };

    optionsRef = {}; //React.createRef();

    // static defaultProps = {
    //     wordsCount: 10,
    // };

    handleWordsCountChange = debounceEvent(this.props.actions.setWordsCount, 300);

    handleWordInputChange = debounceEvent(this.props.actions.setWord, 500);

    handleOpenClick = () => this.optionsRef.open(this.props.storage.baseWordsList);

    render() {
        const {
            classes,
            storage: { wordsCount, wordsList = [], mode },
            actions: { setGuessMode, generateWords, setLearnMode, setBaseWords, replaceWord },
        } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={9}>
                        <InputField
                            label="words count"
                            placeholder="10"
                            value={wordsCount}
                            classCustom={classes.wordsCount}
                            onChange={this.handleWordsCountChange}
                        />
                        &nbsp; &nbsp; &nbsp;
                        <Button
                            variant="contained"
                            color="default"
                            className={cn(classes.btn01, classes.btnGenerate)}
                            onClick={generateWords}
                        >
                            generate
                        </Button>
                    </Grid>
                    <Grid item xs={3} className={classes.settingsCell}>
                        <Button
                            variant="contained"
                            color="default"
                            className={cn(classes.btn01, classes.btnGenerate)}
                            onClick={this.handleOpenClick}
                        >
                            <SettingsIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="title" className={classes.title}>
                            Words list
                        </Typography>
                        <div>
                            <List dense={false}>
                                {wordsList.map((item, index) => (
                                    <ListItem key={item} value={item} index={index} onReplaceClick={replaceWord} />
                                ))}
                            </List>
                        </div>
                    </Grid>
                    <div className={classes.bottomPanelSpacer} />

                    <div className={classes.wordInputWrapper}>
                        {mode === MODE.learn ? (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.btn02}
                                onClick={setGuessMode}
                            >
                                Start
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.btn01}
                                onClick={setLearnMode}
                            >
                                Surender
                            </Button>
                        )}
                        &nbsp; &nbsp; &nbsp;
                        {mode === MODE.guess && (
                            <InputField
                                label="input word"
                                placeholder="butter"
                                value={''}
                                onChange={this.handleWordInputChange}
                            />
                        )}
                    </div>
                </Grid>
                <OptionDialog forwardRef={this.optionsRef} setBaseWords={setBaseWords} />
            </div>
        );
    }
}

export default withStyles(styles)(Layout);
