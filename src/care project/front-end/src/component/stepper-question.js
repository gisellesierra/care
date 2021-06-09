import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {number} from "prop-types";
import Input from "./Input";
import SliderPerso from "./slider";
import Alert from '@material-ui/lab/Alert';
import Alerts from "./Alert";
import SuiviDatas from "../service/suivi-datas";
import CheckboxLabels from "./checkobox";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps(listQuestion) {
    return [...listQuestion]
   // return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(label, index, onChangeInputBtn, onChangeRange , onCLickEmoticon,  onCheckBox,happy,sweat,desperate,sushi ) {

    if(label.question.is_boolean){
        return (
            <div className={'radio-btn-response'}>
                <Input  type={"radio"} classname={"form-check form-check-inline"} onChange={onChangeInputBtn(label, label.responses[0])} classnameinput={"form-check-input"} labelclass={"form-check-label"} text={"Yes"} name={"answer"}/>
                <Input  type={"radio"} classname={"form-check form-check-inline"} onChange={onChangeInputBtn(label, label.responses[1])} classnameinput={"form-check-input"} labelclass={"form-check-label"} text={"No"} name={"answer"}/>
            </div>
        );
    }else if (label.question.is_emoticon){
        return (
            <div className={"emojiform"}>
                <img className={happy} src={'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-happy.svg.png'}  alt={"pain emoji"} onClick={onCLickEmoticon('happy',label, label.responses[0])} />
                <img className={sweat} src={'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-sweat.svg.png'}  alt={"pain emoji"} onClick={onCLickEmoticon('sweat',label , label.responses[1])}/>
                <img className={desperate} src={'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-desperate.svg.png'}   alt={"pain emoji"} onClick={onCLickEmoticon('desperate',label, label.responses[2])}/>
                <img className={sushi} src={'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-sushi.svg.png'}   alt={"pain emoji"} onClick={onCLickEmoticon('sushi',label, label.responses[3])}/>
            </div>
        );
    }else if (label.question.is_range){
            return(
                <div className={'temp-slide'}>
                    <SliderPerso min={30} max={40} onChange={event => onChangeRange(label,event.target.textContent)}/>
                </div>
            )
    }else if(label.question.is_multiple_choice){
        return (
            <div className={'multiple-choice'}>
                {
                    <CheckboxLabels onCheckBox={onCheckBox} tabChecBox={label} />
                }
            </div>
        );
    } else {
        return <Alerts value={'Unkonown Question'} type={'error'}/> ;
    }
}

 const StepperQuestion=({followUps})=> {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [questionResponses, setQuestionResponses] = React.useState([])
    const questions = getSteps(followUps);
     const [happy, setHappy] = React.useState('');
     const [sweat, setSweat] = React.useState('');
     const [desperate, setDesperate] = React.useState('');
     const [sushi, setSushi] = React.useState('');
    const [errorSubmit, setErrorSubmit] = React.useState(false);
    const handleNext = () => {
        if(activeStep === questions.length - 1){
            //soumettre vers l'api
            const uniqueResponses = [...new Map(questionResponses.map(item => [item.id_question_follow_up, item])).values()]
            console.log(uniqueResponses)
            SuiviDatas.submitResponses(uniqueResponses,(result,code)=>{
                if(code !== 201 ){
                    setErrorSubmit(true)
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            })
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //modifier app.get('/response') pour le cas pour le cas d'un  range
    const onChangeInputBtn =  (label,value)=>()=>{
        setQuestionResponses(prevQuestionResponses => {
            return [...prevQuestionResponses,
                {
                    id_question_follow_up:label.id_question_follow_up,
                    id_question_response :value.id
                }
            ]}
        )
    }
     const onCheckBox  = (value,label)=>{
        // console.log(label)
         setQuestionResponses(prevQuestionResponses => {
             return [...prevQuestionResponses,
                 {
                     id_question_follow_up:label.id_question_follow_up,
                     responses :value
                 }
             ]}
         )
     }


     const onCLickEmoticon = (value, label, response ) =>()=>{
         const emoticons = ['happy','sweat', 'desperate', 'sushi' ]

         emoticons.forEach(emoticon =>{
             if(value === emoticon){
                 //enregistrer la question
                 setQuestionResponses(prevQuestionResponses => {
                     return [...prevQuestionResponses,
                         {
                             id_question_follow_up:label.id_question_follow_up,
                             id_question_response :response.id
                         }
                     ]}
                 )

                 switch (value){
                     case 'happy':
                         setHappy('checked')
                         break;
                     case 'sweat':
                         setSweat('checked')
                         break
                     case 'desperate':
                         setDesperate('checked')
                         break
                     case 'sushi':
                         setSushi('checked')
                 }

             }else{
                 switch (emoticon){
                     case 'happy':
                         setHappy('')
                         break;
                     case 'sweat':
                         setSweat('')
                         break
                     case 'desperate':
                         setDesperate('')
                         break
                     case 'sushi':
                         setSushi('')
                 }
             }
         })
     }
    const onChangeRange = (label,value)=>{
        setQuestionResponses(prevQuestionResponses => {
            return [...prevQuestionResponses,
                {
                    id_question_follow_up:label.id_question_follow_up,
                    rangeValue :value,
                    id_question: label.question.id
                }
            ]}
        )
        //setQuestionResponses(() =>  [...new Map(questionResponses.map(item => [item.id_question_follow_up, item])).values()])
     }
     //console.log(questionResponses)
     // const uniqueObjects = [...new Map(questionResponses.map(item => [item.id_question_follow_up, item])).values()]
     // console.log(uniqueObjects)
     console.log('questions',questions)
    return (
        <div className={classes.root + ' stepper-suivi'}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {questions.map((label, index) => (
                    <Step key={label.id_question_follow_up}>
                        <StepLabel>{label.question.question}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(label, index, onChangeInputBtn, onChangeRange, onCLickEmoticon,  onCheckBox , happy,sweat,desperate,sushi )}</Typography>
                            <div className={classes.actionsContainer}>
                                <div className={'stepp-button'}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === questions.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>{errorSubmit? <div><Alerts value={'Error Submit , try again ...'} type={'error'}/>
                    <Button onClick={handleReset} className={classes.button}>
                            Try Again
                    </Button></div> :
                        <Alerts value={'All Question completed - you\'re finished'} type={'success'}/>} </Typography>
                </Paper>
            )}
        </div>
    );
}

export default StepperQuestion