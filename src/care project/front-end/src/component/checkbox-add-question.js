import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from "./Input";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckboxAddQuestion = (props)=> {
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const [amplitudes, setAmplitudes] =  React.useState({})
    const [response, setResponse] = React.useState([])

    const handleChange = (event, value) =>{
        setState({ ...state, [event.target.name]: event.target.checked });
        if(event.target.checked){
            // A mettre a jour pour extra question
            const basic = {id_question:value.id, amplitude_jour: amplitudes[event.target.name] !== undefined ?amplitudes[event.target.name] :1}
            setResponse([...response, basic])
            props.onCLickConfirm([...response, basic])
        }else{
            const responses = response.filter(response=> response.id_question !==  value.id)
            setResponse([...responses])
            props.onCLickConfirm([...responses])
        }

    };
    //console.log(response)
    const handleChangeAmplitude = (event, value)=>{

        setAmplitudes({...amplitudes, [event.target.name]:  parseInt(event.target.value)})
        //mettre a  jour la question checked
        response.forEach( (res,index) => {
            if (value.id === res.id_question){
                const responses = response.filter(response=> response.id_question !==  value.id)
                responses.push({id_question: value.id, amplitude_jour: event.target.value.trim() !== ''? parseInt(event.target.value):1})
                setResponse([...responses])
                props.onCLickConfirm([...responses])

            }
        })

    }
    // console.log('responses',response)
    return (
        <div >
            {props.basicQuestions.map((value,index)=>{
                return(
                    <div className={"inputForm"}>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state[state.checkedB+index]}
                                    onChange={event => handleChange(event, value)}
                                    name={"checkedB"+index}
                                    color="primary"
                                />

                            }
                            label={value.question}
                        />
                        <div className={"frequency"}>
                            <Input type={"number"} name={"checkedB"+index} text={"Every"} onChange={event => handleChangeAmplitude(event, value)}  classnameinput={"typeNumberInput"}   min={1} max={7}  />
                            <span> days</span>
                        </div>
                    </div>


                )
            })
            }


        </div>
    );
}
export default CheckboxAddQuestion