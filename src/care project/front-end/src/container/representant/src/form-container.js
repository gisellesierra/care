import React,{Component} from "react";
import FormGenerator from "../../../component/form-generator";
import InputCheckboxRadio from "../../../component/input-checkbox-radio";
import Input from "../../../component/Input";
import ListExtraQuestions from "../../../component/list-extra-questions";
import ListInputMultipleChoices from "../../../component/list-input-multiple-choices";
import SuiviDatas from "../../../service/suivi-datas";
import CheckboxAddQuestion from "../../../component/checkbox-add-question";
import Alerts from "../../../component/Alert";
import DetailSuivi from "./detail-suivi";


class   FormContainer extends Component{
    constructor(props) {
        super(props);
        this.state= {
            inputNewQuestion: "",
            extraQuestion: [],
            arrayChoices:[1,2],
            basicQuestions:[],
            newExtraQuestion :{},
            addQuestionDisabled: true,
            formInputMultiChoiceValues:{},
            followUpQuestions:{
                id_suivi: this.props.suivis.id,
                extra_questions:[],
                id_basic_questions:[]
            },
            containerToRender:'FollowUp',
            error:false,
            establishment:{id: this.props.suivis.id_establishment},
            selectedUser:{id:this.props.suivis.idUser},
            isBasicQuestionExist:true
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.state.establishment,' ',this.state.selectedUser)
        SuiviDatas.getBasicQuestionByIdEstablishment((result,code)=>{
            if(code === 200 && Array.isArray(result)){
                this.setState({basicQuestions:result})
                console.log("code ",code)
                console.log("result ",result)
            }else{
                this.setState({isBasicQuestionExist:false})
            }

        })
    }

