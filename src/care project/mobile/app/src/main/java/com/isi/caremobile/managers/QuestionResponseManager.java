package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Question;
import com.isi.caremobile.entities.QuestionResponse;
import com.isi.caremobile.services.RequestGetObject;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
public class QuestionResponseManager {

    //[{"id":40,"response":"OUi","id_question":37},{"id":41,"response":"Non","id_question":37}]

    public static ArrayList<QuestionResponse> getQuestionResponseByQuerionId(int questionId){
        ArrayList<QuestionResponse> listQuestionResponse = new ArrayList();
        QuestionResponse[]  questionResponse = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/question/responses/"+String.valueOf(questionId)).get();

            if ( responseString != null) {
                Gson gson = new Gson();
                questionResponse = gson.fromJson(responseString, QuestionResponse[].class);
                if ( questionResponse != null){
                    // La variable 'followUpDay' es un arreglo de objetos
                    // cada elemento de 'followUpDay', lo adicionamamos al arraylist listFollowUpDay
                    for ( int i = 0;i < questionResponse.length;i++){
                        listQuestionResponse.add(questionResponse[i]);
                    }
                }
                //
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listQuestionResponse;
    }



}
