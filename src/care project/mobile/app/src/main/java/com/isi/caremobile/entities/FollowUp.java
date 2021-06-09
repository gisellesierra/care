package com.isi.caremobile.entities;
import java.util.Date;
public class FollowUp {

    private int id;
    private int id_user;
    private boolean is_actif;
    private Date date_started;
    private int id_service;
    private String treatment_description;
    private Boolean is_active_chat;



    public FollowUp() {
    }
    public FollowUp(int id, int id_user, boolean is_actif, Date date_started, int id_service, String treatment_description, Boolean is_active_chat) {
        this.id = id;
        this.id_user = id_user;
        this.is_actif = is_actif;
        this.date_started = date_started;
        this.id_service = id_service;
        this.treatment_description = treatment_description;
        this.is_active_chat = is_active_chat;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getId_user() {
        return id_user;
    }
    public void setId_user(int id_user) {
        this.id_user = id_user;
    }
    public boolean isIs_actif() {
        return is_actif;
    }
    public void setIs_actif(boolean is_actif) {
        this.is_actif = is_actif;
    }
    public Date getDate_started() {
        return date_started;
    }
    public void setDate_started(Date date_started) {
        this.date_started = date_started;
    }
    public int getId_service() {
        return id_service;
    }
    public void setId_service(int id_service) {
        this.id_service = id_service;
    }
    public String getTreatment_description() {
        return treatment_description;
    }
    public void setTreatment_description(String treatment_description) {
        this.treatment_description = treatment_description;
    }
    public Boolean getIs_active_chat() {
        return is_active_chat;
    }
    public void setIs_active_chat(Boolean is_active_chat) {
        this.is_active_chat = is_active_chat;
    }
}
