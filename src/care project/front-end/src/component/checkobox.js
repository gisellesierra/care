import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckboxLabels = (props)=> {
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const [response, setResponse] = React.useState([])

    const handleChange = (event, value, label) =>{
        setState({ ...state, [event.target.name]: event.target.checked });
        if(event.target.checked){
            setResponse([...response, value])
            props.onCheckBox([...response, value],label)
        }else{
            const responses = response.filter(response=> response.id !==  value.id)
            setResponse([...responses])
            props.onCheckBox([...responses],label)
        }

    };
    //console.log(response)

    return (
        <FormGroup row>
            {props.tabChecBox.responses.map((value,index)=>{
                return(
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state[state.checkedB+index]}
                                onChange={event => handleChange(event, value, props.tabChecBox)}
                                name={"checkedB"+index}
                                color="primary"
                            />
                        }
                        label={value.response}
                    />
                )
            })
            }


        </FormGroup>
    );
}
export default CheckboxLabels