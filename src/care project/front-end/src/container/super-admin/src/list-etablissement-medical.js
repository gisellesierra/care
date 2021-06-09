import React ,{Component} from 'react'
import Etablissements from "../../../component/etablissements";
import NewPartner from "./new-partner";
import EtablissementDetails from "./etablissement-detail";
import EtablissementsDatas from "../../../service/etablissements-datas";
import NewAdmin from "./new-admin";

class ListEtablissementMedical extends Component{
    constructor(props) {
        super(props);
        this.state ={
            isAdmin:false,
            etablissements:[{},{},{}],
            selectedEtablissement:{},
            containerToRender:'listEtablissement',
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        //recuperer la liste des eteablissements
        EtablissementsDatas.getAllPartners((result,status)=>{
            if(status === 404 ){
                console.log('Not Found')
            }else{
                this.setState({etablissements: result})
            }
            console.log(result)
        })
    }
    onClickNewPartner = ()=>{
        this.setState({containerToRender:"newPartner"})
    }

    onClickPartner = (partner)=>()=>{
        this.setState({
            containerToRender:"etablissementdetail",
            selectedEtablissement:partner
        })
        console.log(partner)
    }
    onClickCancel = (event)=>{
        console.log(this.state.containerToRender)
        this.setState({containerToRender:"listEtablissement"})
    }
    savedEstablishement = (establishment)=>{
       // EtablissementsDatas.getParnterById(id,(result,status)=>{
            //verifier d'abord le statut
            console.log(establishment)
            this.setState({
                containerToRender:"etablissementdetail",
                selectedEtablissement:establishment //A retoucher --
            })
       // })
    }
    onClickAddAdmin= (establishement)=>()=>{
        console.log(establishement)
        this.setState({
            containerToRender:"etablissementAdmin",
            selectedEtablissement:establishement
        })
        console.log(this.state.selectedEtablissement)
    }
    onClickSaveAdmin = ()=>{
        this.setState({
            containerToRender:"etablissementdetail"
        })
    }
    renderContainer(){
        switch (this.state.containerToRender) {
            case "listEtablissement":
                return(
                    <div className={"partners"}>
                        <div>
                            <h1>Our Partners</h1>
                            {this.props.superAdminUser !== undefined ? <button type="button" className="btn btn-success btn-new-partner" onClick={this.onClickNewPartner}>New Partner <i className="fa fa-plus-circle fa-plus-circle-newPartner "/></button>:''}
                        </div>
                        <div className="py-5">
                            <Etablissements  etablissements={this.state.etablissements}  onClickPartner={this.onClickPartner}/>
                        </div>
                    </div>
                )
            case "newPartner":
                return (<NewPartner savedEstablishement = {this.savedEstablishement} onCliclCancel={ this.onClickCancel}/>)
            case "etablissementdetail":
                return (<EtablissementDetails onCliclCancel={ this.onClickCancel} superAdminUser={this.props.superAdminUser} onClicAdmin={this.onClickAddAdmin} selectedEtablissement={this.state.selectedEtablissement}/>)
            case "etablissementAdmin":
                return <NewAdmin  onCliclCancel={ this.onClickCancel} onClickSaveAdmin ={this.onClickSaveAdmin} establishement={this.state.selectedEtablissement}/>
        }
    }
    render() {
        return this.renderContainer()
    }
}
export default ListEtablissementMedical