import React,{Component} from "react";
import ListeNote from "../../../component/list-note";
import ChartPain from "../../../component/chart-pain";
import ListGrouChat from "../../../component/list-group-chat";
import { Sticky } from 'react-sticky';
import UsersDatas from "../../../service/users-datas";
import OrderedList from "../../../component/ordered-list";
import HistoricForm from "../../../component/historic-form";
import SuiviDatas from "../../../service/suivi-datas";
import dateFormat from 'dateformat';
import ServicesData from "../../../service/services-data";
import Alerts from "../../../component/Alert";
import AppChat from "../../public/src/chat";

class DetailSuivi extends Component{
    constructor(props) {
        super(props);
        this.state={
            treatment: {operationName:"",instructions:"", alt:"exercice"},
            user :{},
            etablissements:{},
            userInfosSupoplementaire:[],
            listEtablissementSuivis:[],
            patientsNote:"",
            lastQuestions:[],
            followUpHistory : [{date_response:'',responses:[]}],
            isLastAnswered :true,
            isChatDisplyed: false,
            classname:'chat-rep'
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        UsersDatas.getUserById(this.props.userSelected.id,(result,code)=>{
            const user = result[0]
            this.setState({
                user:{
                    id:this.props.userSelected.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    dateOfBirth:dateFormat(user.date_of_birth, "yyyy-mm-dd") ,
                    phone:user.phone,
                    email:user.email,
                    sexe:user.id_sexe
                },
                listEtablissementSuivis:[{},{},{},{},{}],
            })
            //console.log(this.props.userSelected)
            UsersDatas.getAllNotesByIdUser(this.props.userSelected.id,(result,code)=>{
                //console.log(result)
                if(code===200 && result.length !== 0){
                    this.setState({userInfosSupoplementaire:result})
                }
            })
        })
        //recuperer les information du suivisa
        setTimeout(()=>{
            SuiviDatas.getFollowUpInfo(this.props.userSelected.id, this.props.establishment.id ,(result1, code)=>{
                //console.log(result1)//
                if(code === 200){
                    this.setState({
                        suiviInfo: result1[0],
                    })

                    ServicesData.getServiceById(result1[0].id_service,  (result2, code)=>{
                        if(code === 200){
                            this.setState({
                                treatment:{operationName:result2[0].description ,instructions:result1[0].treatment_description},
                            })
                        }
                    })
                    setTimeout(()=>{
                        console.log('entred')
                        SuiviDatas.getDistinctResponseDate(result1[0].id, (result, code)=>{
                            console.log('distinct date',result)
                            if(code === 200 && result.length !== 0){
                                this.setState({
                                    isLastAnswered:false,
                                    followUpHistory:result
                                })
                                //this.waitingLoopQuestion(0, result, result1[0].id )
                            }
                        })
                    },100)

                }
            })

        },1000)

        //recuperer les question avec reponses tesrt
        this.setState({lastQuestions:[
                {question:'Quel est la temperature ?',response:37.5 },
                {question:'Avez-vous des complications ?',response:'NON' },
                {question:'Evaluation de douleur ?',is_emoticon : true, response:'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-sweat.svg.png'},
                {question:'Ou ressentez-vous la douleur ?',is_multiple_choice:true, response: ['bras','dos','jambe']},
            ]})
    }
    waitingLoopQuestion(i,array,idFollowUp){
        setTimeout(()=>{
            //recuperer la question selon
            //console.log('array', array)
            if(array[i] !== undefined){
                SuiviDatas.getResponsesFOllowUp(idFollowUp, array[i].date_response, (result, code)=>{
                    console.log('responses follow up ',result)
                    if(code === 200){
                        console.log(result)
                        //const date  = new Date(array[i].date_response)
                        this.setState({
                            followUpHistory:[...this.state.followUpHistory,
                                {
                                    date_response: dateFormat(array[i].date_response, "yyyy-mm-dd"),
                                    responses: result
                                }]
                        })
                        i++
                        if (i < array.length)  this.waitingLoopQuestion(i,array)
                    }
                })
            }
        },1000)
    }
    onChangeNote=(event)=>{
        this.setState({patientsNote:event.target.value})
    }

    onClickDeleteNote=(idNotes)=>()=>{
        console.log(idNotes)
        UsersDatas.deleteNoteById(idNotes,(result,code)=>{
            if(code===222){
                UsersDatas.getAllNotesByIdUser(this.props.userSelected.id,(result,code)=>{
                    if(code===200 && result.length!== 0){
                        this.setState({userInfosSupoplementaire:result})
                    }
                    if(code===404){
                        this.setState({userInfosSupoplementaire:[]})
                    }
                })
            }
        })
    }
    /***
     *
     * @param event
     */
    onClickAddNote=(event)=>{
        this.setState({patientsNote:""})
        if(this.state.patientsNote!==""){
            UsersDatas.addNoteByUserId(this.state.patientsNote,this.props.userSelected.id,(result,code)=>{
                if(code===201){
                    this.setState({userInfosSupoplementaire:[...this.state.userInfosSupoplementaire,result]})
                }
            })
        }
        //Ajouter une notekijn
    }
    onClickChat = ()=>{
        if(this.state.isChatDisplyed){
            this.setState({
                isChatDisplyed:false,
                classname:'chat-rep'
            })
        }else{
            this.setState({
                isChatDisplyed:true,
                classname:'succeess-chat-rep '
            })
        }
    }
    render() {
        //console.log('representant user',this.props.representantUser)
        //console.log('last Answere',this.state.isLastAnswered)
        console.log('history',this.state.followUpHistory)
        return (
            <div className={"detail-suivi"+this.props.isAdmin?"detailSuivisAdmin": "detailSuivisRep"}>
                <div className={'detail-suivi-content'}>
                    <h3>Medical File : {this.state.user.firstName} {this.state.user.lastName}</h3>
                    <div className={"suivipatientall"}>
                        <div className={"personalInfoPAtient"}>
                            <h4>Personal information </h4>
                            <div> <span>Date of Birth : </span>  {this.state.user.dateOfBirth}</div>
                            <div> <span> Phone Number : </span>  {this.state.user.phone}</div>
                            <div> <span>Email : </span> {this.state.user.email}</div>
                            <div> <span>Sexe : </span>  {(this.state.user.sexe===1)?"Male":"Female"}</div>
                        </div>
                        <div className={"supplemenaryInfoPatient"}>
                            <h4>Additional Information</h4>
                            <ListeNote  datas={Array.isArray( this.state.userInfosSupoplementaire)?this.state.userInfosSupoplementaire:[]} onClick={this.onClickDeleteNote} />
                            <div>
                                <textarea onChange={this.onChangeNote} value={this.state.patientsNote} minLength={25} placeholder={"Enter Additional Information"}/>
                                <button className={'btn btn-success btn-note'} onClick={this.onClickAddNote}>Add</button>
                            </div>
                        </div>
                    </div>

                    <div className={'btn-chat-representant'}>
                        <button type="button" className={"btn btn-success "+this.state.classname} onClick={this.onClickChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-chat" viewBox="0 0 16 16">
                                <path
                                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            </svg> See Chat
                        </button>
                    </div>

                    <div className={'followup-representant'}>
                        <h4>Follow-Up  : {this.state.treatment.operationName}</h4>
                        <div>
                            <h4>Treatment : {this.state.treatment.instructions} </h4>
                        </div>
                    </div>

                    <div className={'form-follow-up'}>
                        <div className={'last-form'}>
                            <h4>Last Follow-Up Answered</h4><span> {this.state.followUpHistory[0].responses !== 0 ? dateFormat(this.state.followUpHistory[0].date_response,'yyyy-mm-dd') : ''}</span>
                            {this.state.isLastAnswered || this.state.followUpHistory[0]=== undefined? (<Alerts type={'warning'} value={'Follow Up Not yet Answered'}/>) :<OrderedList is_history={false}  datas={this.state.followUpHistory[0]}/>}

                        </div>
                        <div className={'historyForm'}>
                            <h4>Follow-Up History</h4>
                            {this.state.isLastAnswered || this.state.followUpHistory[0] === undefined? (<Alerts type={'warning'} value={'No history'}/>) : <HistoricForm  list={this.state.followUpHistory} />}
                        </div>
                    </div>
                    <div className={'chart-div'}>
                        <h4 className={'chart-h4'}>Chart Pain</h4>
                        <ChartPain  datas ={this.state.followUpHistory} type={'is_emoticon'} max={10}/>
                    </div>
                    <div className={'chart-div'}>
                        <h4 className={'chart-h4'}>Chart Temperature</h4>
                        <ChartPain  datas ={this.state.followUpHistory} type={'is_range'} max={40}/>
                    </div>

                </div>
                {this.state.isChatDisplyed  ?<AppChat onClickChat={this.onClickChat} user={ this.props.representantUser}  followUp={this.state.suiviInfo} />:''}
            </div>
        );
    }
}
export default DetailSuivi