import React from 'react'
import Input from "./Input";


const ListExtraQuestions = ({datas, onClick, onChangeInput}) =>(
    <div>
        <ul className={"UlliQuestions"}>
            {datas.map((data,index)=>(
                <li key={index} className={"liQuestions"}>
                    <div className={"question"}>
                        <div className={"textQuestion"}>{data.question.question}</div>
                        <div className={"frequency"}>
                            <Input type={"number"} text={"Every "} onChange={event => onChangeInput(event, index)} classnameinput={"typeNumberInput"} min={1} max={7}  />
                            <span> days</span>
                            <span onClick={onClick(index)}><i className="fa fa-trash-o"/></span>
                        </div>
                    </div>
                </li>))}
        </ul>
    </div>
)
export default ListExtraQuestions