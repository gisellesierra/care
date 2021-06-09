package com.isi.caremobile;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.QuestionnaireAnswers;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.ui.main.SectionsPagerAdapter;
public class Home extends AppCompatActivity {

    User user;
    Establishment establishment;
    Context ctx;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        ctx = this;
        Intent infIntent = getIntent();
        String stuser = infIntent.getStringExtra("user");
        //
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);
        //
        stuser = infIntent.getStringExtra("establishment");
        //
        establishment = gson.fromJson(stuser, Establishment.class);
        //
        SectionsPagerAdapter sectionsPagerAdapter = new SectionsPagerAdapter(this, getSupportFragmentManager(),user, establishment);
        ViewPager viewPager = findViewById(R.id.view_pager);
        viewPager.setAdapter(sectionsPagerAdapter);
        TabLayout tabs = findViewById(R.id.tabs);
        tabs.setTabTextColors(Color.parseColor("#000000"), Color.parseColor("#FFFFFF"));
        //tabs.setBackgroundColor(Color.parseColor("#727272"));
        tabs.setupWithViewPager(viewPager);
    }

    //action bar
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.option1:
                //add function
                Intent intent = new Intent(ctx, MyProfilActivity.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY); // .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);;
                Gson gson = new Gson();
                String JSON = gson.toJson(user);
                intent.putExtra("user", JSON);
                startActivity(intent);
                return true;
            case R.id.option2:
                //add function
                Intent intent2 = new Intent(ctx, EstablishmentListActivity.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY); // ; .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);;
                Gson gson2 = new Gson();
                String JSON2 = gson2.toJson(user);
                intent2.putExtra("user", JSON2);
                startActivity(intent2);
                return true;
            case R.id.option3:
                //add function
                AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                builder.setTitle("Atention");
                builder.setMessage("Do you really want to exit app ? ");

                //Yes Button
                builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // Set Preferences with the empty values
                        SharedPreferences sharedPre = getSharedPreferences("Care_Preferences",Context.MODE_PRIVATE);
                        SharedPreferences.Editor editor = sharedPre.edit();
                        editor.remove("idEstablishment");
                        editor.remove("iduser");
                        editor.commit();
                        Intent intent1 = new Intent(ctx, LoginActivity.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY); // .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        startActivity(intent1);
                    }
                });

                //No Button
                builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        //
                    }
                });
                AlertDialog alertDialog = builder.create();
                alertDialog.show();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}