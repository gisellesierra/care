package com.isi.caremobile.entities;
public class FollowUpQuestionnaire {

    private int id;
    private int id_questionnaire;
    private int id_followUp;
    public FollowUpQuestionnaire() {
    }
    public FollowUpQuestionnaire(int id, int id_questionnaire, int id_followUp) {
        this.id = id;
        this.id_questionnaire = id_questionnaire;
        this.id_followUp = id_followUp;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getId_questionnaire() {
        return id_questionnaire;
    }
    public void setId_questionnaire(int id_questionnaire) {
        this.id_questionnaire = id_questionnaire;
    }
    public int getId_followUp() {
        return id_followUp;
    }
    public void setId_followUp(int id_followUp) {
        this.id_followUp = id_followUp;
    }
}

