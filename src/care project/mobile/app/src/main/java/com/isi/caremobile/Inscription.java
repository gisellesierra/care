package com.isi.caremobile;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;


import com.google.gson.Gson;
import com.isi.caremobile.entities.User;
public class Inscription extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    EditText lastName, firstName, date, phone;
    TextView lastnameEror, firstNameEror, dateError, phoneError;
    Button nextPageInscription,btn_back;
    Spinner spin;
    boolean isLastNameValid, isFirstNameValid, isPhoneValid, isDateValid;
    String[] bankNames = {"HOMME", "FEMME"};
    Context ctx;
    User user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inscription);
        //Getting the instance of Spinner and applying OnItemSelectedListener on it
        spin = findViewById(R.id.simpleSpinner);
        spin.setOnItemSelectedListener(this);

        //Creating the ArrayAdapter instance having the bank name list
        ArrayAdapter aa = new ArrayAdapter(this, android.R.layout.simple_spinner_item, bankNames);
        aa.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        //Setting the ArrayAdapter data on the Spinner
        spin.setAdapter(aa);
        ctx = this;

        Intent infIntent = getIntent();
        String stuser = infIntent.getStringExtra("user");
        //
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);

        date = findViewById(R.id.ed_date);
        phone = findViewById(R.id.ed_phone);
        lastName = findViewById(R.id.edLastName);
        firstName = findViewById(R.id.edFirstname);
        lastnameEror = findViewById(R.id.lastNameError);
        firstNameEror = findViewById(R.id.firstNameError);
        nextPageInscription = findViewById(R.id.btnNextPageInscription);
        phoneError = findViewById(R.id.phoneError);
        dateError = findViewById(R.id.dateError);
        //redirection vers la  page login
        btn_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ctx, LoginActivity.class);
                startActivity(intent);
            }
        });
        //redirection vers la seconde activity inscription
        nextPageInscription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SetValidation();
            }
        });

    }

    //pour les validations du formulaire inscription
    public void SetValidation() {
        // Check for a valid lastname.
        if (lastName.getText().toString().isEmpty()) {
            lastnameEror.setText(getResources().getString(R.string.lastname_error));
            isLastNameValid = false;
        } else {
            lastnameEror.setText("");
            isLastNameValid = true;
//            nameError.setErrorEnabled(false);
        }
        // Check for a valid firstname.
        if (firstName.getText().toString().isEmpty()) {
            firstNameEror.setText(getResources().getString(R.string.firstname_error));
            isFirstNameValid = false;
        } else {
            firstNameEror.setText("");
            isFirstNameValid = true;
//            nameError.setErrorEnabled(false);
        }

        // Check for a valid phone.
        if (phone.getText().toString().isEmpty()) {
            phoneError.setText(getResources().getString(R.string.phone_error));
            isPhoneValid = false;
        } else {
            phoneError.setText("");
            isPhoneValid = true;
//            nameError.setErrorEnabled(false);
        }

        // Check for a valid phone.
        if (date.getText().toString().isEmpty()) {
            dateError.setText(getResources().getString(R.string.date_error));
            isDateValid = false;
        } else {
            dateError.setText("");
            isDateValid = true;
//            nameError.setErrorEnabled(false);
        }

        if (isLastNameValid && isFirstNameValid && isDateValid && isPhoneValid) {

            user.setFirstName(String.valueOf(firstName.getText()));
            user.setLastName(String.valueOf(lastName.getText()));
            user.setPhone(String.valueOf(phone.getText()));
            //
            Intent intent = new Intent(ctx, Home.class);
            Gson gson = new Gson();
            String JSON = gson.toJson(user);
            intent.putExtra("user",JSON);
            startActivity(intent);
        } else {
            Toast.makeText(getApplicationContext(), "error insert user", Toast.LENGTH_SHORT).show();
        }
    }



    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Toast.makeText(getApplicationContext(), bankNames[position], Toast.LENGTH_LONG).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
    }
}
