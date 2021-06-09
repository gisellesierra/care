import React from 'react'
import InputCheckboxRadio from "./input-checkbox-radio";
import Input from "./Input";
import List from "./list";
import ListGrouChat from "./list-group-chat";

const ListPatientComponent = ({chat,patientlist,onClickPatient,onChange,txt}) =>(
    <div className={"contenueListPatientRep"}>
        <div className={"navbar navbar-light  navbarPatientListRep "}>
            <div>
                <h2>Patient List</h2>
            </div>
            <Input type={"search"} onChange={onChange} name={"search"} placeholder={"search"} classnameinput={"form-control mr-sm-2"} classname={"form-inline"}/>
        </div>
        <h1>{txt}</h1>
        <div className={"listPatientAdmin repListpatient"}>
            <List datas={patientlist} onClickPatient={onClickPatient}/>
        </div>
    </div>
)

export default ListPatientComponent