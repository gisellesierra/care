import React from 'react'

const InputReadOnly = ({name,text,type,classname,classnameinput,labelclass,id,onChange,value}) =>(
    <div className={classname}>
        <label htmlFor={name} className={labelclass} >{text}  </label>
        <input onChange={onChange} type={type} name={name} id={id} className={classnameinput} value={value} readOnly  />
    </div>
)

export default InputReadOnly