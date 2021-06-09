import React from 'react'
import iconnue_image from '../assets/iconnue_image.png'

function makeEtablissement(onClickGetPartner,etablissement){
    return(
        <div className="col-lg-4" onClick={onClickGetPartner(etablissement)}>
            <div className="hover hover-5 text-white rounded">
                <img  src={etablissement.logo_url} alt=""/>
                <div className="hover-overlay"/>
                <div className="hover-5-content" >
                    <h3 className="hover-5-title text-uppercase font-weight-light mb-0">
                        CARE
                        <strong className="font-weight-bold text-white"> {etablissement.name} </strong>
                        <span>{etablissement.description}</span>
                    </h3>
                </div>
            </div>
        </div>
    )
}
const Etablissements = ({etablissements,onClickPartner})=>(
    <div className="row" >
        {etablissements.map((etablissement)=>makeEtablissement(onClickPartner, etablissement))}
    </div>
)
export default Etablissements