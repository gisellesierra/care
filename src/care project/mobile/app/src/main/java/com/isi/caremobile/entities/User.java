package com.isi.caremobile.entities;
import java.util.Date;
/**
 * User Entitie
 */
public class User {

    private int id;
    private String firstName;
    private String lastName;
    private Date date_of_birth;
    private String phone;
    private String email;
    private String password;
    private boolean is_actif;
    private Date creation_date_account;
    private int id_role;
    private int id_sexe;
    private int access_code;
    private Date last_date_connected;
    private String poste;

    public User(){

    }

    public User(int id, String lastName, String firstName, Date date_of_birth, String phone, String email, String password,
                boolean is_actif, Date creation_date_account, int id_role, int id_sexe, int access_code, Date last_date_connected, String poste) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.date_of_birth = date_of_birth;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.is_actif = is_actif;
        this.creation_date_account = creation_date_account;
        this.id_role = id_role;
        this.id_sexe = id_sexe;
        this.access_code = access_code;
        this.last_date_connected = last_date_connected;
        this.poste = poste;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public Date getDate_of_birth() {
        return date_of_birth;
    }
    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isIs_actif() {
        return is_actif;
    }
    public void setIs_actif(boolean is_actif) {
        this.is_actif = is_actif;
    }
    public Date getCreation_date_account() {
        return creation_date_account;
    }
    public void setCreation_date_account(Date creation_date_account) {
        this.creation_date_account = creation_date_account;
    }
    public int getId_role() {
        return id_role;
    }
    public void setId_role(int id_role) {
        this.id_role = id_role;
    }
    public int getId_sexe() {
        return id_sexe;
    }
    public void setId_sexe(int id_sexe) {
        this.id_sexe = id_sexe;
    }
    public int getAccess_code() {
        return access_code;
    }
    public void setAccess_code(int access_code) {
        this.access_code = access_code;
    }
    public Date getLast_date_connected() {
        return last_date_connected;
    }
    public void setLast_date_connected(Date last_date_connected) {
        this.last_date_connected = last_date_connected;
    }
    public String getPoste() {
        return poste;
    }
    public void setPoste(String poste) {
        this.poste = poste;
    }
}
