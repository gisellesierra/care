import Alert from "@material-ui/lab/Alert";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
const Alerts = ( {value,type}) => {
    const classes = useStyles();
    return (
        <div className={classes.root +' alerts'} >
            {type=== 'error'? <Alert severity="error">{value}</Alert>:''}
            {type==='info'?<Alert severity="info">{value}</Alert>:''}
            {type==='warning'?<Alert severity="warning">{value}</Alert>:''}
            {type==='success'?<Alert severity="success">{value}</Alert>:''}
        </div>
    );
}
export default Alerts