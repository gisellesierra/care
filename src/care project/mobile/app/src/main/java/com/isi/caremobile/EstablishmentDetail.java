package com.isi.caremobile;
import android.content.Context;

import android.net.Uri;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.os.AsyncTask;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import com.google.gson.Gson;
import com.isi.caremobile.adapters.FollowUpAdapter;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.FollowUpManager;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
public class EstablishmentDetail extends Fragment {

    Context ctx;

    User user;
    Establishment establishment;

    ImageView logoEtablissementClique;
    TextView tv_nameEtablissement;
    TextView tv_Description;
    TextView tv_Address;
    TextView tv_Phone;
    TextView tv_Email;
    LinearLayout llnameEtablissement;
    LinearLayout lldetail;



    int positionFrag;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        ctx = container.getContext();

        String stuser = getArguments().getString("user");
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);
        //
        positionFrag = Integer.parseInt(getArguments().getString("position"));

        String stestablishment =   getArguments().getString("establishment");
        gson = new Gson();
        establishment = gson.fromJson(stestablishment, Establishment.class);


        View rootView = inflater.inflate(R.layout.fragment_establishment_detail,container,false);

        logoEtablissementClique =  rootView.findViewById(R.id.logoEtablissementClique);
        tv_nameEtablissement =  rootView.findViewById(R.id.tv_nameEtablissement);
        tv_Description =  rootView.findViewById(R.id.tv_Description);
        tv_Address =  rootView.findViewById(R.id.tv_Address);
        tv_Phone =  rootView.findViewById(R.id.tv_Phone);
        tv_Email =  rootView.findViewById(R.id.tv_Email);

        logoEtablissementClique =  rootView.findViewById(R.id.logoEtablissementClique);

        llnameEtablissement =  rootView.findViewById(R.id.llnameEtablissement);
        lldetail =  rootView.findViewById(R.id.lldetail);

        llnameEtablissement.setVisibility(View.INVISIBLE);
        lldetail.setVisibility(View.INVISIBLE);

        if (establishment != null) {
            //
            llnameEtablissement.setVisibility(View.VISIBLE);
            lldetail.setVisibility(View.VISIBLE);
            //
            tv_nameEtablissement.setText(establishment.getName());
            tv_Description.setText(establishment.getDescription());
            tv_Address.setText(establishment.getAdress());
            tv_Phone.setText(establishment.getPhone());
            tv_Email.setText(establishment.getemail());
            //
            //downloadFile(establishment.getLogo_url());
            new MyTask().execute();
        }

        return rootView;
    }


    private class MyTask extends AsyncTask<Void, Void, Void> {
        Bitmap loadedImage;
        @Override
        protected Void doInBackground(Void... voids) {
            URL imageUrl = null;
            try {
                imageUrl = new URL(establishment.getLogo_url());
                HttpURLConnection conn = (HttpURLConnection) imageUrl.openConnection();
                conn.connect();
                Bitmap loadedImage1 = BitmapFactory.decodeStream(conn.getInputStream());
                loadedImage = loadedImage1;
            } catch (IOException e){
                e.printStackTrace();
            }
            return null;
        }
        @Override
        protected void onPostExecute(Void aVoid) {
            if ( loadedImage != null){
                if ( loadedImage.getByteCount() != 0){
                    logoEtablissementClique.setImageBitmap(loadedImage);
                }
            }
            super.onPostExecute(aVoid);
        }
    }


}
