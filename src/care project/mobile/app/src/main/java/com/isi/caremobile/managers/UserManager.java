package com.isi.caremobile.managers;
import android.content.Context;


import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.services.FileManager;
import com.isi.caremobile.services.RequestGetObject;
import com.isi.caremobile.services.RequestPostObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
/**
 * User data management
 */
public class UserManager {
    /**
     * Read and Validate an user with Email and Password
     * @param email : Email to validate
     * @param password : Password to validate
     * @return : An User object with data if is an valid user. Otherwise return an null User Object.
     */
    public static User checkUser(String email, String password) {
        User userRetour = null;
        User[] users = null;
        Map<String, String> user = new HashMap<>();
        user.put("email", email);
        user.put("password", password);
        //
        RequestPostObject task = new RequestPostObject(user);
        String response = "";
        try {
            response = task.execute("https://care-project.herokuapp.com/user/login").get();
            if ( response != null) {
                Gson gson = new Gson();
                users = gson.fromJson(response, User[].class);
                if ( users != null) {
                    userRetour = users[0];
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return userRetour;
    }

    public static Boolean updateUser(User userData) {
        Boolean result = false;
        Map<String, String> user = new HashMap<>();
        user.put("id", String.valueOf(userData.getId()));
        user.put("lastName", userData.getLastName());
        user.put("firstName", userData.getFirstName());
        Date date =  userData.getDate_of_birth();
        //
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");
        String stDate = sdf.format(date);
        //
        user.put("date_of_birth", stDate);
        user.put("phone", userData.getPhone());
        user.put("email", userData.getEmail());
        user.put("id_sexe", String.valueOf(userData.getId_sexe()));
        //
        RequestPostObject task = new RequestPostObject(user);
        String response = "";
        try {
            response = task.execute("https://care-project.herokuapp.com/user/subscribe").get();
            response = task.execute("https://care-project.herokuapp.com/user/verify").get();
            if ( response != null) {
                result =  response.equals("true");
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return result;
    }
    //

    /**
     * Get an user by Id
     *
     * @param Id : Id to validate
     * @return : An User object with data if is an valid user. Otherwise return an null User Object.
     */
    public static User getUserById(int Id){
        User[] users = null;
        User user = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/user/"+String.valueOf(Id) ).get();
            if ( responseString != null) {
                Gson gson = new Gson();
                users = gson.fromJson(responseString, User[].class);
                if ( users != null) {
                    user = users[0];
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return user;
    }


    /**
     * Get all users
     * @return
     * ArrayList from User Object
     */
    public static ArrayList<User> getAllUsers(){
        ArrayList<User> listUser = new ArrayList();
        User[] users = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/user/").get();
            if ( responseString != null) {
                Gson gson = new Gson();
                users = gson.fromJson(responseString, User[].class);
                if ( users != null) {
                    for ( int i =  0 ; i < users.length;i++){
                        listUser.add(users[i]);
                    }
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return listUser;
    }


    public static User verifyUserAccessCode(String email, String accessCode) {
        User userRetour = null;
        User[] users = null;
        Map<String, String> user = new HashMap<>();
        user.put("email", email);
        user.put("access_code", accessCode);
        //
        RequestPostObject task = new RequestPostObject(user);
        String response = "";
        try {
            response = task.execute("https://care-project.herokuapp.com/user/verify").get();
            if ( response != null) {
                Gson gson = new Gson();
                users = gson.fromJson(response, User[].class);
                if ( users != null) {
                    userRetour = users[0];
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return userRetour;
    }


}
