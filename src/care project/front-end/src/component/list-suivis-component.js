import React from 'react'

const ListSuivisComponent = ({infoEtablissements,alt, onClickSuivi}) =>(
    <div>
        <ul className={"list-group"}>
            {infoEtablissements.map((info)=>(
                <li className={"list-group-item listeSuivisPatient"} onClick={onClickSuivi(info)}>

                    <div>
                        <img src={info.logo_url} alt={alt}/>
                    </div>

                    <div>
                        <h5> {info.name}</h5>
                        <div>Adresse :  {info.adress}</div>
                        <div>Phone Number: {info.phone}</div>
                    </div>
                    {/*<div>*/}
                    {/*    Nb Follow-Up : 1*/}
                    {/*</div>*/}
                </li>))}
        </ul>
    </div>
)

export default ListSuivisComponent