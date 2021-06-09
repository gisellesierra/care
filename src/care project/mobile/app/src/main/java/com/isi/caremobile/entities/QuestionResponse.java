package com.isi.caremobile.entities;
public class QuestionResponse {



    private int id;
    private String response;
    private int id_question;

    public QuestionResponse( ) {

    }

    public QuestionResponse(int id, String response, int id_question) {
        this.id = id;
        this.response = response;
        this.id_question = id_question;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getResponse() {
        return response;
    }
    public void setResponse(String response) {
        this.response = response;
    }
    public int getId_question() {
        return id_question;
    }
    public void setId_question(int id_question) {
        this.id_question = id_question;
    }
}
