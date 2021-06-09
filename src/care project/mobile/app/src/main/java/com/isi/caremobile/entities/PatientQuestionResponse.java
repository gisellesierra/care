package com.isi.caremobile.entities;
import java.util.Date;
public class PatientQuestionResponse {

    private int id_question_follow_up;
    private Date date_response;
    private int id_question_response;

    public PatientQuestionResponse(){

    }


    public PatientQuestionResponse(int id_question_follow_up, Date date_response, int id_question_response) {
        this.id_question_follow_up = id_question_follow_up;
        this.date_response = date_response;
        this.id_question_response = id_question_response;
    }

    public int getId_question_follow_up() {
        return id_question_follow_up;
    }
    public void setId_question_follow_up(int id_question_follow_up) {
        this.id_question_follow_up = id_question_follow_up;
    }
    public Date getDate_response() {
        return date_response;
    }
    public void setDate_response(Date date_response) {
        this.date_response = date_response;
    }
    public int getId_question_response() {
        return id_question_response;
    }
    public void setId_question_response(int id_question_response) {
        this.id_question_response = id_question_response;
    }
}
