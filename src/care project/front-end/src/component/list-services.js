import React from 'react'

const ListServices = ({ services,onClick})=>(

    <ul className={"list-group"}>
            {services.map((service)=>(
                <div className={""}>
                        <li className={"list-group-item liServices"}>
                                <h3>{service.description}</h3>
                                <button className={"btn btn-outline-danger"} onClick={onClick(service.id)}>Delete</button>
                        </li>
                </div>
            ))}
    </ul>
)
export default ListServices