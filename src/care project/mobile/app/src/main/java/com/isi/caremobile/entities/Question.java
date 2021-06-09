package com.isi.caremobile.entities;
public class Question {


    private int id;
    private String question ;
    private Boolean is_boolean;
    private Boolean is_multiple_choice;
    private Boolean is_emoticon;
    private Boolean is_range;
    private int id_establishment;
    private Boolean is_extra;

    public Question() {

    }
    public Question(int id, String question, Boolean is_boolean, Boolean is_multiple_choice, Boolean is_emoticon, Boolean is_range, int id_establishment, Boolean is_extra) {
        this.id = id;
        this.question = question;
        this.is_boolean = is_boolean;
        this.is_multiple_choice = is_multiple_choice;
        this.is_emoticon = is_emoticon;
        this.is_range = is_range;
        this.id_establishment = id_establishment;
        this.is_extra = is_extra;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public Boolean getIs_boolean() {
        return is_boolean;
    }
    public void setIs_boolean(Boolean is_boolean) {
        this.is_boolean = is_boolean;
    }
    public Boolean getIs_multiple_choice() {
        return is_multiple_choice;
    }
    public void setIs_multiple_choice(Boolean is_multiple_choice) {
        this.is_multiple_choice = is_multiple_choice;
    }
    public Boolean getIs_emoticon() {
        return is_emoticon;
    }
    public void setIs_emoticon(Boolean is_emoticon) {
        this.is_emoticon = is_emoticon;
    }
    public Boolean getIs_range() {
        return is_range;
    }
    public void setIs_range(Boolean is_range) {
        this.is_range = is_range;
    }
    public int getId_establishment() {
        return id_establishment;
    }
    public void setId_establishment(int id_establishment) {
        this.id_establishment = id_establishment;
    }
    public Boolean getIs_extra() {
        return is_extra;
    }
    public void setIs_extra(Boolean is_extra) {
        this.is_extra = is_extra;
    }
}
