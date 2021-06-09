import React from 'react'
const ImageComponent = ({alt,className,src,text,title})=>(
    <div className={className}>
        <img src={src} alt={alt}/>
        <div>
            <h1>{title}</h1>
           <div>{text}</div>
        </div>
    </div>

)

export default ImageComponent