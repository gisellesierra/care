import React, {Component} from "react";
import InconnuImage from "../../../assets/iconnue_image.png";
import Input from "../../../component/Input";
import ImageUploader from "../../../component/image-uploader";
import EtablissementsDatas from "../../../service/etablissements-datas";

class NewPartner extends Component{
    constructor(props){
        super(props)
        this.state={
            formValues: {},
            selectedFile: null,
            messageError:'',
            uploadedImageSrc:null
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    /***
     *
     * @param event
     */
    onInputChange=(event)=>{
        this.setState({
            formValues:Object.assign(this.state.formValues,{[event.target.name]:event.target.value})
        })
    }
    /***
     *
     * @param event
     * gerer l'upload de file vers le server
     */
    onChangeFileHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0,
        })
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            this.setState({
                uploadedImageSrc:reader.result
            })
            console.log(reader.result)
        }
    }
    /***
     *
     * @param event
     */
    onClickSubscribe = (event)=>{
        //image
        const data = new FormData()
        data.append('file',this.state.selectedFile)

        //validation saisi de tous les champs
        const formFields = ['name','email','phone','description','adress']
        const emptyField = formFields.find(field=> this.state.formValues[field] === undefined || this.state.formValues[field].trim() === '')
        console.log(this.state.selectedFile)
        console.log(emptyField)
        if(emptyField !== undefined || this.state.selectedFile === null){
           this.setState({messageError:"Veuillez remplir tous les champs ---"})
        }else{
            //si tout va bien
            let establishment = {
                name:this.state.formValues.name,
                phone: this.state.formValues.phone,
                email: this.state.formValues.email,
                description: this.state.formValues.description,
                adress:this.state.formValues.adress
            }
            console.log(establishment)
            //les autres champs
            data.append('establishment', JSON.stringify(establishment))
            //Ajouter l'etablissement dans l'API
            EtablissementsDatas.addPartner(data,(result,status)=>{
                console.log(status)
                console.log(result)
                if(status===201){
                    result.logo_url=this.state.uploadedImageSrc
                    this.props.savedEstablishement(result)//1 = idAddedUser
                }
                // if(status===444){
                //     this.setState({messageError:'l\'email est deja utilisé ---'})
                //     this.setState( this.setState({
                //         formValues:Object.assign(this.state.formValues,{['email']:''})
                //     }))
                // }

                //tester si on a recu le bon statu de code
               // this.props.savedEstablishement(3)//1 = idAddedUser

            })
        }
    }
    onClickCancel = ()=>{
        this.props.onCliclCancel()
    }

    /**
     * @returns {JSX.Element}
     * display template
     */
    render() {
        return(
            <div className={"newPartnerContainer"}>
                <h1>New Partner</h1>
                <div className={'erroMessage'} >{this.state.messageError}</div>
                <div className={"establishmentInfo"}>
                    <div>
                        <Input text={"Establishment Name"} placeholder={"Hostpital Care"} name={"name"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                        <Input  text={"Email"} placeholder={"hospitalcare@gmail.com"} name={"email"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                        <Input text={"Phone"} placeholder={"+1 438 543 2007"} name={"phone"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                        <Input text={"Description"} placeholder={"Clinique Dentaire"} name={"description"} classname={"descriptionestablishment"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                    </div>

                    <div className={"imglogoestablishment"}>
                        <ImageUploader alt={"logo etablissement"} isUploaded={this.state.uploadedImageSrc !== null}
                            className={"logoEtablissement logoAdd"} text={this.state.uploadedImageSrc !== null?"Change Image":"Upload logo"}
                            src={this.state.uploadedImageSrc===null?InconnuImage:this.state.uploadedImageSrc} onChangeFileHandler={this.onChangeFileHandler} />
                        <Input text={"Adresse"} placeholder={"111 toto street, Montreal, Quebec"} name={"adress"} classname={"adresseestablishment"} classnameinput={"form-control"} onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className={"newpartnerButton"} >
                    <button type="button" className="btn btn-secondary" onClick={this.onClickCancel}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickSubscribe}>SAVE</button>
                </div>
            </div>
        )
    }
}

export default NewPartner