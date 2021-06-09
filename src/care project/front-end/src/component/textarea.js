import React from 'react'

const TextArea = ({ text, placeholder,onChange, name})=>(
    <div className="form-group">
        <label htmlFor="exampleFormControlTextarea2">{text}</label>
        <textarea name={name} onChange={onChange} className="form-control rounded-0" id="exampleFormControlTextarea2" placeholder={placeholder} rows="2"></textarea>
    </div>
)

export default TextArea