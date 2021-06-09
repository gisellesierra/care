import React, {Component} from "react";
import DetailSuivi from "../../representant/src/detail-suivi";
import ListPatientComponent from "../../../component/list-patient-component";
import UsersDatas from "../../../service/users-datas";
import EtablissementsDatas from "../../../service/etablissements-datas";
import MessageErreur from "../../../component/message-erreur";
import Input from "../../../component/Input";
import InputCheckboxRadio from "../../../component/input-checkbox-radio";
import ListRepresentantComponent from "../../../component/list-representant-component";
import dateFormat from "dateformat";

class ListPatientAdmin extends Component{
    constructor(props){
        super(props)

        this.state={
            patientsList:[],
            listSUivis: [{},{},{},{},{},{}],
            selectedUser:{},
            idEstablishment:0,
            addedValues:{},
            containerToRender:"listPatientAdmin",
            asideTitle:"Info Patient",
            isInactif:true,
            isActif:true,
            allpatients:[],
            noUser:""

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.adminUser.id,(result,code)=>{
            console.log(result)
            this.setState({idEstablishment:result.id_etablishment})
            UsersDatas.getPatientByEstablishment(result.id_etablishment,(result,code)=>{
                const patientList = result.map(data=>({
                    id:data.id_user,
                    lastName: data.lastName,
                    firstName: data.firstName,
                    email: data.email,
                    is_actif:data.is_actif,
                    phone:data.phone,
                    id_sexe:data.id_sexe,
                    password:data.password,
                    date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),
                }))
                this.setState({patientsList:patientList,allpatients:patientList})

            })
        })
    }

    onChangeValueSearch=(event)=>{
        const inputValues = event.target.value
        const regex = new RegExp(inputValues,'g')
        if(inputValues===""){
            this.setState({patientsList:this.state.allpatients})
            this.setState({noUser:""})
        }
        const searchedPerson = this.state.patientsList.filter((data)=>{
            if(data.firstName!==null && data.lastName!==null){
                if( data.firstName.match(regex) || data.lastName.match(regex)){
                    return data
                }
            }

        })
        if(searchedPerson.length!==0 && inputValues!==""){
            this.setState({patientsList:searchedPerson})


        }else if(searchedPerson.length===0 && inputValues!==""){
            this.setState({patientsList:[],noUser:"No User Found"})

        }
        console.log(searchedPerson)
    }

    onClickPatient=(index)=>()=>{
        this.setState({selectedUser:this.state.patientsList[index]})
        this.setState({asideTitle: "Modify or deactivate patient"})

    }
    onChangeInputToAdd=(event)=>{
        this.setState({
            addedValues: Object.assign(this.state.addedValues,{[event.target.name]:event.target.value})
        })
        this.setState({
            selectedUser: Object.assign(this.state.selectedUser,{[event.target.name]:event.target.value})
        })
    }

    onClickDeactivatePatient=(event)=>{
        const userToInactivate= this.state.selectedUser
        UsersDatas.desactivateUser(userToInactivate.id,(result,code)=>{
            console.log(result)
            if (code===222){
                UsersDatas.getPatientByEstablishment(this.state.idEstablishment,(result)=>{
                    console.log('result',result)
                    const newPatientList = result.map(data=>({
                        id:data.id_user,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        email: data.email,
                        is_actif:data.is_actif,
                        phone:data.phone,
                        id_sexe:data.id_sexe,
                        password:data.password,
                        date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),

                    }))
                    this.setState({patientsList:newPatientList})

                })

            }
        })
    }
    onClickClear=(event)=>{
        this.setState({selectedUser:{
                firstName:"",
                lastName:"",
                phone:"",
                id_sexe:"",
                email:"",
                password:"",
                date_of_birth:"",

            }})
    }
    onClickFollowUp=(event)=>{
       this.setState({containerToRender:"detailsSuivis"})
    }
     onClickModifyPatient=(event)=>{
         const patientToBeModify = this.state.selectedUser
         console.log(patientToBeModify)
         UsersDatas.modifyPatient(patientToBeModify,(result,code)=>{
             console.log(patientToBeModify)
             if(code===201){
                 console.log("modifie")
                 this.setState({selectedUser:{
                         firstName:"",
                         lastName:"",
                         phone:"",
                         id_sexe:"",
                         email:"",
                         password:"",
                         date_of_birth:"",

                     }})
             }
             console.log(this.state.selectedUser.id_sexe)
         })
    }
    onChangeIsActif=(event)=>{
        this.setState({isActif:!this.state.isActif})
        const checkedValue = event.target.checked

        if(checkedValue===true&&this.state.isInactif===false){
            UsersDatas.getActifUser(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({patientsList:result})
                }
            })
        }else if (checkedValue===false&&this.state.isInactif===true){
            UsersDatas.getInactifUser(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({patientsList:result})
                }
            })
        }else{
            this.setState({patientsList:this.state.allpatients})
        }


    }
    onChangeIsInactif=(event)=>{
        this.setState({isInactif:!this.state.isInactif})
        const checkedValue = event.target.checked
        if(this.state.isActif===false&&checkedValue===true){
            UsersDatas.getInactifUser(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({patientsList:result})
                }
            })
        }else if(this.state.isActif===true&&checkedValue===false){
            UsersDatas.getActifUser(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({patientsList:result})
                }
            })
        }else{
            this.setState({patientsList:this.state.allpatients})
        }
    }
    renderContainer(){
        console.log("Inactif: ",this.state.isInactif)
        console.log("Actif: ",this.state.isActif)
        switch (this.state.containerToRender){
            case "listPatientAdmin":
                return <div className={"contenueListPatientAdmin"}>
                    <div className={"navbar navbar-light navbarPatientList "}>
                        <div>
                            <span>Sort by: </span>
                            <InputCheckboxRadio checked={this.state.isActif} text={"Actif"} name={"actif"} type={"checkbox"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"} value={"actif"} onChange={this.onChangeIsActif}/>
                            <InputCheckboxRadio checked={this.state.isInactif} text={"Inactif"} name={"inactif"} type={"checkbox"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"} value={"inactif"} onChange={this.onChangeIsInactif}/>
                        </div>
                        <Input type={"search"} onChange={this.onChangeValueSearch} name={"search"} placeholder={"search"} classnameinput={"form-control mr-sm-2"} classname={"form-inline"}/>
                    </div>
                    <h1>{this.state.noUser}</h1>
                <div className={"listPatientAdmin"}>
                <ListRepresentantComponent datas={this.state.patientsList} onClick={this.onClickPatient}/>

                <aside>
                    <h5>{this.state.asideTitle}</h5>
                    <MessageErreur msg={this.state.msgvalidation}/>
                    <div className={"w3-container"}>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.firstName!==null)?this.state.selectedUser.firstName:""} text={"First Name"} name={"firstName"} type={"text"} onChange={this.onChangeInputToAdd}/>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.lastName!==null)?this.state.selectedUser.lastName:""} text={"Last Name"} name={"lastName"} type={"text"} onChange={this.onChangeInputToAdd}/>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.date_of_birth!==null)?this.state.selectedUser.date_of_birth:""}  text={"Date of birth"} name={"date_of_birth"} type={"date"} onChange={this.onChangeInputToAdd}/>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.phone !==null)?this.state.selectedUser.phone:""} text={"Phone Number"} name={"phone"} type={"text"} onChange={this.onChangeInputToAdd}/>
                        <div>Sexe:
                            <InputCheckboxRadio text={"M"}  checked={this.state.selectedUser.id_sexe=="1"}   value={"1"}  name={"id_sexe"} type={"radio"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"}  onChange={this.onChangeInputToAdd}/>
                            <InputCheckboxRadio text={"F"} checked={this.state.selectedUser.id_sexe=="2"}   value={"2"} name={"id_sexe"} type={"radio"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"}  onChange={this.onChangeInputToAdd}/>
                        </div>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.email!==null)?this.state.selectedUser.email:""} text={"Email"} name={"email"} type={"text"} onChange={this.onChangeInputToAdd}/>
                        <Input classnameinput={"w3-input"} value={(this.state.selectedUser.password!==null)?this.state.selectedUser.password:""} text={"Password"} name={"password"} type={"password"} onChange={this.onChangeInputToAdd}/>


                        <div className={"asidebutton"}>
                            <button className="w3-button w3-orange w3-button w3-round" onClick={this.onClickModifyPatient}>Modifier</button>
                            <button className="w3-button w3-blue w3-button w3-round" onClick={this.onClickFollowUp}>Follow-Up</button>
                            <button className="w3-button w3-green w3-button w3-round " onClick={this.onClickClear}>Clear</button>
                            <button className="w3-button w3-red w3-button w3-round" onClick={this.onClickDeactivatePatient}>Deactivate</button>
                        </div>
                    </div>
                </aside>
            </div>
            </div>
            case "detailsSuivis":
                return(<DetailSuivi representantUser={this.props.adminUser} establishment ={this.props.establishment} isAdmin={true} userSelected={this.state.selectedUser}/>)
        }

    }
    render() {
        return(

            <div>
                {this.renderContainer()}
            </div>


        )
    }
}

export default ListPatientAdmin