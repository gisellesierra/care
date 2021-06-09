import React from 'react'
import ListServices from "./list-services";
import Input from "./Input";
const AdminOperationsComponent = ({onClickAddService,service,onChange,onClick,value})=>(
    <div>

        <div className={"serviceContainerList"}>
            <h1>Our Services</h1>
            <div className={"form-inline"}>
                <span>Add new service :</span>
                <Input labelclass={"col-sm-2 col-form-label"} value={value} classnameinput={"form-control "} classname={"form-group mb-2"} name={"newService"} onChange={onChange}/>
                <button className="w3-button w3-green w3-button w3-round" onClick={onClickAddService}>Add Service</button>
            </div>

            <div className={"containerservice"}> <ListServices onClick={onClick} services={service} /></div>
        </div>

    </div>
)

export default AdminOperationsComponent