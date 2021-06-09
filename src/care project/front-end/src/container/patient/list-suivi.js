import React, {Component} from "react";
import ListSuivisComponent from "../../component/list-suivis-component";
import Star from "../../assets/star.png"
import EtablissementsDatas from "../../service/etablissements-datas";
import SuiviDatas from "../../service/suivi-datas";

class ListSuivis extends Component{
    constructor(props){
        super(props)
        this.state= {
            establishmentInfo: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        console.log('patient info ',this.props.patientInfo)
        //recuperrer tous les etablissements ou le patient a un suivi actif
        SuiviDatas.getPatientFollowUps(this.props.patientInfo.id,(result, code)=>{
                if (code === 200){
                    console.log('patient follo ups',result)
                    this.setState({establishmentInfo: result})
                }else {
                    console.log('no Suivi ')
                }
        })
    }
    onClickSuivi = (establishment)=>()=>{
        this.props.onCLickEstablishment(establishment)
    }
    render() {
        console.log(this.state.establishmentInfo)
        return(
            <div className={"listesuivis"}>
                <ListSuivisComponent onClickSuivi = {this.onClickSuivi} infoEtablissements={this.state.establishmentInfo} alt={"logo etablissement"}/>
            </div>
        )
    }
}

export default ListSuivis