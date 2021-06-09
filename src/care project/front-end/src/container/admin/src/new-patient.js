import React, {Component} from "react";
import Input from "../../../component/Input";
import Select from "../../../component/select";
import InputReadOnly from "../../../component/inputReadOnly";

import UsersDatas from "../../../service/users-datas";
import MessageErreur from "../../../component/message-erreur";
import ServicesData from "../../../service/services-data";
import NewTreatmentRepDelete from "../../representant/src/new-treatment-rep-delete";
import NewFollowUp from "./new-follow-up";
import EtablissementsDatas from "../../../service/etablissements-datas";
import TextArea from "../../../component/textarea";
import FormContainer from "../../representant/src/form-container";
import DetailSuivi from "../../representant/src/detail-suivi";
import Alerts from "../../../component/Alert";



function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 99999)+  99999);
}

class NewPatient extends Component{
    constructor(props){
        super(props)

        this.state={
            patientValues:{},
            msgvalidation:"",
            servicesName:[],
            containerToRender:"newPatient",
            services:[],
            newSuivi:{},
            id_establishment:0,
            isAccessCode:true,

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const newValue =  getRandomInt(999999);
        this.setState({
            patientValues: Object.assign(this.state.patientValues,{access_code:newValue})
        })

        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result,code)=>{
            if(code===200){
                this.setState({id_establishment:result.id_etablishment})

                ServicesData.getServicesByIdEstablishment(result.id_etablishment,(resutl,code)=>{

                    const serviceName = resutl.map(name=>(name.description))
                    if(code===200){
                        this.setState({servicesName:serviceName,services:resutl})

                        this.setState({
                            patientValues: Object.assign(this.state.patientValues,{id_service:resutl[0].id})
                        })
                    }
                    console.log(this.state.patientValues)
                })
            }
        })

    }

    onChangeValueSelect=(event)=>{

        const idService = this.state.services.filter(service=>event.target.value===service.description)
        this.setState({
            patientValues: Object.assign(this.state.patientValues,{id_service:idService[0].id})
        })
        console.log(this.state.patientValues)
    }
    onChangeInput=(event)=>{
        this.setState({
            patientValues: Object.assign(this.state.patientValues,{[event.target.name]:event.target.value})
        })

        console.log(this.state.patientValues)

    }
    onCLickNext=(event)=>{
        const acessCodeEmail = ["email", "access_code","id_service","treatment_description"]
        console.log(this.state.patientValues)
        const fieldAccessCodeEMail = acessCodeEmail.find(field=> this.state.patientValues[field] === undefined || this.state.patientValues[field].toString().trim() === '' )
        if(fieldAccessCodeEMail!==undefined){
            this.setState({msgvalidation:"Please complete all fields"})
        }else{

            UsersDatas.getUserByEmail(this.state.patientValues.email,(resultEmail,code)=>{
                if(code===200){
                    this.setState({isAccessCode:false,msgvalidation:""})
                    EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result,code)=>{
                        console.log("idestab ",result)
                        if(code===200){
                            const suivisInfo=this.state.patientValues
                            suivisInfo.id_user = resultEmail[0].id
                            suivisInfo.id_establishment=result.id_etablishment
                            console.log(suivisInfo)
                            UsersDatas.addFollowUpExistingPatient( suivisInfo,(result,code)=>{
                                if(code===201){
                                    const suivipatient = JSON.parse(result)
                                    console.log("suivis: ",suivipatient)
                                    suivipatient.id_establishment =  suivisInfo.id_establishment
                                    this.setState({
                                        newSuivi:  suivipatient,containerToRender:"newQuestion"
                                    })

                                }else{
                                    this.setState({msgvalidation:"Erreur"})
                                }
                            })
                        }
                    })
                }else{
                    this.setState({isAccessCode:false,msgvalidation:""})
                }
            })
        }


    }
    onClickSubmit=(event)=>{
        const basicFormValues = ["id_sexe","firstName","lastName","date_of_birth","password","password2","phone"]
        const fieldSubscribe = basicFormValues.find(field=> this.state.patientValues[field] === undefined || this.state.patientValues[field].trim() === '' )
        if(fieldSubscribe!==undefined){
            this.setState({msgvalidation:"Please complete all fields"})
        }else{
            if(this.state.patientValues.password!==this.state.patientValues.password2){
                this.setState({msgvalidation:"Password not identical"})
            }else{
                EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result,code)=>{
                    console.log("idestab ",result)
                    if(code===200){
                        const suivisInfo=this.state.patientValues
                        suivisInfo.id_establishment=result.id_etablishment
                        console.log(suivisInfo)
                        UsersDatas.addUserNoAccessCode( suivisInfo,(result,code)=>{
                            if(code===201){
                                const suivipatient = JSON.parse(result)
                                console.log("suivis: ",suivipatient)
                                suivipatient.id_establishment =  suivisInfo.id_establishment
                                this.setState({
                                    newSuivi:  suivipatient
                                })
                                this.setState({containerToRender:"newQuestion"})
                            }else{
                                this.setState({msgvalidation:"Erreur"})
                            }
                        })
                    }
                })

            }
            console.log("submit")
        }
    }
    onClickBack=(event)=>{
        this.setState({isAccessCode:true})
    }
    onClickSkip=(event)=>{
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result,code)=>{
            console.log("idestab ",result)
            if(code===200){
                const suivisInfo=this.state.patientValues
                suivisInfo.id_establishment=result.id_etablishment
                console.log(suivisInfo)
                UsersDatas.addUserWithAccessCode( suivisInfo,(result,code)=>{
                    if(code===201){
                        const suivipatient = JSON.parse(result)
                        suivipatient.id_establishment =  suivisInfo.id_establishment
                        console.log("suivis patient: ",suivipatient)
                        this.setState({
                           // newSuivi:  Object.assign(this.state.newSuivi, {newSuivi: suivipatient})
                            newSuivi:  suivipatient
                        })
                        this.setState({containerToRender:"newQuestion"})
                    }else{
                        this.setState({msgvalidation:"Erreur"})
                    }
                })
            }
        })
    }

    /***
     *
     * @returns {JSX.Element}
     * affcher le coposant avec acces code
     */
    renderComponentAccessCode(){
        return(
            <div>
                <h1>Add a new follow-up</h1>
                <MessageErreur msg={this.state.msgvalidation}/>
                <div className={"mandatoryInfo"}>
                    <div className={"generatorcode"}>
                        <InputReadOnly classnameinput={"form-control"} text={"Access Code"} name={"access_code"} value={this.state.patientValues.access_code} onChange={this.onChangeInput} />
                        <Input classname={"form-group"} classnameinput={"form-control"} text={"Email :"} name={"email"} type={"email"} onChange={this.onChangeInput}/>
                    </div>
                    <div className={"newTreatmentPatient"}>
                        <div className={"operationtype"}>
                            <div>Services</div>
                            <Select array={this.state.servicesName} onChange={this.onChangeValueSelect}/>
                        </div>
                        <div className={"specific treatment"}>
                            <div>Treatment</div>
                            <TextArea name={"treatment_description"} onChange={this.onChangeInput} />
                        </div>

                        <button className="w3-button w3-green w3-button w3-round" onClick={this.onCLickNext}>Next</button>
                    </div>
                </div>

            </div>
        )
    }

    /***
     *
     * @returns {JSX.Element}
     * afficher le compnoent de suscribe
     */
    renderNewPatient(){
        return(
            <div>
                <div className={"adminaddindpatient"}>
                    <div className={"addingpatientmsg"}>
                        <h4 className={"h4subscribe"}>Need to subscribe a patient ?</h4>
                        <MessageErreur msg={this.state.msgvalidation}/>
                    </div>
                    <div className={"patientinfo"}>
                        <div>

                            <div>
                                <Input classnameinput={"w3-input"} text={"First Name :"} name={"firstName"} type={"text"} onChange={this.onChangeInput}/>
                                <Input classnameinput={"w3-input"} text={"Last Name"} name={"lastName"} type={"text"} onChange={this.onChangeInput}/>
                                <Input classnameinput={"w3-input"} text={"Phone Number"} name={"phone"} type={"text"} onChange={this.onChangeInput}/>
                                <span>Sexe: </span>
                                <Input text={"M"} name={"id_sexe"} type={"radio"} classname={"form-check form-check-inline"} value={1} onChange={this.onChangeInput}/>
                                <Input text={"F"} name={"id_sexe"} type={"radio"} classname={"form-check form-check-inline"} value={2} onChange={this.onChangeInput}/>

                            </div>
                        </div>

                        <div className={"dobApatient"}>
                            <Input text={"Date of birth:"} classnameinput={"w3-input"} name={"date_of_birth"} type={"date"} placeholder={"DD"} onChange={this.onChangeInput}/>
                            <Input  text={"Password"} type={"password"}  name={"password"} classnameinput={"w3-input"} onChange={this.onChangeInput} />
                            <Input  text={"Confirm Password"} type={"password"}  name={"password2"} classnameinput={"w3-input"} onChange={this.onChangeInput} />
                        </div>

                    </div>

                </div>
                <div className={"btnAddpatient"}>
                    <button className="w3-button w3-gray w3-button w3-round" onClick={this.onClickBack}>Back</button>
                    <button className="w3-button w3-blue w3-button w3-round" onClick={this.onClickSkip} >Skip</button>
                    <button className="w3-button w3-green w3-button w3-round" onClick={this.onClickSubmit} >Submit</button>
                </div>

            </div>
        )
    }

    /**
     * ]
     * @returns {JSX.Element}
     */
    renderContainer(){
        switch (this.state.containerToRender){
            case "newQuestion":
                return(<FormContainer onCLickSubmit ={this.onCLickSubmit} suivis={this.state.newSuivi}/>)
            case "newPatient":
                return(
                    <div>
                        <div className={"addPatient"}>
                            {this.state.isAccessCode?this.renderComponentAccessCode():this.renderNewPatient()}
                        </div>
                    </div>
                )

        }
    }
    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        return(
            <div>
                {this.renderContainer()}
            </div>
        )
    }
}

export default NewPatient