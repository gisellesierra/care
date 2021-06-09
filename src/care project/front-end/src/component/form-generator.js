import React from 'react'
import Input from "./Input";
import InputCheckboxRadio from "./input-checkbox-radio";
import ImageComponent from "./image-component";
import Emoji from "../assets/painScale.jpg";
import RangeSlider from "./temperature-range";
import ListInputMultipleChoices from "./list-input-multiple-choices";

const FormGenerator = ({onclick,onChange,inputValue,onClickPlus,values,onChangeChoice,disabled,handleSlider,onChangeInputMultiChoice})=>(
    <div className={"formGenerator"}>
        <h2>Add a question to the patient's form</h2>
        <Input placeholder={"Enter question here"} value={inputValue} classnameinput={"form-control inputformgenerator"} onChange={onChange}/>
        <h2>Response settings</h2>
        <div>
            <ul className={"form-check settingresponse"}>
                <div className={"painImgScale"}>
                    <li><InputCheckboxRadio type={"radio"} onChange={onChangeChoice}  value={"is_emoticon"} text={"Emoji Diagram"} name={"formquestion"} classnameinput={"form-check-input"} labelclass={"form-check-label"}/> </li>
                    <ImageComponent src={Emoji} />
                </div>

                <div>
                    <li><InputCheckboxRadio type={"radio"} onChange={onChangeChoice}  value={"is_range"} text={"Range"} name={"formquestion"} classnameinput={"form-check-input"} labelclass={"form-check-label"}/> </li>
                    <RangeSlider handleSlider={handleSlider}/>
                </div>
                <div>
                    <li><InputCheckboxRadio type={"radio"} onChange={onChangeChoice}  value={"is_boolean"} text={"Yes/No"} name={"formquestion"} classnameinput={"form-check-input"} labelclass={"form-check-label"}/> </li>
                </div>
                <div>
                    <li><InputCheckboxRadio type={"radio"} onChange={onChangeChoice}  value={"is_multiple_choice"} text={"Multiple Choice (minimum 2)"} name={"formquestion"} classnameinput={"form-check-input"} labelclass={"form-check-label"}/> </li>
                    <ListInputMultipleChoices datas={values} onChangeInputMultiChoice={onChangeInputMultiChoice}/>
                    <span onClick={onClickPlus}><i className="fa fa-plus-circle" /></span>
                </div>
            </ul>
            <button className="w3-button w3-blue w3-button w3-round addQuestionBtn" disabled={disabled} onClick={onclick}>Add Question</button>
        </div>
    </div>
)

export default FormGenerator