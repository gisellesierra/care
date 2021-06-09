import React from 'react'

const ListRepresentantComponent = ({datas,onClick}) =>{
    console.log(datas)
    return(
    <div className={"datasInfo"}>
        <ul className={"ulcontenue"} >
            {datas.map((data,index)=>(

                <li className={"licontenue"} onClick={onClick(index)} key={index}>

                        <div className={"asideTextHover"}> <span>CLICK TO MODIFY</span>  </div>
                    <h5> {data.lastName} {(data.firstName)===null?<span className={"notRegisteredAdmin"}>Patient not registered yet</span>:data.firstName}</h5>
                        <div className={"inlineinput"}> <div>Email : </div> <span>{data.email}</span> </div>
                        <div className={"inlineinput"}> <div>Phone Number: </div> <span>{data.phone}</span> </div>
                        <div className={"inlineinput"}><div>Poste: </div> <span>{data.poste}</span> </div>
                        <div className={"inlineinput"}><div>Date of birth: </div> <span>{data.date_of_birth}</span> </div>

                    <div className={"patientsActivity"}>
                        <div  className={"inlineinput"}> {(data.is_actif)===true?<span className={"active"}>Active</span>:<span className={"inactive"}>Inactive</span>}</div>
                    </div>
                </li>))}
        </ul>
    </div>
)}

export default ListRepresentantComponent