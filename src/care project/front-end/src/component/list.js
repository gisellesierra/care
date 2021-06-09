import React from 'react'

const List = ({datas, onClickPatient}) =>(
    <div className={"datasInfo .listPatientRep"} >
        <ul className={"ulcontenue"}>
            {datas.map((data,index)=>(
                <li className={"licontenue"} key={index} onClick={onClickPatient(data) }>
                    <div>
                        <div className={"asideTextHover"}> <span>CLICK ON PATIENT TO SEE FOLLOW-UP</span>  </div>
                        <h5> {data.lastName} {(data.firstName)===null?<span className={"notRegistered"}>Patient not registered yet</span>:data.firstName}</h5>
                        <div className={"inlineinput"}><div>Date of Birth: </div> <span>{data.date_of_birth}</span> </div>
                        <div className={"inlineinput"}><div>Phone Number: </div> <span> {data.phone}</span></div>
                        <div className={"inlineinput"}><div>Email: </div> <span>{data.email}</span></div>
                        <div className={"inlineinput"}><div>Sexe: </div> <span>{(data.id_sexe===1?"Male":"Female")}</span></div>
                    </div>
                    <div className={"patientsActivity"}>
                        <div className={"inlineinput"}> {(data.is_actif)===true?<span className={"active activeSpan"}>Active</span>:<span className={"inactive activeSpan"}>Inactive</span>}</div>
                    </div>
                </li>))}
        </ul>
    </div>
)

export default List