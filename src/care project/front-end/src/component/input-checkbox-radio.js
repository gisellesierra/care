import React from 'react'

const InputCheckboxRadio = ({name,text,type,classname,classnameinput,labelclass,value,onChange,checked}) =>(
    <div className={classname}>
        <input type={type} name={name} id={name} checked={checked}  className={classnameinput} value={value} onChange={onChange} />
        <label htmlFor={name} className={labelclass} >{text} </label>
    </div>
)

export default InputCheckboxRadio