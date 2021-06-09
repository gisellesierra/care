package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.Message;
import com.isi.caremobile.services.RequestGetObject;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
public class MessageManager {

    // {"id":7,"contenu":"Bonjour Docteur!!","is_img":false,"is_video":false,"date_time":"2021-04-09T06:52:30.399Z","id_user":107,"id_follow_up":4}


    public static ArrayList<Message> getMesaagesByFollowUpId(int followUpId){
        ArrayList<Message> listMessage = new ArrayList();
        Message[] messages = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/message/"+String.valueOf(8)).get();
            if ( responseString != null) {
                Gson gson = new Gson();
                messages = gson.fromJson(responseString, Message[].class);
                if ( messages != null){
                    for ( int i = 0;i < messages.length;i++){
                        listMessage.add(messages[i]);
                    }
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listMessage;
    }



}