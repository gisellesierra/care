import React from 'react'
import Input from "./Input";

const ListInputMultipleChoices = ({datas ,onChangeInputMultiChoice}) =>(
    <div>
        {datas.map((data ,index)=>(
            <Input text={data.text} name={'inputMulti'+index} onChange={onChangeInputMultiChoice}/>
        ))}
    </div>
)

export default ListInputMultipleChoices