import * as React from 'react';
import {Chat} from '@progress/kendo-react-conversational-ui';
import DiscussionData from "../../../service/discussion-data";
import UsersDatas from "../../../service/users-datas";
import Modal from "react-awesome-modal";

import {Sticky} from "react-sticky";
class AppChat extends React.Component {
    constructor(props) {
        super(props);
        this.userMe = {
            id: this.props.user.id,
            name: this.props.user.firstName+' '+this.props.user.lastName,
        };
        this.state = {
            selectedFile:null,
            inputValue:'',
            messages: [],
            idFollowUp:this.props.followUp.id,
            lastIdMessage:0,
            idUsersNotReceved:[],
            visible : false,
            isYetChagred :true,
            classname:''
        };
    }
     componentDidMount() {//
        console.log("follow id ",this.props.followUp)

        //Ajouter un paper-clip pour pouvoir upload a file
        const elet = document.getElementsByClassName('k-input')[0]
        const paperCLip  = document.createElement('div');
        paperCLip.innerHTML = '<label for="file-input"><i class="fa fa-paperclip""></i></label>'
        elet.parentNode.insertBefore(paperCLip, elet.nextSibling);
        //recuperer toute l'historique de la discussion l'historique des discussion
        // // setTimeout(()=>{
        //      DiscussionData.getAllFollowUpDiscussion(this.props.followUp.id,(discussionsCallBack, status)=>{
        //          console.log(discussionsCallBack)
        //          if(status === 200 && Array.isArray(discussionsCallBack)){
        //              this.waitingLoop(0 ,discussionsCallBack)
        //          }
        //
        //      })
        //  //},250)
         DiscussionData.getAllFollowUpDiscussion(this.props.followUp.id,(discussionsCallBack, status)=>{
             console.log(discussionsCallBack)
             if(status === 200 && Array.isArray(discussionsCallBack)){
                 this.waitingLoop(0 ,discussionsCallBack)
             }

         })

         console.log(this.props.user ) //test
    }
    componentWillUnmount() {
        console.log('retire')
        clearInterval(this.receveMessagesThread)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.followUp.id !== undefined && this.state.isYetChagred){
        //
        //     this.setState({isYetChagred:false})
        //     console.log('id = ',this.state.idFollowUp)
        //     DiscussionData.getAllFollowUpDiscussion(this.props.followUp.id,(discussionsCallBack, status)=>{
        //         console.log(discussionsCallBack)
        //         if(status === 200 && Array.isArray(discussionsCallBack)){
        //             this.waitingLoop(0 ,discussionsCallBack)
        //         }
        //
        //     })
        // }
        console.log( this.props.followUp.id)
        console.log('id = ',this.state.idFollowUp)
        console.log('Messages',this.state.messages)
        console.log('last id MEASSAGE',this.state.lastIdMessage)
        console.log('not receved ',this.state.idUsersNotReceved)
    }
    /***
     *
     * @param i: initialIndex
     * @param array: tableau
     */
    waitingLoop(i,array){
        setTimeout(()=>{
            console.log(array)
            UsersDatas.getUserById(array[i].id_user,  (retour, code) => {
                if(code === 200){
                    this.setState({
                        messages: [ ...this.state.messages, {
                            id: array[i].id,
                            type: array[i].is_img || array[i].is_video ?'url' : 'text',
                            author: this.userMe.id !== array[i].id_user?  {id:retour[0].id, name:retour[0].firstName+' '+retour[0].lastName}:this.userMe,
                            text: array[i].contenu,
                            timestamp: new Date(array[i].date_time)
                        }],
                        lastIdMessage: array[i].id,
                        idUsersNotReceved: typeof retour === 'string' || retour instanceof String  ?[...this.state.idUsersNotReceved, array[i].id_user]: this.state.idUsersNotReceved
                    })
                    i++
                    i < array.length ?  this.waitingLoop(i,array) : this.receveMessages()
                }

            })
        },100)
    }
    receveMessages(){
        this.receveMessagesThread = setInterval(()=>{
            DiscussionData.getLastMessage(this.props.followUp.id, this.state.lastIdMessage, (result,code)=>{
                console.log('result',result)
                if(code===200 && Array.isArray(result)){
                    // A rendre dynamic
                     UsersDatas.getUserById(result[0].id_user,  retour => {
                        console.log(retour)
                        this.setState({
                            messages: [ ...this.state.messages, {
                                id:result[0].id,
                                type:result[0].is_img || result[0].is_video ?'url' : 'text',
                                author:  {id:retour[0].id, name:retour[0].firstName+' '+retour[0].lastName},
                                text: result[0].contenu,
                                timestamp: new Date(result[0].date_time)
                            }],
                            lastIdMessage:result[0].id,
                        })
                         console.log(this.state.lastIdMessage)
                    })
                }
            })
        },1000)
    }

