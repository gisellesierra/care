import React from 'react'

const Select = ({array,label,name,value, onChange }) => (
    <div>
        <div>
            <label htmlFor={label}>{label}</label>
        </div>
        <select name={name} value={value} className='form-control' onChange={onChange}>
            {array.map((option) => <option  value={option}>{option}</option>)}
        </select>
    </div>

)

export default Select
