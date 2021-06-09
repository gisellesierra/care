import React, {Component, useState, useEffect} from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Accueil from "../public/src/accueil";
import ListEtablissementMedical from "./src/list-etablissement-medical";
import logoBlanc from "../../assets/logoblanc.png"
import Stats from "./src/stats";
import {StickyContainer} from "react-sticky";

import NewPartner from "./src/new-partner";
import EtablissementDetails from "./src/etablissement-detail";
import ContactUs from "../public/src/contact-us";


class SuperAdminContainer extends Component{

    constructor(props){
        super(props)
        this.state={
            containerToRender:'HOME',
            linksSuperAdmin:[]
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({linksSuperAdmin: ['HOME','PARTNERS','STATS','CONTACT-US']})
    }

    /***
     *
     * @param linkValue
     */
    onClickNav = (linkValue)=>()=>{
        return (this.setState({containerToRender:linkValue}))
    }

    /***
     *
     * @returns {JSX.Element|string}
     */
    renderContainer(){
        switch (this.state.containerToRender){
            case "HOME":
                return (<Accueil/>)
            case "PARTNERS":
                return(<ListEtablissementMedical superAdminUser={this.props.superAdminUser}/>)
            case "STATS":
                return(<Stats/>)
            case "CONTACT-US":
                return(<ContactUs/>)
        }
    }
    render() {
        return(
            <div>
                <StickyContainer>
                    <Header classname={"publicHeader"} title={"Care"} src={logoBlanc} liensNav={this.state.linksSuperAdmin} connectedUser={this.props.superAdminUser} onClickLogout={this.props.onClickLogout} onClickNav={this.onClickNav} onClickLogout={this.props.onClickLogout}/>
                    {/*<img src={'https://care-project-assets.s3.us-east-2.amazonaws.com/img/1617649622875dead.jpg'} alt={'test'}/>*/}
                    {this.renderContainer()}
                    <Footer/>
                </StickyContainer>
            </div>
        )
    }

}
export default SuperAdminContainer