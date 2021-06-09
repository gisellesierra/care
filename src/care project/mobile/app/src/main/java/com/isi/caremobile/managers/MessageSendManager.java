package com.isi.caremobile.managers;

import com.isi.caremobile.entities.MessageSend;
import com.isi.caremobile.services.RequestPostObject;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class MessageSendManager {

    public static Boolean sendMessage(MessageSend messageSendData) {
        Boolean result = false;
        Map<String, String> messageSend = new HashMap<>();
        // { "contenu":"Bonjour !!!","id_follow_up":8,"id_user":22}
        messageSend.put("contenu", messageSendData.getContenu());
        messageSend.put("id_follow_up", String.valueOf(messageSendData.getId_follow_up()));
        messageSend.put("id_user", String.valueOf(messageSendData.getId_user()));
        //
        RequestPostObject task = new RequestPostObject(messageSend);
        String response = "";
        try {
            response = task.execute("https://care-project.herokuapp.com/message/send").get();
            if ( response != null) {
                result =  response.equals("true");
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return result;
    }
}
