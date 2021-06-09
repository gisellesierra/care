package com.isi.caremobile.entities;
import java.util.Date;
public class Message {

    private int id;
    private String contenu;
    private Boolean is_img;
    private Boolean is_video;
    private Date date_time;
    private int id_user;
    private int id_follow_up;

    public Message(){

    }


    public Message(int id, String contenu, Boolean is_img, Boolean is_video, Date date_time, int id_user, int id_follow_up) {
        this.id = id;
        this.contenu = contenu;
        this.is_img = is_img;
        this.is_video = is_video;
        this.date_time = date_time;
        this.id_user = id_user;
        this.id_follow_up = id_follow_up;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getContenu() {
        return contenu;
    }
    public void setContenu(String contenu) {
        this.contenu = contenu;
    }
    public Boolean getIs_img() {
        return is_img;
    }
    public void setIs_img(Boolean is_img) {
        this.is_img = is_img;
    }
    public Boolean getIs_video() {
        return is_video;
    }
    public void setIs_video(Boolean is_video) {
        this.is_video = is_video;
    }
    public Date getDate_time() {
        return date_time;
    }
    public void setDate_time(Date date_time) {
        this.date_time = date_time;
    }
    public int getId_user() {
        return id_user;
    }
    public void setId_user(int id_user) {
        this.id_user = id_user;
    }
    public int getId_follow_up() {
        return id_follow_up;
    }
    public void setId_follow_up(int id_follow_up) {
        this.id_follow_up = id_follow_up;
    }
}
