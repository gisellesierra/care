import React, {Component} from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Accueil from "../public/src/accueil";
import OurServices from "./src/our-services";
import ListRepresentant from "./src/list-representant";
import logoEtabissement from "../../assets/iconnue_image.png"
import logoCare from "../../assets/star.png"
import ListPatientAdmin from "./src/liste-patient";
import {StickyContainer} from "react-sticky";
import NewFollowUp from "./src/new-follow-up";
import EtablissementsDatas from "../../service/etablissements-datas";

class AdminContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            linksSuperAdmin:[],
            containerToRender:"HOME"
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({linksSuperAdmin: ['HOME','OUR SERVICES','PRACTITIONER LIST','PATIENT LIST', 'NEW FOLLOW-UP']})
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.adminUser.id,(result1,code)=>{
            if(code===200){
                EtablissementsDatas.getAllPartners((result2,code)=>{
                    const establishment = result2.filter(estab=>estab.id===result1.id_etablishment)
                    this.setState({establishment: establishment[0]})
                })
            }
        })
    }
    onClickNavAdmin = (linkValue)=>()=>{
        return (this.setState({containerToRender:linkValue}))
    }
    onClickChat = infoChat => () =>{
        console.log(infoChat)
        this.setState({containerChatToRender : "CHAT"})
    }
    renderContainer(){
        switch (this.state.containerToRender){
            case "HOME":
                return (<Accueil adminUser={this.props.adminUser}/>)
            case "OUR SERVICES":
                return (<OurServices adminUser={this.props.adminUser}/>)
            case "PRACTITIONER LIST":
                return(<ListRepresentant adminUser={this.props.adminUser}/>)
            case "PATIENT LIST":
                return(<ListPatientAdmin establishment={this.state.establishment} adminUser={this.props.adminUser}/>)
            case "NEW FOLLOW-UP":
                return(<NewFollowUp adminUser={this.props.adminUser}/>)

        }
    }

    render() {
        return(
            <div>
                <StickyContainer>
                    <Header establishment={this.state.establishment} classname={"publicHeader"} connectedUser={this.props.adminUser} careLogo={logoCare} title={"Etablissement"} classname={"headerAdmin publicHeader"} src={logoEtabissement} onClickLogout={this.props.onClickLogout} liensNav={this.state.linksSuperAdmin} onClickNav={this.onClickNavAdmin}/>
                    {this.renderContainer()}
                    <Footer/>
                </StickyContainer>

            </div>
        )
    }
}
export default AdminContainer