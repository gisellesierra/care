package com.isi.caremobile.entities;
public class ResponseItem {

    private int id;
    private String response;
    public ResponseItem(){

    }
    public ResponseItem(int id, String response) {
        this.id = id;
        this.response = response;
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
}
