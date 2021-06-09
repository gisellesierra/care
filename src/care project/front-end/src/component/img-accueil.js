import React from 'react'
import ImageComponent from "./image-component";
import AccueilImg from '../assets/accueil.jpg'
const ImgAccueil = ({text,title})=>(
    <div className={"imgAccueil"}>
        <div className={"accueiltextimg"}>
            <h1>{title}</h1>
            <div>{text}</div>
        </div>

    </div>

)

export default ImgAccueil