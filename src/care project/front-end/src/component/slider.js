import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

function valuetext(value) {
    return `${value}`;
}

 const SliderPerso = ({text,onChange,min,max})=> {
     const classes = useStyles();
     const a = max /3
     const marks = [
         {
             value: min,
             label: min,
         },
         {
             value: Math.floor((max-min)/3 + min),
             label: Math.floor((max-min)/3 + min),
         },
         {
             value: 37,
             label: '37',
         },
         {
             value: max,
             label: max,
         },
     ];
     return (
         <div className={classes.root}>
             <Typography id="discrete-slider-always" gutterBottom>
                 <h5 className={'sliderTemp'}>
                     {text}
                 </h5>
             </Typography>
             <Slider
                 min={min}
                 max= {max}
                 defaultValue={37}
                 getAriaValueText={valuetext}
                 aria-labelledby="discrete-slider-always"
                 step={0.1}
                 marks={marks}
                 valueLabelDisplay="on"
                 onChange={onChange}
             />
         </div>
     );
}
export default SliderPerso