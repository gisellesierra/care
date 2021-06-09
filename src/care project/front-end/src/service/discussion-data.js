import {fetchUtil, METHOD, requestConfig} from "./util";
import axios from "axios";

class DiscussionData {

     static getAllFollowUpDiscussion(idSuivi, resultCallBack){
        fetchUtil('/message/'+idSuivi, requestConfig(METHOD.GET), resultCallBack)
    }
    static sendMessageText(message,resultCallBack){
        fetchUtil('/message/send', requestConfig(METHOD.POST,message), resultCallBack)
    }
    static sendMessageFile(message,resultCallBack){
        axios.post('https://care-project.herokuapp.com/message/sendFile', message, {})
            .then(response => {console.log(response);console.log('status',response.status);resultCallBack(response.data,response.status)})
            .catch(error=>console.log(error))
    }
    static getLastMessage(idFollowUp, idMessage, resultCallBack){
         fetchUtil('/message/last-follow-up-message/'+idFollowUp+'/'+idMessage, requestConfig(METHOD.GET),resultCallBack)
    }

}
export default DiscussionData