
import React from "react";

const ImageUploader = ({alt,className,src,text,title,onChangeFileHandler})=>(
    <div className={className}>
        <label htmlFor={'inputFile'}>
            <img src={src} alt={alt}/>
            <div>
                <h1>{title}</h1>
                <div>{text}</div>
            </div>
        </label>
        <input id={'inputFile'} type={'file'} name={'file'} onChange={onChangeFileHandler}/>
    </div>
)
export default ImageUploader