    onClickAddChoice=(event)=>{
        this.setState({arrayChoices:[...this.state.arrayChoices,1]})
        console.log(this.state.arrayChoices)

    }
    onClickAddQuestion=(event)=>{
        if(this.state.inputNewQuestion!==""||this.state.newExtraQuestion.question){
            const question = {
                question: {
                    "question":this.state.newExtraQuestion.question,
                    "is_boolean":this.state.newExtraQuestion.is_boolean ,
                    "is_multiple_choice": this.state.newExtraQuestion.is_multiple_choice,
                    "is_emoticon": this.state.newExtraQuestion.is_emoticon,
                    "is_range": this.state.newExtraQuestion.is_range,
                    "is_extra": true,
                    "id_establishment": this.state.newExtraQuestion.id_establishment
                },
                "responses": this.state.newExtraQuestion.responses,
                "amplitude_jour": 1
            }
            this.setState({extraQuestion:[...this.state.extraQuestion, question]})
            console.log(question)
        }
    }
    OnClickDeleteList=(index)=>()=>{
         this.state.extraQuestion.splice(index,1)
         this.setState({extraQuestion:this.state.extraQuestion})
    }
    onChangeInput=(event)=>{
        //console.log(this.state.newExtraQuestion)
        if(event.target.value.trim() !== ''){
            if(this.state.newExtraQuestion.responses !== undefined){
                this.setState({ addQuestionDisabled:false})
            }
        }else {
            this.setState({ addQuestionDisabled:true})
        }
        const newExtraQuestion = this.state.newExtraQuestion
        newExtraQuestion.question = event.target.value
        //console.log(event.target.value)
        this.setState({inputNewQuestion:event.target.value, newExtraQuestion:newExtraQuestion})
    }
    onClickConfirm = (event)=>{
        console.log(event)
        console.log(this.state.extraQuestion)
        this.setState({
            followUpQuestions:{
                id_suivi: this.props.suivis.id,
                extra_questions:this.state.extraQuestion,
                id_basic_questions:event
            }})
    }
    onClickSubmit = ()=>{
        const  questions = this.state.followUpQuestions
        questions.extra_questions = this.state.extraQuestion
        console.log(questions)
        SuiviDatas.addQuestion(questions, (result, code)=>{
            if(code === 201){
                console.log(code)
                //rediriger vers le container medical-follow-up
                this.setState({
                    containerToRender:'DetailSuivi',
                })
            }else{
                this.setState({error:true})
            }
        })
    }
    onChangeChoice = (event)=>{
        const newExtraQuestion = {
            question:this.state.inputNewQuestion,
            is_boolean: event.target.value === 'is_boolean',
            is_multiple_choice:  event.target.value === 'is_multiple_choice',
            is_emoticon:  event.target.value === 'is_emoticon',
            is_range:  event.target.value === 'is_range',
            is_extra: true,
            id_establishment: this.props.suivis.id_establishment,
        }
        //cas d'un booleen
        if(event.target.value === 'is_boolean'){
            newExtraQuestion.responses =  ['OUI','NON']
            this.setState({ addQuestionDisabled:false,newExtraQuestion:newExtraQuestion})
        }
        //cas d'un emoji
        if(event.target.value === 'is_emoticon'){
            newExtraQuestion.responses =  [ 2,5,7,10]
            this.setState({ addQuestionDisabled:false,newExtraQuestion:newExtraQuestion})
        }
        //cas d'un slider
        if(event.target.value === 'is_range'  ){
            newExtraQuestion.responses = [20,37]
            this.setState({ addQuestionDisabled:false,newExtraQuestion:newExtraQuestion})
        }
        //cas de choix multiple
        if(event.target.value === 'is_multiple_choice'){
            console.log(Object.keys(this.state.formInputMultiChoiceValues))
            if(Object.keys(this.state.formInputMultiChoiceValues).length >= 2){
                newExtraQuestion.responses = Object.values(this.state.formInputMultiChoiceValues)
                this.setState({ addQuestionDisabled:false,newExtraQuestion:newExtraQuestion})
            }else{
                this.setState({ addQuestionDisabled:true,newExtraQuestion:newExtraQuestion})
            }
        }
        if(this.state.inputNewQuestion.trim() === ''){
            this.setState({ addQuestionDisabled:true})
        }
       // console.log(newExtraQuestion)
    }
    //gerer le cas du range
    handleSlider = (value) => {
        //console.log(this.state.newExtraQuestion)
        if(this.state.newExtraQuestion.is_range ){
            const question = this.state.newExtraQuestion
            question.responses = value
            this.setState({newExtraQuestion:question})
        }
    }
    /**
     *
     * @param event
     */
    onChangeInputMultiChoice = (event)=>{
        if(event.target.value.trim() !== ''){
            this.setState({
                formInputMultiChoiceValues: Object.assign(this.state.formInputMultiChoiceValues,{[event.target.name]:event.target.value})
            })
        }else {
            const inputMutil = this.state.formInputMultiChoiceValues
            delete  inputMutil[event.target.name]
            this.setState({
                formInputMultiChoiceValues: inputMutil
            })
        }
        if(this.state.newExtraQuestion.is_multiple_choice){
            const newExtraQuestion = this.state.newExtraQuestion
            newExtraQuestion.responses = Object.values(this.state.formInputMultiChoiceValues)
            if(this.state.inputNewQuestion.trim() !== '' && Object.keys(this.state.formInputMultiChoiceValues).length>=2){
                this.setState({ addQuestionDisabled:false,newExtraQuestion:newExtraQuestion})
            }else{
                this.setState({ addQuestionDisabled:true,newExtraQuestion:newExtraQuestion})
            }
        }
    }
    /**
     *
     * @param event
     * @param index
     */
    onChangeInputExtraQuestion = (event, index) => {
        //console.log(event.target.value, index)
        if (event.target.value.trim()!==''){
            const extraAmplitudes = this.state.extraQuestion
            let extraTemp = []
            extraTemp = extraAmplitudes.map((extra, cuurrentIndex)=>{
                if(cuurrentIndex === index){
                    extra.amplitude_jour =  parseInt(event.target.value)
                }
                return extra
            })
            this.setState({
                extraQuestion: extraTemp
            })
        }
    }
    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        switch (this.state.containerToRender) {
            case 'FollowUp':
                console.log(this.state.extraQuestion)
                return (
                    <div className={"formQuestions"}>
                        <FormGenerator onChangeInputMultiChoice={this.onChangeInputMultiChoice} handleSlider={this.handleSlider} disabled = {this.state.addQuestionDisabled} onChangeChoice={this.onChangeChoice} values={this.state.arrayChoices} onclick={this.onClickAddQuestion} onChange={this.onChangeInput} inputValue={this.state.inputNewQuestion} onClickPlus={this.onClickAddChoice} />

                        {this.state.error?<Alerts type={'error'} value={"ERROR SERVER"}/>:''}
                        <div className={"basicQuestions"}>
                            <div>
                                <h1>Check questions for patient</h1>
                                {this.state.isBasicQuestionExist ? <CheckboxAddQuestion onCLickConfirm = {this.onClickConfirm} basicQuestions={this.state.basicQuestions}/>
                                :
                                 <Alerts type={'info'} value={'no pre-recorded basic questionnaire'}/>
                                }

                            </div>

                            <div className={"extraquestionscontainer"}>
                                <h1>Extra questions</h1>
                                <ListExtraQuestions onChangeInput={this.onChangeInputExtraQuestion} datas={this.state.extraQuestion} onClick={this.OnClickDeleteList}/>
                                <button className="w3-button w3-green w3-button w3-round confirm" onClick={this.onClickSubmit} >Confirm</button>
                            </div>
                        </div>
                        </div>
                );
            case 'DetailSuivi':
                return(<DetailSuivi establishment ={this.state.establishment} isAdmin={true} userSelected={this.state.selectedUser}/>)
        }
    }
}
export default FormContainer