import React, {Component} from "react";
 import '../../css/style.css';
import Footer from "../../component/footer";
import Header from "../../component/header";
import SignInContainer from "./src/sign-in";
import SignUpContainer from "./src/sign-up";
import {StickyContainer} from "react-sticky";
import Accueil from "./src/accueil";
import ListEtablissementMedical from "../super-admin/src/list-etablissement-medical";
import logoBlanc from "../../assets/logoblanc.png"
import ContactUs from "./src/contact-us";


class PublicContainer extends Component{
    constructor(props){
        super(props)

        this.state={
            containerToRender:'HOME',
            links:[],
            user:null
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
         this.setState({links: ['HOME','PARTNERS','CONTACT-US']})
    }
    onClickLogin = (event)=>{
        this.setState({ containerToRender:'login',})
    }

    onClickSignUp = (event)=>{
        this.setState({ containerToRender:'subscribe',})
    }
    onClickNav = (linkValue)=>()=>{
        return (this.setState({containerToRender:linkValue}))
    }
    onClickLogo = ()=>{
        this.setState({ containerToRender:'HOME',})
    }

    onClickBtnLogin = (user)=>{
        this.props.onClickBtnlogin(user)
    }
    renderContainer(){
        switch (this.state.containerToRender){
            case "HOME":
                return (<Accueil/>)
            case "login":
                return (<SignInContainer onClickSubscribe={this.onClickSignUp} onClickBtnLogin ={this.onClickBtnLogin}/>)
            case "subscribe":
                return(<SignUpContainer onClickLogin={this.onClickLogin} />)
            case "PARTNERS":
                return (<ListEtablissementMedical />)
            case "CONTACT-US":
                return(<ContactUs/>)
        }
    }
    render() {
             return(
               <div>
                   <StickyContainer>
                       <Header classname={"publicHeader"} title={"Care"} src={logoBlanc}  liensNav={this.state.links} log={"Login"} onClickLogin={this.onClickLogin} onClickSignUp={this.onClickSignUp} onClickNav={this.onClickNav} onClickLogo={this.onClickLogo}/>
                       {this.renderContainer()}
                       <Footer/>
                   </StickyContainer>
               </div>
        )
    }
}
export default PublicContainer;
