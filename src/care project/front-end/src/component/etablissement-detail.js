import React from 'react'
import inconnue_image from '../assets/iconnue_image.png'
import EtablissementInfo from "../component/etablissement-info";
const EtablissementDetail = ({establishement,onclickAdmin, superAdminUser})=>(
    <div className={'etablishement-detail'}>
        <div>
            <img className={'img-etablishement-detail'} src={establishement.logo_url} alt = {'Etablissements Logo'}/>
        </div>

        <div>
            <h1>{establishement.name}</h1>
            <div/>
            <h2 className={'category'}>{establishement.description}</h2>
            <div className={'etablissement-info-1'}>
                <EtablissementInfo infoTye={'Address'} infoValue={establishement.adress}/>
                <EtablissementInfo infoTye={'Phone'} infoValue={establishement.phone}/>
                <EtablissementInfo infoTye={'Email'} infoValue={establishement.email}/>
            </div>
            <div className={'btn-add-admin'}>
                {superAdminUser !== undefined ? <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onclickAdmin(establishement)}>ADD ADMIN</button>:''}
            </div>
        </div>
    </div>
)
export default EtablissementDetail