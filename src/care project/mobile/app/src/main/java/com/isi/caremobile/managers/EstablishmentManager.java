package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.services.RequestGetObject;

import org.jetbrains.annotations.NotNull;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
public class EstablishmentManager {

    @NotNull
    public static ArrayList<Establishment> getEtablissementByUserId(int userId){
        ArrayList<Establishment> listEstablishment = new ArrayList();
        Establishment[] establishments = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/establishment/"+String.valueOf(userId)).get();
            if ( responseString != null) {
                Gson gson = new Gson();
                establishments = gson.fromJson(responseString, Establishment[].class);
                if ( establishments != null){

                    // La variable 'establishments' es un arreglo de objetos
                    // cada elemento de 'establishments', lo adicionamamos al arraylist listEstablishment
                    for ( int i = 0;i < establishments.length;i++){
                        listEstablishment.add(establishments[i]);
                    }
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listEstablishment;
    }


//    public static Establishment getEstablishmentById(int Id){
//        Establishment establishment = null;
//        RequestGetObject requestGetObject = new RequestGetObject();
//        try {
//            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/establishment/"+String.valueOf(Id) +"}").get();
//            if ( responseString != null) {
//                Gson gson = new Gson();
//                establishment = gson.fromJson(responseString, Establishment.class);
//            }
//        } catch (ExecutionException e) {
//            e.printStackTrace();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        return establishment;
//    }

}


