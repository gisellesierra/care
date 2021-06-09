package com.isi.caremobile.entities;
/**
 * Defines the Etablissement, entitie
 **/
public class Establishment {

    private int id;
    private String name;
    private String description;
    private String logo_url;
    private String phone;
    private String email;
    private String adress;


    public Establishment(){

    }


    public Establishment(int id, String name, String description, String logo_url, String phone, String email, String adress) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo_url = logo_url;
        this.phone = phone;
        this.email = email;
        this.adress = adress;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getLogo_url() {
        return logo_url;
    }
    public void setLogo_url(String logo_url) {
        this.logo_url = logo_url;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getemail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAdress() {
        return adress;
    }
    public void setAdress(String adress) {
        this.adress = adress;
    }
}
