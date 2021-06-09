import React ,{Component} from 'react'
import EtablissementDetail from "../../../component/etablissement-detail";
import StatsNumerique from "../../../component/stats-numerique";
import DiagrammeStats from "../../../component/diagramme-stats";
import Stats from "./stats";

class EtablissementDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            establishement:{}
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({
            establishement: this.props.selectedEtablissement
        })
    }

    render() {
        console.log(this.props.selectedEtablissement)
        return(
            <div>

                <EtablissementDetail onCliclCancel={ this.props.onCliclCancel}  superAdminUser={this.props.superAdminUser} onclickAdmin={this.props.onClicAdmin} establishement={this.props.selectedEtablissement} />
                <Stats/>
                <h2 className={'statsNumeriqueh2'}>Statistique utilisation de la plate-forme de l'etablissement name</h2>
                <div/>
                <div/>
            </div>
        )
    }

}
export default EtablissementDetails