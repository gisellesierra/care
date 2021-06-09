package com.isi.caremobile.entities;
import java.util.ArrayList;
public class ResponseQuestionnaire {


    private int id_question_follow_up ;
    private String rangeValue;
    private int id_question_response;

    private ArrayList responses ;

    public ResponseQuestionnaire(){
        responses = new ArrayList<ResponseItem>();
    }

    public ResponseQuestionnaire(int id_question_follow_up, String rangeValue, int id_question_response , ArrayList<ResponseItem>  reponseItem) {
        this.id_question_follow_up = id_question_follow_up;
        this.rangeValue = rangeValue;
        this.id_question_response = id_question_response;
        this. responses = reponseItem;
    }
    public int getId_question_follow_up() {
        return id_question_follow_up;
    }
    public void setId_question_follow_up(int id_question_follow_up) {
        this.id_question_follow_up = id_question_follow_up;
    }
    public String getRangeValue() {
        return rangeValue;
    }
    public void setRangeValue(String rangeValue) {
        this.rangeValue = rangeValue;
    }
    public int getId_question_response() {
        return id_question_response;
    }
    public void setId_question_response(int id_question_response) {
        this.id_question_response = id_question_response;
    }
    public ArrayList getResponses() {
        return responses;
    }
    public void setResponses(ArrayList responses) {
        this.responses = responses;
    }
}
