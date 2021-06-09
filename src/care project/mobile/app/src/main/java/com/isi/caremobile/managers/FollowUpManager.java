package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.FollowUp;
import com.isi.caremobile.entities.QuestionnaireAnswers;
import com.isi.caremobile.services.RequestGetObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.ExecutionException;
public class FollowUpManager {

    public static ArrayList<FollowUp> getUserSuiviByEtablissement(int userId, int establishmentId){
        ArrayList<FollowUp> listFollowUp = new ArrayList();
        FollowUp[] followUps = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/medical-follow-up/"+String.valueOf(userId) + "/" + String.valueOf(establishmentId)).get();
            if ( responseString != null) {
                Gson gson = new Gson();
                followUps = gson.fromJson(responseString, FollowUp[].class);
                if ( followUps != null){
                    for ( int i = 0;i < followUps.length;i++){
                        listFollowUp.add(followUps[i]);
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
        return listFollowUp;
    }



}
