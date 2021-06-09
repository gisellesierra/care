import React, {Component} from "react";
import Input from "../../../component/Input";
import UsersDatas from "../../../service/users-datas";
import MessageErreur from "../../../component/message-erreur";
import InputCheckboxRadio from "../../../component/input-checkbox-radio";



class SignUpContainer extends Component{
    constructor(props){
        super(props)

        this.state={
            signUpValues:{},
            msgvalidation:""
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({links: ['links1','links2','link3']})
    }
    onChangeInput=(event)=>{
        this.setState({
            signUpValues: Object.assign(this.state.signUpValues,{[event.target.name]:event.target.value})
        })

    }
    onClickSubscribe=(event)=>{
       const user = this.state.signUpValues
        if(user.id_sexe===undefined ||user.firstName===undefined || user.lastName===undefined || user.date_of_birth===undefined || user.password===undefined || user.password2===undefined || user.email===undefined || user.phone===undefined ||user.access_code===undefined){
           this.setState({msgvalidation:"Please complete all fields"})


        }else  if(user.password!==user.password2){
            this.setState({msgvalidation:"Password not identical"})
        }
        else {
            UsersDatas.SignUpUserVerify(user,(result,code)=>{
                console.log(result)
                if(code===200){
                    user.id = result[0].id
                    console.log("user", user)
                    UsersDatas.SignUpUser(user,(result,code)=>{
                        if(code===201){
                            this.props.onClickLogin()
                        }else{
                            this.setState({msgvalidation:"Error"})
                        }
                    })
                }else{
                    this.setState({msgvalidation:"Email or access code invalid"})
                }
            })

        }
    }
    render() {
        return(
            <div className={"signContainerclass"}>
                <h1>Sign Up</h1>
                <MessageErreur msg={this.state.msgvalidation}/>
                <div className={"signupboth"}>
                    <div>
                        <Input classname={"form-group"} text={"First Name"} type={"text"} placeholder={"Biran"} name={"firstName"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Last Name"} type={"text"} placeholder={"Ndiaye"} name={"lastName"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Date of Birth"} type={"date"} name={"date_of_birth"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Password"} type={"password"} placeholder={"********"} name={"password"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Confirm Password"} type={"password"} placeholder={"********"} name={"password2"} classnameinput={"form-control"} onChange={this.onChangeInput}/>

                    </div>
                    <div>
                        <Input classname={"form-group"} text={"Email"} type={"email"} placeholder={"care@gmail.com"} name={"email"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Phone Number"} type={"text"} placeholder={"+1 438 123 4567"} name={"phone"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <span>Sexe: </span>
                        <InputCheckboxRadio text={"Male"} type={"radio"} placeholder={"Biran"} name={"id_sexe"} value={"1"}  onChange={this.onChangeInput} />
                        <InputCheckboxRadio text={"Female"} type={"radio"} placeholder={"Biran"} name={"id_sexe"} value={"2"} onChange={this.onChangeInput}/>
                        <Input classname={"form-group"} text={"Access Code"} type={"text"} name={"access_code"} classnameinput={"form-control"} onChange={this.onChangeInput}/>
                        <button type="button"  className="w3-button w3-green w3-round" onClick={this.onClickSubscribe}>Subscribe</button>
                    </div>
                </div>


            </div>
        )
    }
}

export default SignUpContainer