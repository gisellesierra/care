package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.ResponseQuestionnaire;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.services.RequestPostObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
public class ResponseQuestionnaireManager {


    public static ArrayList<ResponseQuestionnaire> postResponseQuestionnaire(ArrayList<ResponseQuestionnaire> listResponseQuestionnaireIn) {
        ArrayList<ResponseQuestionnaire> listResponseQuestionnaireOut = new ArrayList();
        ResponseQuestionnaire[] responsesQuestionnaire = null;
        //
        Gson gson = new Gson();
        try {
            // Convert listResponseQuestionnaireIn to JSON
            //-->> JSONArray jsArray = new JSONArray(listResponseQuestionnaireIn);
            //-->>JSONObject postData = jsArray.toJSONObject(jsArray);
            JSONArray jsArray = new JSONArray();
            for ( ResponseQuestionnaire item : listResponseQuestionnaireIn){
                JSONObject object = new JSONObject();
                object.put("id_question_follow_up", item.getId_question_follow_up());
                object.put("rangeValue" , item.getRangeValue());
                object.put("id_question_response" , item.getId_question_response());
                jsArray.put(object);
            }
            //String strResponse = jsArray.toString();
            //JSONObject postData = new JSONObject(strResponse);
            //JSONObject postData = jsArray.toJSONObject(jsArray);
            //JSONObject postData = jsArray.getJSONObject(0);
            //JSONArray jsonArray = new JSONArray(strResponse);
            //JSONObject postData = jsonArray.getJSONObject(0);
            //
            RequestPostObject task = new RequestPostObject(jsArray);
            String response = "";
            response = task.execute("https://care-project.herokuapp.com/question/response").get();
            if (response != null) {
                responsesQuestionnaire = gson.fromJson(response, ResponseQuestionnaire[].class);
                if (responsesQuestionnaire != null) {
                    for (int i = 0; i < responsesQuestionnaire.length; i++) {
                        listResponseQuestionnaireOut.add(responsesQuestionnaire[i]);
                    }
                }
            }
        } catch (  JSONException e){
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return listResponseQuestionnaireOut;
    }

}
