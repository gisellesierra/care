import React, {Component} from "react";
import Input from "../../../component/Input";
import List from "../../../component/list";
import InputCheckboxRadio from "../../../component/input-checkbox-radio";
import ListRepresentantComponent from "../../../component/list-representant-component";
import UsersDatas from "../../../service/users-datas";
import EtablissementsDatas from "../../../service/etablissements-datas";
import MessageErreur from "../../../component/message-erreur";
import dateFormat from 'dateformat';
import Alerts from "../../../component/Alert";

class ListRepresentant extends Component{
    constructor(props){
        super(props)

        this.state={
            representantList:[],
            idEstablishment:0,
            addedValues:{},
            msgvalidation:"",
            btnValue:"Add",
            selectedUser:{},
            repToBeModify:[],
            asideTitle:"Add a practitioner",
            allReps:[],
            noUser:"",
            isInactif:true,
            isActif:true,
            alertType:"",
            alertValue:"",


            // searchValues:""

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.adminUser.id,(result,code)=>{
            console.log('result',result)
            this.setState({idEstablishment:result.id_etablishment})
            if(code===200){
                UsersDatas.getRepresetantByEstablishment(result.id_etablishment,(result,code)=>{
                    console.log(result)
                    const repList = result.map(data=>({
                            id_user:data.id_user,
                            id:data.id,
                            lastName: data.lastName,
                            firstName: data.firstName,
                            email: data.email,
                            is_actif:data.is_actif,
                            phone:data.phone,
                            id_sexe:data.id_sexe,
                            poste:data.poste,
                            password:data.password,
                            date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),

                    }))
                    this.setState({representantList:repList,allReps:repList})

                 })
            }
        })
    }
    onChangeValueSearch=(event)=>{
        const inputValues = event.target.value
        const regex = new RegExp(inputValues,'g')
        if(inputValues===""){
            this.setState({representantList:this.state.allReps})
            this.setState({noUser:""})
        }
        const searchedPerson = this.state.representantList.filter((data)=>{
            if( data.firstName.match(regex) || data.lastName.match(regex)){
                return data
            }
        })
        if(searchedPerson.length!==0 && inputValues!==""){
            this.setState({representantList:searchedPerson})


        }else if(searchedPerson.length===0 && inputValues!==""){
            this.setState({representantList:[],noUser:"No User Found"})

        }
        console.log(this.state.representantList)
    }

    onClickListRep=(index)=>()=>{
        console.log("test")
        this.setState({btnValue:"Modify"})
        this.setState({msgvalidation: ""})
        this.setState({selectedUser:this.state.representantList[index]})
        this.setState({asideTitle:"Modify a or deactivate a practitioner"})

    }

    onClickDeactivate=(event)=>{
        const userToInactivate = this.state.selectedUser
        console.log(userToInactivate.id_user)
        UsersDatas.desactivateUser(userToInactivate.id_user,(result,code)=>{
            console.log(userToInactivate.id_user)
            if (code===222){
                UsersDatas.getRepresetantByEstablishment(this.state.idEstablishment,(result)=>{
                    console.log('result',result)
                    const repList = result.map(data=>({
                        id_user:data.id_user,
                        id:data.id,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        email: data.email,
                        is_actif:data.is_actif,
                        phone:data.phone,
                        id_sexe:data.id_sexe,
                        poste:data.poste,
                        password:data.password,
                        date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),

                    }))
                    this.setState({representantList:repList})

                })

            }
        })

    }

    onChangeInputToAdd=(event)=>{
            this.setState({ addedValues: Object.assign(this.state.addedValues,{[event.target.name]:event.target.value}),})

        console.log('selected users',this.state.selectedUser)
        this.setState({

            selectedUser: Object.assign(this.state.selectedUser,{[event.target.name]:event.target.value}),
        })
    }

    onClickClear=(event)=>{
       this.setState({btnValue:"Add"})
        this.setState({selectedUser:{
                firstName:"",
                lastName:"",
                phone:"",
                id_sexe:"",
                email:"",
                password:"",
                date_of_birth:"",
                poste:"",
            }})
        this.setState({asideTitle:"Add a practitioner"})
    }
    onClickIsActif=(event)=>{
        console.log(event.target.value)
    }
    onClickAddRep=(event)=>{

        if(event.target.textContent==="Add"){
            this.setState({asideTitle:"Add a practitioner"})
            const representant = this.state.addedValues
            if(representant.id_sexe===undefined ||representant.firstName===undefined || representant.lastName===undefined || representant.date_of_birth===undefined || representant.password===undefined  || representant.email===undefined || representant.phone===undefined || representant.poste===undefined) {
                this.setState({msgvalidation: "Please complete all fields"})
            }else {
                UsersDatas.addRepresetant(representant,this.state.idEstablishment,(result,code)=>{
                    console.log(result)
                    if(code===201){
                        UsersDatas.getRepresetantByEstablishment(this.state.idEstablishment,(result,code)=>{
                            console.log(result)
                            if(code===200){
                                const repList = result.map(data=>({
                                    id_user:data.id_user,
                                    id:data.id,
                                    lastName: data.lastName,
                                    firstName: data.firstName,
                                    email: data.email,
                                    is_actif:data.is_actif,
                                    phone:data.phone,
                                    id_sexe:data.id_sexe,
                                    poste:data.poste,
                                    password:data.password,
                                    date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),

                                }))
                                this.setState({representantList:repList,allReps:repList})
                                this.setState({selectedUser:{
                                        firstName:"",
                                        lastName:"",
                                        phone:"",
                                        id_sexe:"",
                                        email:"",
                                        password:"",
                                        date_of_birth:"",
                                        poste:"",
                                    }})
                            }

                        })

                    }
                    if(code===404){
                        this.setState({msgvalidation: "Email already registered"})
                    }
                })
            }
        }

        if(event.target.textContent==="Modify"){
            const repToBeModify = this.state.selectedUser
            console.log(repToBeModify)
             UsersDatas.modifyRepresetant(repToBeModify,(result,code)=>{
                    if(code===201){
                        console.log("modifie")
                        this.setState({btnValue:"Add"})
                        this.setState({selectedUser:{
                                firstName:"",
                                lastName:"",
                                phone:"",
                                id_sexe:"",
                                email:"",
                                password:"",
                                date_of_birth:"",
                                poste:"",
                            }})

                    }
            })
        }
    }

    onChangeIsActif=(event)=>{
        this.setState({isActif:!this.state.isActif})
        const checkedValueActif = event.target.checked

        if(checkedValueActif===true&&this.state.isInactif===false){
            UsersDatas.getActifRep(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({representantList:result})
                }
            })
        }else if (checkedValueActif===false&&this.state.isInactif===true){
            UsersDatas.getInactifRep(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({representantList:result})

                }
                if(code===404){
                    this.setState({alertType:"warning",alertValue:"No Users Inactif Found"})
                }
            })
        }else{
            console.log(this.state.allReps)
            UsersDatas.getRepresetantByEstablishment(this.state.idEstablishment,(result,code)=>{
                console.log(result)
                if(code===200){
                    const repList = result.map(data=>({
                        id_user:data.id_user,
                        id:data.id,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        email: data.email,
                        is_actif:data.is_actif,
                        phone:data.phone,
                        id_sexe:data.id_sexe,
                        poste:data.poste,
                        password:data.password,
                        date_of_birth: dateFormat(data.date_of_birth, "yyyy-mm-dd"),

                    }))
                    this.setState({representantList:repList,allReps:repList})

                }

            })
            this.setState({alertType:"",alertValue:""})
        }


    }
    onChangeIsInactif=(event)=>{
        this.setState({isInactif:!this.state.isInactif})
        const checkedValue = event.target.checked
        if(this.state.isActif===false&&checkedValue===true){
            UsersDatas.getInactifRep(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    this.setState({representantList:result})
                }
            })
        }else if(this.state.isActif===true&&checkedValue===false){
            UsersDatas.getActifRep(this.state.idEstablishment,(result,code)=>{
                if(code===200){
                    result.date_of_birth = dateFormat(result.date_of_birth,"yyyy-mm-dd")
                    console.log(result)
                    this.setState({representantList:result})
                }
            })
        }else{
            this.setState({representantList:this.state.allReps})
        }
    }

    render() {
         console.log(this.state.selectedUser)
        return(
            <div className={"contenueListPatientAdmin"}>
                <div className={"navbar navbar-light navbarPatientList "}>
                    <div>
                        <span>Sort by: </span>
                        <InputCheckboxRadio checked={this.state.isActif} text={"Actif"} name={"actif"} type={"checkbox"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"} value={"actif"} onChange={this.onChangeIsActif}/>
                        <InputCheckboxRadio checked={this.state.isInactif} text={"Inactif"} name={"inactif"} type={"checkbox"} classname={"form-check form-check-inline"} classnameinput={"form-check-input"} labelclass={"form-check-label"} value={"inactif"} onChange={this.onChangeIsInactif}/>
                    </div>
                    <Input type={"search"}  onChange={this.onChangeValueSearch} name={"search"} placeholder={"search"} classnameinput={"form-control mr-sm-2"} classname={"form-inline"}/>
                </div>
                <Alerts type={this.state.alertType} value={this.state.alertValue}/>
                <h1>{this.state.noUser}</h1>
                <div className={"listPatientAdmin"}>
                    <ListRepresentantComponent datas={this.state.representantList} onClick={this.onClickListRep}/>
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
                            <Input classnameinput={"w3-input"} value={this.state.selectedUser.poste} text={"Poste"} name={"poste"} type={"text"} onChange={this.onChangeInputToAdd}/>
                            <div className={"asidebutton"}>
                                <button className="w3-button w3-green w3-button w3-round" onClick={this.onClickAddRep}>{this.state.btnValue}</button>
                                <button className="w3-button w3-blue w3-button w3-round" onClick={this.onClickClear}>Clear</button>
                                <button className="w3-button w3-red w3-button w3-round" onClick={this.onClickDeactivate}>Deactivate</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        )
    }
}

export default ListRepresentant