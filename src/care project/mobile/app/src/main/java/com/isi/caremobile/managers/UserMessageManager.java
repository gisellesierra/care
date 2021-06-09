package com.isi.caremobile.managers;
import android.content.Context;

import com.isi.caremobile.entities.User;
import com.isi.caremobile.entities.UserMessage;

import java.util.ArrayList;
public class UserMessageManager {


    public static ArrayList<UserMessage> getMessageByFollowUpId(int followUpId){
        ArrayList<UserMessage> listUserMessage = new ArrayList();
        try{
            User user = new User();
            user.setId(5);
            user.setFirstName("alex");

            UserMessage  userMessage = new UserMessage( "Primer mensaje",user,"2021-04-04 08:55");
            //
            listUserMessage.add(userMessage);
            //
            user = new User();
            user.setId(3);
            user.setFirstName("Frank");
            userMessage = new UserMessage( "segundo mensaje",user,"2021-04-04 09:00");
            //
            listUserMessage.add(userMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return listUserMessage;
    }

    public static UserMessage addUserMessage(Context context, UserMessage userMessage) {
        try {
            //

            //
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userMessage;
    }

}