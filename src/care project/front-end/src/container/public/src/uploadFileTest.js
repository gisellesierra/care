import React from "react";
import axios from 'axios'
import multer from 'multer'
class UploadFileTest extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            selectedFile:null,
        }
    }
    onChangeHandler = event=>{
        console.log(event.target.files[0])
        this.setState({
            selectedFile:event.target.files[0],
            loaded:0,
        })
    }
    onClickHandler=()=>{
        const data = new FormData()
        data.append('file',this.state.selectedFile)
        console.log(data)
        axios.post('http://localhost:8000/upload', data, {})
            .then(res =>{
                console.log(res.data)
                this.setState({photo:res.data})
            })
    }

     render() {
        return(
            <div>
                <input type={'file'} name={'file'} onChange={this.onChangeHandler}/>
                <button type={"button"} className={'btn btn-success btn-block'} onClick={this.onClickHandler}>Upload</button>
                {/* eslint-disable-next-line no-template-curly-in-string */}
                <img className={'image_uploaded'} src={'http://localhost:8000/image'} alt={'image'}/>
            </div>
        )
    }
}
export default UploadFileTest