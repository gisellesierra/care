package com.isi.caremobile;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;


import com.google.gson.Gson;

import com.isi.caremobile.adapters.FollowUpAdapter;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.QuestionnaireAnswers;
import com.isi.caremobile.entities.Service;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.EstablishmentManager;
import com.isi.caremobile.managers.FollowUpManager;
import com.isi.caremobile.managers.ServiceManager;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.ArrayList;
public class FollowUp extends Fragment {

    RelativeLayout footer;
    Button btn_add_newFollowUp;
    ListView listView;
    ListView listViewTreatments;
    Context ctx;
    TextView tv_nameEtablissement;
    LinearLayout llEstablishmentName;
    ImageView logoEtablissementClique;

    User user;
    Establishment establishment;
    //
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
        String stestablishment = getArguments().getString("establishment");
        gson = new Gson();
        establishment = gson.fromJson(stestablishment, Establishment.class);
        if (establishment == null) {
            // Read Preferences
            SharedPreferences sharedPref = getActivity().getSharedPreferences("Care_Preferences", getActivity().MODE_PRIVATE);
            String stId = sharedPref.getString("idEstablishment","");
            if ( stId == null) stId = "";
            if ( stId.length() > 0 ){
                ArrayList<Establishment> listEstablishmentAux = EstablishmentManager.getEtablissementByUserId(user.getId());
                if ( listEstablishmentAux != null){
                    for ( Establishment item : listEstablishmentAux){
                        if ( item.getId() == Integer.parseInt(stId)){
                            establishment = item;
                            break;
                        }
                    }
                }
            }
            else{
                establishment = new Establishment();
            }
        }
        //

        View rootView = inflater.inflate(R.layout.fragment_list_follow_up_establishment,container,false);

        logoEtablissementClique=  rootView.findViewById(R.id.logoEtablissementClique);

        tv_nameEtablissement =  rootView.findViewById(R.id.tv_nameEtablissement);
        //
        tv_nameEtablissement.setText(establishment.getName());
        //
        listView = rootView.findViewById(R.id.listEstablishments);
        btn_add_newFollowUp= rootView.findViewById(R.id.btn_add_newFollowUp);
        //


        FollowUpAdapter followUpAdapter = new FollowUpAdapter(ctx, R.layout.follow_up_layout, FollowUpManager.getUserSuiviByEtablissement(user.getId(),establishment.getId()));
        //
        listView.setAdapter(followUpAdapter);
        llEstablishmentName = rootView.findViewById(R.id.llEstablishmentName);
        if ( establishment.getId() == 0 )
        {
            llEstablishmentName.setVisibility(View.INVISIBLE);
            listView.setVisibility(View.INVISIBLE);
        }
        else{
            new MyTask().execute();
        }


        btn_add_newFollowUp.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //
                if ( establishment.getId() == 0 ){
                    AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                    builder.setTitle("Atention");
                    builder.setMessage("You must select an establishment");
                    builder.setPositiveButton("OK", null);
                    AlertDialog dialog = builder.create();
                    dialog.show();
                }
                else {
                    AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                    builder.setTitle("Daily Form");
                    builder.setMessage("Daily form 1");
                    //Yes Button
                    builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //
                            Intent intent1 = new Intent(ctx, FormOneActivity.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY); // .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);;
                            Gson gson = new Gson();
                            String JSON = gson.toJson(user);
                            intent1.putExtra("user", JSON);
                            //
                            JSON = gson.toJson(establishment);
                            intent1.putExtra("establishment", JSON);
                            startActivity(intent1);
                        }
                    });
                    AlertDialog dialog = builder.create();
                    dialog.show();
                }
            }
        });


        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //
                com.isi.caremobile.entities.FollowUp followUpDetail = (com.isi.caremobile.entities.FollowUp) parent.getItemAtPosition(position);
                Service service = ServiceManager.getServiceById(followUpDetail.getId_service());
                //
                String message = "Service : " + service.getDescription();
                message += "\r\n" + "Treatment description : "  + followUpDetail.getTreatment_description();
                AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                builder.setTitle("FollowUp Information");
                builder.setMessage(message);
                builder.setPositiveButton("Ok",null);
                builder.show();

            }
        });

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


