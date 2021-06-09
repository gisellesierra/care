package com.isi.caremobile;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.UserManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
public class MyProfilActivity extends AppCompatActivity {

    User user;
    Context ctx;

    Button btn_backModification;
    Button btnSaveModification;

    EditText edFirstname;
    EditText edLastName;
    EditText edEmail;
    EditText ed_date;
    EditText ed_phone;

    TextView firstNameError;
    TextView lastNameError;
    TextView emailError;
    TextView dateError;
    TextView phoneError;

    boolean isLastNameValid, isFirstNameValid, isEmailValid ,  isPhoneValid, isDateValid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_profil);

        ctx = this;

        Intent infIntent = getIntent();
        String stuser = infIntent.getStringExtra("user");
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);

        btn_backModification = findViewById(R.id.btn_backModification);
        btnSaveModification = findViewById(R.id.btnSaveModification);
        //
        edFirstname = findViewById(R.id.edFirstname);
        edLastName = findViewById(R.id.edLastName);
        edEmail = findViewById(R.id.edEmail);
        ed_date= findViewById(R.id.ed_date);
        ed_phone = findViewById(R.id.ed_phone);
        //
        firstNameError = findViewById(R.id.firstNameError);
        lastNameError = findViewById(R.id.lastNameError);
        emailError = findViewById(R.id.emailError);
        dateError = findViewById(R.id.dateError);
        phoneError = findViewById(R.id.phoneError);

        edFirstname.setText(user.getFirstName());
        edLastName.setText(user.getLastName());
        edEmail.setText(user.getEmail());
        //
        if ( user.getDate_of_birth() != null) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
            Date userDateOfBirth = new Date();
            String strDate = simpleDateFormat.format(user.getDate_of_birth());
            ed_date.setText(strDate);
        }


        ed_phone.setText(user.getPhone());


        btn_backModification.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // redirect to MainActivity
                Intent intent = new Intent(ctx, Home.class);
                Gson gson = new Gson();
                String JSON = gson.toJson(user);
                intent.putExtra("user", JSON);
                startActivity(intent);
            }
        });

        btnSaveModification.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Save Data
                SetValidation();
            }
        });


    }

    //pour les validations du formulaire inscription
    public void SetValidation() {
        // Check for a valid lastname.
        if (edLastName.getText().toString().isEmpty()) {
            lastNameError.setText(getResources().getString(R.string.lastname_error));
            isLastNameValid = false;
        } else {
            lastNameError.setText("");
            isLastNameValid = true;
        }
        // Check for a valid firstname.
        if (edFirstname.getText().toString().isEmpty()) {
            firstNameError.setText(getResources().getString(R.string.firstname_error));
            isFirstNameValid = false;
        } else {
            firstNameError.setText("");
            isFirstNameValid = true;
        }

        // Check for a valid phone.
        if (ed_phone.getText().toString().isEmpty()) {
            phoneError.setText(getResources().getString(R.string.phone_error));
            isPhoneValid = false;
        } else {
            phoneError.setText("");
            isPhoneValid = true;
        }

        // Check for a valid date.
        if (ed_date.getText().toString().isEmpty()) {
            dateError.setText(getResources().getString(R.string.date_error));
            isDateValid = false;
        } else {
            dateError.setText("");
            isDateValid = true;
        }


        // Check for a Email.
        if (edEmail.getText().toString().isEmpty()) {
            emailError.setText(getResources().getString(R.string.date_error));
            isEmailValid = false;
        } else {
            emailError.setText("");
            isEmailValid = true;
        }


        if (isLastNameValid && isFirstNameValid &&  isEmailValid && isDateValid && isPhoneValid) {

            user.setFirstName(String.valueOf(edFirstname.getText()));
            user.setLastName(String.valueOf(edLastName.getText()));
            user.setEmail(String.valueOf(edEmail.getText()));
            user.setPhone(String.valueOf(ed_phone.getText()));
            //
            try{
                String stDate = String.valueOf( ed_date.getText());
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");

                Date userDateOfBirth = sdf.parse(stDate);
                user.setCreation_date_account(userDateOfBirth);
            }
            catch ( ParseException e){
                e.printStackTrace();
            }
            Boolean result = UserManager.updateUser(user);
            if ( result){
                Toast.makeText(getApplicationContext(), "Successfully", Toast.LENGTH_SHORT).show();
                //
                // redirect to MainActivity
                Intent intent = new Intent(ctx, Home.class);
                Gson gson = new Gson();
                String JSON = gson.toJson(user);
                intent.putExtra("user", JSON);
                startActivity(intent);
            }
            else{
                Toast.makeText(getApplicationContext(), "error insert user", Toast.LENGTH_SHORT).show();
            }

        } else {
            Toast.makeText(getApplicationContext(), "error insert user", Toast.LENGTH_SHORT).show();
        }
    }


}

