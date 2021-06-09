package com.isi.caremobile.managers;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.Service;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.services.RequestGetObject;

import java.util.concurrent.ExecutionException;
public class ServiceManager {


    public static Service getServiceById(int serviceId){
        Service[] services = null;
        Service service = null;
        RequestGetObject requestGetObject = new RequestGetObject();
        try {
            String responseString = requestGetObject.execute("https://care-project.herokuapp.com/service/"+String.valueOf(serviceId) ).get();
            if ( responseString != null) {
                Gson gson = new Gson();
                services = gson.fromJson(responseString, Service[].class);
                if ( services != null) {
                    service = services[0];
                }
            }
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return service;
    }


}
