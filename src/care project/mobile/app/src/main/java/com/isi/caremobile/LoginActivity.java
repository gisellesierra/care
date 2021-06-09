package com.isi.caremobile;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.EstablishmentManager;
import com.isi.caremobile.managers.UserManager;
public class LoginActivity extends AppCompatActivity {


    Button btnSingIn , btnSignUp;
    Context ctx;
    EditText inputEmail;
    EditText inputPassword;
    TextView messageText;
    User[] user;

    @Override
    protected void onResume() {
        super.onResume();
        inputEmail.setText("");
        inputPassword.setText("");
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Read Preferences
        SharedPreferences sharedPref = getSharedPreferences("Care_Preferences",Context.MODE_PRIVATE);
        String stId = sharedPref.getString("idUser","");
        if ( stId == null) stId = "";
        if ( stId.length() > 0 ){
            User user = UserManager.getUserById(Integer.parseInt(stId));
            // redirect to MainActivity
            Intent intent = new Intent(ctx, Home.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY) ; //  | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            Gson gson = new Gson();
            String JSON = gson.toJson(user);
            intent.putExtra("user", JSON);
            startActivity(intent);
        }

         ctx = this;
        btnSingIn = (Button) findViewById(R.id.btnSingIn);
        btnSignUp =  (Button) findViewById(R.id.btnSignUp);
        inputEmail = (EditText) findViewById(R.id.inputEmail);
        inputPassword = (EditText) findViewById(R.id.inputPassword);
        messageText= (TextView) findViewById(R.id.messageText);
        //
        inputEmail.setText("");
        inputPassword.setText("");
        //
        btnSignUp = findViewById(R.id.btnSignUp);
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // redirect to InscriptionActivity
                Intent intent = new Intent(ctx, SuiteInscription.class);
                startActivity(intent);
            }
        });
        
        inputEmail = (EditText) findViewById(R.id.inputEmail);
        inputPassword = (EditText) findViewById(R.id.inputPassword);
        messageText= (TextView) findViewById(R.id.messageText);
        //
        btnSingIn = (Button) findViewById(R.id.btnSingIn);
        //


        btnSingIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                messageText.setVisibility(View.INVISIBLE);
                User oneUser = new User();
                // Web Service Login
                User user = UserManager.checkUser(String.valueOf(inputEmail.getText()),String.valueOf(inputPassword.getText()));
                if ( user != null) {
                    // Sets this UserId to Read Data
                     //user.setId(182);
                }
                if ( user == null){
                    messageText.setText("Invalid email or password");
                    messageText.setVisibility(View.VISIBLE);
                }
                else {
                    // Set Preferenrces with the user logged in
                    SharedPreferences sharedPre = getSharedPreferences("Care_Preferences",Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPre.edit();
                    editor.putString("iduser", String.valueOf(user.getId()));
                    editor.commit();
                    //
                    // redirect to MainActivity
                    Intent intent = new Intent(ctx, Home.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY) ; //  | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    Gson gson = new Gson();
                    String JSON = gson.toJson(user);
                    intent.putExtra("user", JSON);
                    startActivity(intent);
                }

            }
        });


    }
}