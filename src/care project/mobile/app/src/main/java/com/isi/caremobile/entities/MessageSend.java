package com.isi.caremobile.entities;

public class MessageSend {

    private String contenu ;
    private int id_follow_up;
    private int id_user ;

    public MessageSend(){

    }
    public MessageSend(String contenu, int id_follow_up, int id_user) {


        this.contenu = contenu;
        this.id_follow_up = id_follow_up;
        this.id_user = id_user;
    }


    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public int getId_follow_up() {
        return id_follow_up;
    }

    public void setId_follow_up(int id_follow_up) {
        this.id_follow_up = id_follow_up;
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }


}
