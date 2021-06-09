import React from "react";
import Input from "../../../component/Input";
import EtablissementsDatas from "../../../service/etablissements-datas";

class NewAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            formValues:{},
            messageError:""
        }

    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onInputChange = (event)=>{
        this.setState({
            formValues:Object.assign(this.state.formValues,{[event.target.name]:event.target.value})
        })

    }
    onClickSave = ()=>{
        console.log(this.state.formValues)
        const formFields = ['firstName','lastName','email','password']
        const emptyField = formFields.find(field=> this.state.formValues[field] === undefined || this.state.formValues[field].trim() === '')
        if(emptyField !== undefined){
            this.setState({messageError:"Veuillez remplir tous les champs ---"})
        }else {
            EtablissementsDatas.addEstatblishementAdmin(this.state.formValues, parseInt(this.props.establishement.id),(result,status)=>{
                console.log(status)
                console.log(result)
                this.props.onClickSaveAdmin()
            })
        }

    }
    onClickCancel=()=>{
        this.props.onCliclCancel()
    }
    render() {
        return(
            <div className={'admin'}>
                <div className={'new-admin'}>
                    <h2 className={'newpartnerH2'}>{this.props.establishement.name} : Admin</h2>
                    <div className={"partnerAdminInfo"}>
                        <div className={'erroMessage'} >{this.state.messageError}</div>
                        <div>
                            <Input  text={"First Name"} placeholder={"Biran"} name={"firstName"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                            <Input text={"Last Name"} placeholder={"Ndiaye"} name={"lastName"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                        </div>
                        <div className={"infosecondadmin"}>
                            <Input text={"Email"} placeholder={"biran@hospitalcare.com"} name={"email"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                            <Input text={"Password"} placeholder={"********"} name={"password"} type={"password"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                        </div>
                        <div className={"newpartnerButton"}>
                            <button type="button" className="btn btn-secondary" onClick={this.onClickCancel}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={this.onClickSave}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default NewAdmin