import React, {Component} from "react";
import Input from "../../../component/Input";
import Select from "../../../component/select";
import TextArea from "../../../component/textarea";
import FormGenerator from "../../../component/form-generator";
import ServicesData from "../../../service/services-data";
import TraitementDatas from "../../../service/traitement-datas";
import FormContainer from "./form-container";


class NewTreatmentRepDelete extends Component{
    constructor(props){
        super(props)

        this.state={
            services:[],
            traitementParSuivis:[],
            containerToRender:"addTreatment"
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const idService = this.props.suivis.newSuivi.id_service
        TraitementDatas.getTreatmentByIdService(idService,(resutl,code)=>{
            console.log(resutl)
            const basicTreatments = resutl.map(name=>(name.description))
            if(code===200){
                this.setState({traitementParSuivis:basicTreatments})
            }
        })
    }

    onClickNext=(event)=>{
        this.setState({containerToRender:"addQuestion"})
    }

    renderContainer(){
        switch (this.state.containerToRender){
            case "addQuestion":
                return(<FormContainer/>)
            case "addTreatment":
                return(
                    <div className={"newTreatment"}>
                        <h1>Treatment</h1>
                        <div className={"treamentadded"}>

                            <div className={"poso"}>
                                <h3>Posologie</h3>
                                <Input classnameinput={"form-control"} name={"nbDays"} type={"text"} text={"Number of days: "} />
                                <Input classnameinput={"form-control"} name={"daysTreatment"} type={"text"} text={"Number of times per day: "} />
                            </div>
                            <div className={"operationtype"}>
                                <h3>Treatment</h3>
                                <Select array={this.state.traitementParSuivis}/>
                            </div>
                            <div className={"specific treatment"}>
                                <h3>Insctruction</h3>
                                <TextArea text={"Instruction"}/>
                            </div>
                        </div>

                        <div className={"addingTreatment"}>
                            <div>
                                <Input text={"Upload Video"} type={"file"} classname={"form-label"} classnameinput={"form-control"}/>
                            </div>

                            <div>
                                <Input text={"Upload Image"} type={"file"} classname={"form-label"} classnameinput={"form-control"}/>
                            </div>
                        </div>
                        <button className="w3-button w3-blue w3-button w3-round" onClick={this.onClickNext}>Next</button>

                    </div>

                )
        }
    }

    render() {
      return(
          <div>
              {this.renderContainer()}
          </div>
      )
    }
}

export default NewTreatmentRepDelete