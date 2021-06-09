package com.isi.caremobile;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
//import androidx.fragment.app.Fragment;
//import androidx.fragment.app.FragmentTransaction;


import android.app.Activity;

import android.app.FragmentTransaction;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.google.gson.Gson;
import com.isi.caremobile.adapters.EstablishmentAdapter;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.EstablishmentManager;




public class EstablishmentListActivity extends Activity {

    ListView listView;
    Context ctx;

    User user;
    //
    int positionFrag;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_establishment_list);

        ctx = this;

        Intent infIntent = getIntent();
        String stuser = infIntent.getStringExtra("user");
        //
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);

        listView = findViewById(R.id.listEstablishments);
        EstablishmentAdapter establishmentAdapter = new EstablishmentAdapter(ctx, R.layout.establishment_layout,EstablishmentManager.getEtablissementByUserId(user.getId()));
        listView.setAdapter(establishmentAdapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //
                Establishment establishment = (Establishment) parent.getItemAtPosition(position);
                // Set Preferenrces with the establishmentyt selected
                SharedPreferences sharedPre = getSharedPreferences("Care_Preferences",Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPre.edit();
                editor.putString("idEstablishment", String.valueOf(establishment.getId()));
                editor.commit();
                // redirect to MainActivity
                Intent intent = new Intent(ctx, Home.class);
                Gson gson = new Gson();
                String JSON = gson.toJson(user);
                intent.putExtra("user", JSON);
                //
                JSON = gson.toJson(establishment);
                intent.putExtra("establishment", JSON);
                startActivity(intent);
            }
        });
    }
//    //action bar
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return true;
    }

}