    /***
     *
     * @param props
     * @returns {JSX.Element}
     * @constructor
     */
    MessageTemplate(props) {
        return (
            <div className="k-bubble">
                {props.item.type==='text'?<div className={'message-bubble'}> {props.item.text}</div>:<img  className={'message-bubble-img'} src={props.item.text} alt={"test"}/>}
            </div>
        );
    }
    /**
     * Ajouter un nouveau message
     * */
    addNewMessage = (event) => {
       const message = {contenu:event.message.text, 'id_follow_up': this.props.followUp.id, 'id_user': this.userMe.id}
        console.log(message)
         DiscussionData.sendMessageText(message, (result, status)=>{
             console.log(status)
            if(status === 201){
                this.setState((prevState) => {
                    console.log('message : ',event.message)
                    event.message.type = 'text'
                    return {
                        messages: [...prevState.messages, event.message],
                        lastIdMessage:parseInt(result)
                    };
                });
            }
         })
    };
    countReplayLength = (question) => {
        let length = question.length;
        return question + " contains exactly " + length + " symbols.";
    }
    /**
     * Gestion d'upload d'un image
     * */
    onChangeHandler= (event)=>{
        if(event.target.files[0] instanceof Blob){
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                this.setState({
                    uploadedImageSrc:reader.result,
                    selectedFile:event.target.files[0],
                    visible : true
                })
            }
        }

    }

    /**
     * En Ce qui concerne Alert.js Dialof=gue avant d'envoyer un mesaage
     */
    sendImage(){
        const data = new FormData()
        data.append('file',this.state.selectedFile)
        const message = {'id_follow_up': this.props.followUp.id, 'id_user': this.userMe.id, is_img:true}
        data.append('message',JSON.stringify(message))
        this.setState({
            visible : true
        });
        //test
        DiscussionData.sendMessageFile(data ,(result, code)=>{
            console.log(result)
            if(code === 201){
                this.setState((prevState) => {
                    return {
                       messages: [...prevState.messages,
                           {
                               id: result[0].id,
                               type:'url',
                               author:  this.userMe,
                               text: result[0].text,
                               timestamp: new Date()
                           }
                       ],
                        lastIdMessage:parseInt(result)
                    };
                });
            }
        })
        this.setState({
            visible : false
        });
    }
    openModal() {
        this.setState({
            visible : true
        });
    }
    closeModal() {
        this.setState({
            visible : false
        });
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={'chat-div '}>
                <h2 className={'discussionh2'}> Discussion
                    <button type="button" className={"btn btn-danger "} onClick={this.props.onClickChat}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chat" viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg> close chat </button>
                </h2>
                <Chat user={this.userMe}
                      messages={this.state.messages}
                      onMessageSend={this.addNewMessage}
                      width={'100%'}
                      messageTemplate={this.MessageTemplate}>
                </Chat>
                <input id="file-input" type="file" onChange={this.onChangeHandler}/>
                <section>
                    <Modal
                        visible={this.state.visible}
                        width="500"
                        height="400"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div>
                            <h3 className={'preview'}>Preview</h3>
                            <img className={'image_to_send'}  src={this.state.uploadedImageSrc} alt={"test"}/>
                            <div className={'alert-buttons'}>
                                <button type="button" className="btn btn-secondary close-dialog" ref="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                                <button type="button" className="file btn btn-success" onClick={() => this.sendImage()}>Send <i className="fa fa-send fa-send-dialog"   /></button>
                            </div>

                        </div>
                    </Modal>
                </section>
            </div>
        );
    }
}
export default AppChat