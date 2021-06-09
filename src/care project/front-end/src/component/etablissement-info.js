import React from 'react'
import star from '../assets/star.png'
const EtablissementInfo = ({infoTye, infoValue})=>(
    <div className={'etablissement-info'}>
        <div>
            <img src={star}/>
        </div>
        <div>
            <h5>{infoTye}</h5>
            <div>{infoValue}</div>
        </div>
    </div>
)
export default EtablissementInfo