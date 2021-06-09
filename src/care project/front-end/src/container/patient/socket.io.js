import React from "react";
import socketIOClient from 'socket.io-client'
import {fetchUtil, METHOD, requestConfig} from "../../service/util";
const ENDPOINT = "http://127.0.0.1:8080";

class AppSocket extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            response:''
        }
    }
    componentDidMount() {

        // this.socket = socketIOClient(ENDPOINT)
        // //fetchUtil('/')
        //
        // fetchUtil('/messages', requestConfig(METHOD.GET),(result, code)=>{
        //     this.socket.on('messages',data=>{
        //         console.log(data)
        //         this.setState({response:data})
        //     })
        //
        // })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('soms')
        // if(parseInt(this.state.response) > 100){
        //     this.socket.on('deconnection',data=>{
        //         //test
        //         console.log(data)
        //         this.setState({response:data})
        //     })
        // }
    }

    render() {
        return(
            <p>
                {/*{this.state.response}*/}
            </p>
        )
    }
}
export default AppSocket