import React, {Component} from "react";
import Input from "../../../component/Input";
import TextArea from "../../../component/textarea";
import FormGenerator from "../../../component/form-generator";
import NewPatient from "./new-patient";

class NewFollowUp extends Component{
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
                <NewPatient  representantUser={this.props.adminUser}/>
            </div>
        )
    }
}

export default NewFollowUp