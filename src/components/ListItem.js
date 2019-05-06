import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';
import LockIcon from '@material-ui/icons/Lock';

import { WORD_STATE } from '../constants';

import styles from './ListItem.styles';

const HIDDEN_TEXT = 'word';

const getIcon = state => {
    switch (true) {
        case state === WORD_STATE.hidden:
            return <LockIcon color="disabled" />;
        case state === WORD_STATE.ok:
            return <CheckIcon color="primary" />;
        case state === WORD_STATE.fail:
            return <ArrowForwardIcon color="secondary" />;
        default:
            return <ArrowForwardIcon color="disabled" />;
    }
};

const LI = ({ value: { word, state, blinkClass }, index, classes, onReplaceClick }) => (
    <ListItem>
        <div
            className={cn({
                [classes.wrapper]: true,
                [`js-word-${index}`]: true,
                [classes.wrapperUpdate]: blinkClass,
            })}
        >
            <ListItemAvatar>{getIcon(state)}</ListItemAvatar>
            {state === WORD_STATE.hidden ? (
                <ListItemText classes={{ primary: classes.disabled }} primary={HIDDEN_TEXT} />
            ) : (
                <ListItemText
                    primary={
                        <Fragment>
                            <span className={classes.liNum}>{index + 1}. </span>
                            <b>{word}</b>
                            <IconButton className={classes.btnReload} onClick={onReplaceClick(index)}>
                                <CachedIcon fontSize="small" />
                            </IconButton>
                        </Fragment>
                    }
                />
            )}
        </div>
    </ListItem>
);

LI.PropTypes = {
    classes: PropTypes.object.isRequired,
    value: { word: PropTypes.string, state: PropTypes.string, blinkClass: PropTypes.bool },
    onReplaceClick: PropTypes.function,
};

export default withStyles(styles)(LI);
