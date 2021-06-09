package com.isi.caremobile;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Patterns;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;


import com.google.gson.Gson;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.UserManager;
public class SuiteInscription extends AppCompatActivity {
    Button btnInscriptionSignUp, signUp, btnCancel;
    Context ctx;
    EditText email, password, confirmPassord, ed_accessCode;
    TextView confirmPasswordEror, emailEror, passwordEror, accessCodeError;

    boolean isConfirmPasswordValid, isEmailValid, isPasswordValid, isAccessCodeValid;

   // User userData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_suite_inscription);
        ctx = this;

        Intent infIntent = getIntent();
        String stuserData = infIntent.getStringExtra("userData");
        Gson gson = new Gson();

        btnInscriptionSignUp = findViewById(R.id.btnInscriptionSignUp);
        signUp = findViewById(R.id.btnInscriptionSignUp);
        btnCancel = findViewById(R.id.btn_cancel);

        email = findViewById(R.id.edEmail);
        password = findViewById(R.id.ed_password);
        confirmPassord = findViewById(R.id.ed_confirmPassword);

        ed_accessCode = findViewById(R.id.ed_accessCode);
        confirmPasswordEror = findViewById(R.id.confirmPasswordError);
        emailEror = findViewById(R.id.emailError);
        passwordEror = findViewById(R.id.passwordError);
        accessCodeError = findViewById(R.id.accessCodeError);

        //l'envoi a la connexion patient
        btnInscriptionSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ctx, Inscription.class);
                startActivity(intent);
            }
        });
        //retourner a la premiere page d'inscription
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ctx, LoginActivity.class);
                startActivity(intent);
            }
        });
        //inscrire un patient
        signUp.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                SetValidation();
            }
        });
    }

         //pour les validations du formulaire inscription
    public void SetValidation() {
        // Check for a valid email address.
        if (email.getText().toString().isEmpty()) {
            emailEror.setText(getResources().getString(R.string.email_error));
            isEmailValid = false;
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email.getText().toString()).matches()) {
            emailEror.setText(getResources().getString(R.string.error_invalid_email));
            isEmailValid = false;
        } else {
            emailEror.setText("");
            isEmailValid = true;
//            emailError.setErrorEnabled(false);
        }

        if (password.getText().toString().isEmpty()) {
            passwordEror.setText(getResources().getString(R.string.password_error));
            isPasswordValid = false;
        } else {
            passwordEror.setText("");
            isPasswordValid = true;
        }
        // Check for a valid access code.
        if (ed_accessCode.getText().toString().isEmpty()) {
            accessCodeError.setText(getResources().getString(R.string.accessCode_error));
            isAccessCodeValid = false;
        } else {
            accessCodeError.setText("");
            isAccessCodeValid = true;
        }
        if (confirmPassord.getText().toString().isEmpty()) {
            confirmPasswordEror.setText(getResources().getString(R.string.confirmpassword_error));
            isConfirmPasswordValid = false;
        } else {
            confirmPasswordEror.setText("");
            isConfirmPasswordValid = true;
        }
        //
        if (isPasswordValid && isConfirmPasswordValid) {
            if (password.getText().toString().equals(confirmPassord.getText().toString())) {
                confirmPasswordEror.setText("");
                isConfirmPasswordValid = true;
            } else {
                confirmPasswordEror.setText(getResources().getString(R.string.error_equal_password_and_confirmPassword));
                isConfirmPasswordValid = false;
            }
        }

        if (isAccessCodeValid && isConfirmPasswordValid && isConfirmPasswordValid && isEmailValid && isPasswordValid) {
            //
            User userValid = UserManager.verifyUserAccessCode(email.getText().toString(),ed_accessCode.getText().toString());
            //
            User userData = new User();
            userData.setId(22);
            userData.setEmail(email.getText().toString());
            userData.setPassword(password.getText().toString());
            userData.setAccess_code(Integer.parseInt(ed_accessCode.getText().toString()));
            Intent intent = new Intent(ctx, Inscription.class);
            Gson gson = new Gson();
            String JSON = gson.toJson(userData);
            intent.putExtra("user",JSON);
            startActivity(intent);

        }
        else{
            Toast.makeText(ctx, "information is not complete", Toast.LENGTH_SHORT).show();
        }
    }
}