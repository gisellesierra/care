package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.PatientQuestionResponse;
import com.isi.caremobile.entities.QuestionResponse;
import com.isi.caremobile.services.RequestPostObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
public class PatientQuestionResponseManager {
    /**
     {
     "id_question_follow_up": 1,
     "date_response": true,
     "id_question_response": 2
     }
     **/

    public static ArrayList<PatientQuestionResponse> postPatientQuestionResponse(ArrayList<PatientQuestionResponse> listInputData) {
        ArrayList<PatientQuestionResponse>  listpatientQuestionResponseOut = null;
        PatientQuestionResponse[] patientQuestionResponses = null;
        Map<String, String> patientQuestionResponse = new HashMap<>();
        if ( listInputData != null){
            for ( PatientQuestionResponse item: listInputData ){
                patientQuestionResponse.put("id_question_follow_up", String.valueOf(item.getId_question_follow_up()));
                patientQuestionResponse.put("id_question_response", String.valueOf(item.getId_question_response()));
                Date date =  item.getDate_response();
                //
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");
                String stDate = sdf.format(date);
                //
                patientQuestionResponse.put("date_response", stDate);
            }
        }
        //
        RequestPostObject task = new RequestPostObject(patientQuestionResponse);
        String response = "";
        try {
            response = task.execute("https://care-project.herokuapp.com/question/response").get();
            if ( response != null){
                Gson gson = new Gson();
                patientQuestionResponses = gson.fromJson(response, PatientQuestionResponse[].class);
                if (patientQuestionResponses != null) {
                    for (int i = 0; i < patientQuestionResponses.length; i++) {
                        listpatientQuestionResponseOut.add(patientQuestionResponses[i]);
                    }
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return listpatientQuestionResponseOut;
    }

}
