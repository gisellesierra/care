import React, {Component} from "react";
import DetailSuivi from "./detail-suivi";
import ListPatientAdmin from "../../admin/src/liste-patient";
import UsersDatas from "../../../service/users-datas";
import ServicesData from "../../../service/services-data";
import ListPatientComponent from "../../../component/list-patient-component";
import AppChat from "../../public/src/chat";
import ListGrouChat from "../../../component/list-group-chat";
import EtablissementsDatas from "../../../service/etablissements-datas";


class ListPatientRepresentant extends Component{
    constructor(props){
        super(props)

        this.state= {
            patientsList: [],
            listSUivis: [{}, {}, {}, {}, {}, {}],
            containerToRender: "patientList",
            userSelected: {},
            idEstablishment:0,
            allpatients:[],
            establishment:{},
            noUser:""
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0)
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result,code)=>{
            if(code===200){
                this.setState({idEstablishment: result.id_etablishment,establishment:{id:result.id_etablishment}})
                UsersDatas.getPatientActifMedicalFollowUpByIdEstablishment(result.id_etablishment,(result,code)=>{
                    console.log(result)
                    if(code===200 && Array.isArray(result) ){
                        const patientList = result.map(data=>({
                            id:data.id,
                            lastName: data.lastName,
                            firstName: data.firstName,
                            email: data.email,
                            is_actif:data.is_actif,
                            phone:data.phone,
                            id_sexe:data.id_sexe,
                            poste:data.poste,
                            password:data.password,
                            date_of_birth: data.date_of_birth
                        }))
                        this.setState({patientsList:patientList,allpatients:patientList})
                    }
                })
            }
        })
    }
    onClickPatient=(user)=>()=>{
        this.setState({containerToRender:'detailsSuivis',userSelected:user})
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
        console.log(inputValues)
    }
    renderContainer(){
         switch (this.state.containerToRender){
             case "patientList":
                 return<ListPatientComponent onChange={this.onChangeValueSearch} txt={this.state.noUser} onClickPatient={this.onClickPatient} patientlist={this.state.patientsList} representantUser={this.props.representantUser} />
             case "detailsSuivis":
                 return(<DetailSuivi representantUser={this.props.representantUser} establishment={this.state.establishment} userSelected={this.state.userSelected}/>)
         }

    }
    onClickChat = infoChat => () =>{
        console.log(infoChat)
        this.setState({containerChatToRender : "CHAT"})
    }
    render() {
        console.log(this.state.userSelected)
        return(
            <div className={''}>
                {this.renderContainer()}
            </div>
        )
    }
}

export default ListPatientRepresentant