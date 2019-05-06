import React from 'react';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import styles from './InputField.styles';

const InputField = ({ refCustom, value, placeholder, label, classCustom, onChange, disabled }) => (
    <TextField
        ref={refCustom}
        label={label}
        placeholder={placeholder}
        defaultValue={value}
        className={cn(styles.default, classCustom)}
        onChange={onChange}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
            shrink: true,
        }}
        disabled={disabled}
    />
);

export default withStyles(styles)(InputField);
