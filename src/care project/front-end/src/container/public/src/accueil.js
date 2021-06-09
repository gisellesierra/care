import React, {Component} from "react";
import ImgAccueil from "../../../component/img-accueil";
import ImageComponent from "../../../component/image-component";
import ImageText from "../../../assets/accueiltext.png";


class Accueil extends Component{
    constructor(props){
        super(props)

        this.state={

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return(
            <div>
                <ImgAccueil text={"A platform allowing us to do with a patient follow-up without travel"} title={"Care"} />
                <ImageComponent src={ImageText} title={"Heatlcare providers using text messages to do follow-ups"} text={"Our platform is now part of several establishments. The patient is able to follow up remotely with his practitioner, quickly and easily. You just need to open an account with us, or simply go to your establishment to get an access code"}
                alt={"Text accueil"} className={"textAccueil"}/>

                <div className={"introText"}>
                    <div>
                        <h1>Why would you want to be part of our team ?</h1>
                    </div>

                    <div className={"text"}>
                        <div>
                            <p>Our platform will attract your patients due to the minimum travel</p>
                        </div>

                        <div>
                            <h2>How to be part of our team ?</h2>
                            <p>Just contact us by email and we'll take care of the rest!</p>
                        </div>

                    </div>
                </div>

            </div>


        )
    }
}

export default Accueil