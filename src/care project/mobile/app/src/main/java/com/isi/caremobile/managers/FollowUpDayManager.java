package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.FollowUpDay;
import com.isi.caremobile.services.RequestGetObject;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
public class FollowUpDayManager {

    // {"id":23,"id_follow_up":5,"id_question":32,"amplitude_jour":1}

    public static ArrayList<FollowUpDay> getFollowUpDayByEstablishmentId(int userId){
        ArrayList<FollowUpDay> listFollowUpDay = new ArrayList();
        FollowUpDay[] followUpDay = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/question/follow-up-day/"+String.valueOf(userId)).get();

            if ( responseString != null) {
                Gson gson = new Gson();
                followUpDay = gson.fromJson(responseString, FollowUpDay[].class);
                if ( followUpDay != null){
                    // La variable 'followUpDay' est un tableau d'objets
                    // chaque élément de 'followUpDay', nous l'ajoutons à l'arraylist listFollowUpDay
                    for ( int i = 0;i < followUpDay.length;i++){
                        listFollowUpDay.add(followUpDay[i]);
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
        return listFollowUpDay;
    }


}
