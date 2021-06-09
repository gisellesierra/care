import React, {Component} from "react";
import Input from "../../component/Input";
import Star from "../../assets/star.png";
import SliderPerso from "../../component/slider";
import StepperQuestion from "../../component/stepper-question";
import SuiviDatas from "../../service/suivi-datas";
import ServicesData from "../../service/services-data";
import Alerts from "../../component/Alert";
import UsersDatas from "../../service/users-datas";
import AppChat from "../public/src/chat";


class DetailSuiviPatient extends Component{
    constructor(props){
        super(props)

        this.state={
            treatment: {operationName:"",instructions:"", alt:"exercice"},
            establishment:{name:"Etablissement A", adress:"1234 rue Perrier", logo_url: Star, phone:"514 974 5812"},
            suiviInfo: {},
            isFollowUp:false,
            dayFollowUps:[],
            seeChat: false,
            isChatDisplyed: false,
            classname : 'succeess-chat'
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({
            establishment:this.props.establishment,
        })
        SuiviDatas.getFollowUpInfo(this.props.patientInfo.id, this.props.establishment.id, (result1 , code) =>{
            //suiviInfo
            console.log(result1)
            if(code === 200 ){
                ServicesData.getServiceById(result1[0].id_service,  (result2, code)=>{
                    console.log('service ',result2)
                    if(code === 200){
                        this.setState({
                            suiviInfo: result1[0],
                            treatment:{operationName:result2[0].description ,instructions:result1[0].treatment_description},

                        })
                    }
                })
                SuiviDatas.getFollowUpQuestionnaireOfTheDay(result1[0].id,(result3,code) =>{ //follow_up_questonnaire :table
                    if(code === 200){
                        console.log(result3)
                        console.log('taille ',result3.length)
                        this.waitingLoopQuestion(0,result3)
                    }
                })
            }
        })
    }
    waitingLoopQuestion(i,array){
        setTimeout(()=>{
            //recuperer la question selon id
            if(array[i] !== undefined){
                SuiviDatas.getQuestionById(array[i].id_question, (result4 ,code)=>{ //table question
                    if(code === 200){
                        //recuperer les reponse de chaque question
                        SuiviDatas.getResponsesByIdQuestion(array[i].id_question, (result5, code)=>{
                            if(code === 200){
                                this.setState({
                                    dayFollowUps:[...this.state.dayFollowUps, {
                                        id_question_follow_up: array[i].id,
                                        question:result4[0],
                                        responses:  result5
                                    }],
                                    isFollowUp:true,
                                })
                            }
                            i++
                            if (i < array.length)  this.waitingLoopQuestion(i,array)
                        })
                    }
                })
            }

        },100)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.suiviInfo){

        }
    }
     onClickChat = (event)=>{
        if(this.state.isChatDisplyed){
            if(!this.state.isFollowUp ){
                SuiviDatas.getFollowUpInfo(this.props.patientInfo.id, this.props.establishment.id, (result1 , code) =>{
                    //suiviInfo
                    console.log(result1)
                    if(code === 200 ){
                        ServicesData.getServiceById(result1[0].id_service,  (result2, code)=>{
                            console.log('service ',result2)
                            if(code === 200){
                                this.setState({
                                    suiviInfo: result1[0],
                                    treatment:{operationName:result2[0].description ,instructions:result1[0].treatment_description},

                                })
                            }
                        })
                        SuiviDatas.getFollowUpQuestionnaireOfTheDay(result1[0].id,(result3,code) =>{ //follow_up_questonnaire :table
                            if(code === 200){
                                console.log(result3)
                                console.log('taille ',result3.length)
                                this.waitingLoopQuestion(0,result3)
                            }
                        })
                    }
                })
            }
            this.setState({
                isChatDisplyed:false,
                classname:'succeess-chat'
            })

        }else{
            this.setState({
                isChatDisplyed:true,
                classname:'succeess-chat-red'
            })
        }

    }
    render() {
        console.log('suiviInfo ',this.state.suiviInfo)
        console.log(this.state.dayFollowUps)//last value
        return(
            <div className={"listPatientAdmin "}>
                <div className={"detailsuivis"}>
                    <div className={'etablissement-info'}>
                        <div>
                            <img src={this.state.establishment.logo_url} alt={'establishment logo'}/>
                        </div>
                        <div>
                            <h5> {this.state.establishment.name}</h5>
                            <div>Adresse {this.state.establishment.adress}</div>
                            <div>Phone Number: {this.state.establishment.phone}</div>
                            <div>Email: {this.state.establishment.email}</div>
                        </div>
                    </div>
                    <div className={"followUpInfo"}>
                        <div className={"followup"}>
                            <h4>Follow-Up </h4>
                            <div className={"patientsFollowUp"}>
                                <div>
                                    <h4>Type of operation</h4>
                                    <div>{this.state.treatment.operationName}</div>
                                    <h5>Treatment</h5>
                                    <div>{this.state.treatment.instructions}</div>
                                </div>
                                <button type="button" className={"btn btn-success "+this.state.classname} onClick={this.onClickChat}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-chat" viewBox="0 0 16 16">
                                        <path
                                            d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    </svg>{this.state.isChatDisplyed?'close chat':'see chat'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={'questionnaire'}>
                        <h5 className={'questionnaire-h'}>Follow-up of the day</h5>
                        {this.state.isFollowUp ? <StepperQuestion  followUps={this.state.dayFollowUps}/>:<Alerts value={'NO FOLLOW-UP FOR THIS DAY'} type={'info'}/>}
                    </div>
                </div>
                {this.state.isChatDisplyed && this.state.isFollowUp ?<AppChat class={'transition-chat'} onClickChat={this.onClickChat} user={ this.props.patientInfo}  followUp={this.state.suiviInfo} />:''}

            </div>

        )
    }
}

export default DetailSuiviPatient