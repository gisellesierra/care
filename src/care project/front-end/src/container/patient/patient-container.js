import React from 'react'
import Header from "../../component/header";
import Footer from "../../component/footer";
import Accueil from "../public/src/accueil";
import ListSuivis from "./list-suivi";
import logoBlanc from "../../assets/logoblanc.png"
import ListGrouChat from "../../component/list-group-chat";
import {StickyContainer,Sticky} from "react-sticky";
import DetailSuivi from "../representant/src/detail-suivi";
import AppChat from "../public/src/chat";
import DetailSuiviPatient from "./detail-suivi-patient";
import StepperQuestion from "../../component/stepper-question";
import ContactUs from "../public/src/contact-us";
class PatientContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            linksSuperAdmin:[],
            listSUivis: [{},{},{},{},{},{}],
            containerToRender:"MY FOLLOWS UPS",
            patient : {},
            containerChatToRender:"LIST-GROUP_CHAT"
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({
            linksSuperAdmin: ['HOME','MY FOLLOWS UPS','CONTACT-US','PROFILE'],
            patient:this.props.patientUser,
            infoSelectedEstablishment : {}
        })
    }
    onClickNavPatient = linkValue => () => {
        this.setState({containerToRender : linkValue})
    }
    onClickChat = infoChat => () =>{
        console.log(infoChat)
        this.setState({containerChatToRender : "CHAT"})
    }
    onCLickEstablishment = infoEtablissement=>{
        console.log(infoEtablissement)
        this.setState({infoSelectedEstablishment:infoEtablissement})
        this.setState({containerToRender : "DETAIL-SUIVI"})
    }
    renderContainer(){
        switch (this.state.containerToRender){
            case "HOME":
                return (<Accueil/>)
            case "MY FOLLOWS UPS":
                return(<ListSuivis  onCLickEstablishment={this.onCLickEstablishment} patientInfo = {this.props.patientUser}/>)
             case "DETAIL-SUIVI":
                return (<DetailSuiviPatient establishment={this.state.infoSelectedEstablishment}  patientInfo = {this.props.patientUser}/>)
            case "CONTACT-US":
                return (<ContactUs/>)
            case "PROFILE":
                return(<div/>)
        }
    }

    /***
     *
     * @returns {JSX.Element}
     */
    renderChat(){
        if(this.state.containerChatToRender === "CHAT")
            return  <AppChat/>
        if (this.state.containerChatToRender === 'LIST-GROUP_CHAT')
            return <ListGrouChat onClickChat={this.onClickChat} lists={this.state.listSUivis}/>
    }
    render() {
        console.log()
        return(
            <div>
                <StickyContainer>
                    <Header classname={"patientheader publicHeader"}  connectedUser={this.props.patientUser} liensNav={this.state.linksSuperAdmin} onClickLogout={this.props.onClickLogout} onClickNav={this.onClickNavPatient} title={"Care"} src={logoBlanc}/>
                       <div >
                           {this.renderContainer()}
                       </div>
                    <Footer/>
                </StickyContainer>
            </div>
        )
    }
}
export default PatientContainer