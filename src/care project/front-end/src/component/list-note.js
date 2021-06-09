import React from "react";

function makeLi(data,onClick,index){
    return(
        <li >{data.description} <i key={index} onClick={onClick(data.id)} className={"fa fa-trash-o"} /></li>
    )
}
const ListeNote = ({datas,onClick})=>(
    <ul>
        {datas.map((data,index)=>makeLi(data,onClick,index))}
    </ul>
)
export default ListeNote;