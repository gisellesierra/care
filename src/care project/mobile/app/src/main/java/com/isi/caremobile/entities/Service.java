package com.isi.caremobile.entities;
/**
 * Defines Service entity
 */
public class Service {

    private int id;
    private String  description;
    private int id_etablishment;


    public Service(){

    }


    public Service(int id, String description, int id_etablishment) {
        this.id = id;
        this.description = description;
        this.id_etablishment = id_etablishment;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getId_etablishment() {
        return id_etablishment;
    }
    public void setId_etablishment(int id_etablishment) {
        this.id_etablishment = id_etablishment;
    }
}
