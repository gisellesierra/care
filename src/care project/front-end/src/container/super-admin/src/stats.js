import React from "react";
import StatsNumerique from "../../../component/stats-numerique";
import DiagrammeStats from "../../../component/diagramme-stats";


class Stats extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return(
            <div>
                <h2 className={'statsNumeriqueh2'}>Statistique utilisation de la plate-forme de l'etablissement name</h2>
                <div></div>
                <StatsNumerique/>
                <h2 className={'statsNumeriqueh2'}>Chart Number of connected patients last week </h2>
                <div></div>
                <DiagrammeStats/>
            </div>
        )
    }
}
export default Stats