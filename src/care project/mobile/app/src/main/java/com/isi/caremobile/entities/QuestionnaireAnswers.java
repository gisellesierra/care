package com.isi.caremobile.entities;
public class QuestionnaireAnswers {

    private int id;
    private String response;
    private int id_question;
    private int id_questionnarie;
    private String question;


    public QuestionnaireAnswers() {
    }

    public QuestionnaireAnswers(int id, String response, int id_question, int id_questionnarie , String question) {
        this.id = id;
        this.response = response;
        this.id_question = id_question;
        this.id_questionnarie = id_questionnarie;
        this.question = question;
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
    public int getId_questionnarie() {
        return id_questionnarie;
    }
    public void setId_questionnarie(int id_questionnarie) {
        this.id_questionnarie = id_questionnarie;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
}
