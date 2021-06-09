package com.isi.caremobile.entities;
public class FollowUpDay {



    private int id ;
    private int id_follow_up;
    private int id_question;
    private int amplitude_jour;

    public FollowUpDay(){

    }


    public FollowUpDay(int id, int id_follow_up, int id_question, int amplitude_jour) {
        this.id = id;
        this.id_follow_up = id_follow_up;
        this.id_question = id_question;
        this.amplitude_jour = amplitude_jour;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getId_follow_up() {
        return id_follow_up;
    }
    public void setId_follow_up(int id_follow_up) {
        this.id_follow_up = id_follow_up;
    }
    public int getId_question() {
        return id_question;
    }
    public void setId_question(int id_question) {
        this.id_question = id_question;
    }
    public int getAmplitude_jour() {
        return amplitude_jour;
    }
    public void setAmplitude_jour(int amplitude_jour) {
        this.amplitude_jour = amplitude_jour;
    }
}
