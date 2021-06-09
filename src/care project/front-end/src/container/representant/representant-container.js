import React from 'react'
import Header from "../../component/header";
import Footer from "../../component/footer";
import NewPatient from "../admin/src/new-patient";
import ListPatientRepresentant from "./src/list-patient-representant";
import logoCare from "../../assets/star.png";
import logoEtabissement from "../../assets/iconnue_image.png";
import {StickyContainer} from "react-sticky";
import EtablissementsDatas from "../../service/etablissements-datas";
import UsersDatas from "../../service/users-datas";

class RepresentantContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            linksRepresentant:[],
            containerToRender:"PATIENT LIST",
            establishment:{}
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({linksRepresentant: ['PATIENT LIST','NEW FOLLOW-UP','PROFILE']})
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.representantUser.id,(result1,code)=>{
            if(code===200){
                EtablissementsDatas.getAllPartners((result2,code)=>{
                    const establishment = result2.filter(estab=>estab.id===result1.id_etablishment)
                     this.setState({establishment: establishment[0]})
                })
            }
        })
    }
    onClickNav = (linkValue)=>()=>{
        return (this.setState({containerToRender:linkValue}))
    }
    onClickChat = infoChat => () =>{
        console.log(infoChat)
        this.setState({containerChatToRender : "CHAT"})
    }
    renderContainer(){
        switch (this.state.containerToRender){
            case "PATIENT LIST":
                return(<ListPatientRepresentant onClickChat={this.onClickChat} representantUser={this.props.representantUser}/>)
            case "NEW FOLLOW-UP":
                return(<NewPatient onClickChat={this.onClickChat} representantUser={this.props.representantUser}/>)
            case "PROFILE":
                return(<div/>)
        }
    }
    render() {
        return(
            <div>
                <StickyContainer>
                    <Header establishment={this.state.establishment} classname={"publicHeader headerAdmin publicHeader"} connectedUser={this.props.representantUser}  onClickLogout={this.props.onClickLogout} careLogo={logoCare} src={logoEtabissement} title={"Etablissement"}  liensNav={this.state.linksRepresentant} onClickNav={this.onClickNav} />
                    {this.renderContainer()}
                    <Footer/>
                </StickyContainer>
            </div>
        )
    }
}
export default RepresentantContainer