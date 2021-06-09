import React from 'react'

const Input = ({name,text,type,classname,placeholder,classnameinput,labelclass,id,onChange,value, onClick,min,max}) =>(
    <div className={classname}>
            <label htmlFor={name} className={labelclass} >{text}  </label>
            <input onChange={onChange} type={type} name={name} id={id} placeholder={placeholder} className={classnameinput} value={value} onClick={onClick} min={min} max={max} />
    </div>
)

export default Input