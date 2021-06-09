import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderedList from "./ordered-list";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

 const HistoricForm = ({list})=> {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // console.log('list',list)
    return (
        <div className={classes.root}>
            {list.map((data,index) =>{
                if(Array.isArray(data.responses)===false){
                    return ('')
                }else{
                    return(
                        <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{dateFormat(data.date_response,'yyyy-mm-dd')}</Typography>
                                <Typography className={classes.secondaryHeading}>Answered</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <OrderedList datas={data}/>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                }
                })}
        </div>
    );
}
export default HistoricForm