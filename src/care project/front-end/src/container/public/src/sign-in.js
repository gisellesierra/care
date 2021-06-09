import React, {Component} from "react";
import Header from "../../../component/header";
import ImageComponent from "../../../component/image-component";
import Footer from "../../../component/footer";
import SignInForm from "../../../component/sign-in-form";
import InconnuImage from "../../../assets/iconnue_image.png";
import FamilyCare from '../../../assets/family-care.jpg'
import Accueil from "./accueil";
import SignUpContainer from "./sign-up";
import UsersDatas from "../../../service/users-datas";



class SignInContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            emailValue:'',
            password:'',
            messageErreur: '',
            idUser:null
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({links: ['links1','links2','link3']})
    }

    /****
     *
     * @param event
     */
    onChangeInputEMail =(event)=>{
        console.log(event.target.value)
        this.setState({emailValue:event.target.value})
        this.setState({messageErreur:''})

    }
    /***
     *
     * @param event
     */
    onChangeInputPsw =(event)=>{
        console.log(event.target.value)
        this.setState({password:event.target.value})
        this.setState({messageErreur:''})
    }
    /***
     *
     * @param event
     */
    onClickBtnSignIn = (event) =>{

        if(this.state.emailValue.length===0 || this.state.password.length===0){
            this.setState({messageErreur: "Veuillez remplir les champs vides"})

        }else{
            UsersDatas.checkUser(this.state.emailValue,this.state.password,(resutl,code)=>{
                 //const idRoleUser = resutl[0].id_role
                if(code===200){
                    this.props.onClickBtnLogin(resutl[0])
                }
                if(code===404){
                    this.setState({messageErreur: "Utilisaeur inconnu"})
                }
            })
        }

    }
    /***
     *
     * @returns {JSX.Element}
     */
    render() {
        return(
            <div className={"signInContainer"}>
                <ImageComponent src={FamilyCare} text={"Let us take care of you"} alt={"Home page "} className={"homePageImg"}/>
                <SignInForm
                    onClickSignUp={this.props.onClickSubscribe}
                    onClickBtnSignIn={this.onClickBtnSignIn}
                    onChangeInputPsw={this.onChangeInputPsw}
                    onChangeInputEmail={this.onChangeInputEMail}
                    messageErreur={this.state.messageErreur}
                />
            </div>
        )
    }
}

export default SignInContainer