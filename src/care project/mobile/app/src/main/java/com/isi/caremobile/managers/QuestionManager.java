package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Question;
import com.isi.caremobile.services.RequestGetObject;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
public class QuestionManager {
    //{"id":3,"question":"Ressentez-vous de la douleur?","is_boolean":false
    // // ,"is_multiple_choice":true
    // //,"is_emoticon":false,"is_range":false,"id_establishment":24,"is_extra":false}


    public static ArrayList<Question> getQuestionById(int questionId){
        ArrayList<Question> listQuestion = new ArrayList();
        Question[]  question = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/question/"+String.valueOf(questionId)).get();

            if ( responseString != null) {
                Gson gson = new Gson();
                question = gson.fromJson(responseString, Question[].class);
                if ( question != null){
                    // La variable 'followUpDay' es un arreglo de objetos
                    // cada elemento de 'followUpDay', lo adicionamamos al arraylist listFollowUpDay
                    for ( int i = 0;i < question.length;i++){
                        listQuestion.add(question[i]);
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
        return listQuestion;
    }


}
