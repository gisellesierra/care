package com.isi.caremobile;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.app.FragmentTransaction;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.SeekBar;
import android.widget.TextView;

import com.google.gson.Gson;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.FollowUpDay;
import com.isi.caremobile.entities.PatientQuestionResponse;
import com.isi.caremobile.entities.Question;
import com.isi.caremobile.entities.QuestionResponse;
import com.isi.caremobile.entities.QuestionnaireAnswers;
import com.isi.caremobile.entities.ResponseItem;
import com.isi.caremobile.entities.ResponseQuestionnaire;
import com.isi.caremobile.entities.Service;
import com.isi.caremobile.entities.FollowUp;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.FollowUpDayManager;
import com.isi.caremobile.managers.PatientQuestionResponseManager;
import com.isi.caremobile.managers.QuestionManager;
import com.isi.caremobile.managers.QuestionResponseManager;
import com.isi.caremobile.managers.ResponseQuestionnaireManager;
import com.isi.caremobile.managers.ServiceManager;
import com.isi.caremobile.managers.FollowUpManager;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
public class FormOneActivity extends AppCompatActivity {

    User user;
    Establishment establishment;

    ImageView logoEtablissementClique;
    Context ctx;
    Button btn_Validation_Form;
    TextView tv_nameEtablissement;
    SeekBar seekBar;
    //

    TextView tv_questionthree;


   int painIndex = 0;

   RadioButton rdbOui;
   RadioButton rdbNon;
   Boolean answerQuestion = false;
   int answerrdbOui;
   int answerrdbNon;

    Object[] infoQuestionResponse = null;
    Question question = new Question();
    FollowUpDay followUpDay = new FollowUpDay();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form_one);

        ctx = this;

        Intent infIntent = getIntent();
        String stuser = infIntent.getStringExtra("user");
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);
        //
        String stestablishment =  infIntent.getStringExtra("establishment");
        gson = new Gson();
        establishment = gson.fromJson(stestablishment, Establishment.class);

        // Get Questions by establishment id
        ArrayList<FollowUpDay> listFollowUpDay = FollowUpDayManager.getFollowUpDayByEstablishmentId(user.getId());
        // Get the first question
        for ( FollowUpDay item : listFollowUpDay){
            followUpDay = item;
            break;
        }
        // GEt question info
        ArrayList<Question> listQuestion =QuestionManager.getQuestionById(followUpDay.getId_question());
        question = new Question();
        for ( Question item : listQuestion){
            question = item;
            break;
        }
        // Get the possible answers for the question
        ArrayList<QuestionResponse> lstQuestionResponse = QuestionResponseManager.getQuestionResponseByQuerionId(question.getId());
        //
       infoQuestionResponse = lstQuestionResponse.toArray();
        // Get FollowUp by user and Establishment Ids
        ArrayList<FollowUp> listSuivi = FollowUpManager.getUserSuiviByEtablissement(user.getId(), establishment.getId());
        //
        Service service = new Service();
        for ( FollowUp itemSuivi:listSuivi ) {
            service  = ServiceManager.getServiceById(itemSuivi.getId_service());
        }

        logoEtablissementClique=  findViewById(R.id.logoEtablissementClique);

        tv_questionthree =  findViewById(R.id.tv_questionthree);
        rdbOui=  findViewById(R.id.rdbOui);
        rdbNon=  findViewById(R.id.rdbNon);

        btn_Validation_Form = findViewById(R.id.btn_Validation_Form);
        tv_nameEtablissement= findViewById(R.id.tv_nameEtablissement);

        tv_nameEtablissement.setText(establishment.getName());

        new MyTask().execute();
        //
        tv_questionthree.setText(question.getQuestion());
        QuestionResponse questionResponse = new QuestionResponse();
        if ( infoQuestionResponse != null) {
            switch (infoQuestionResponse.length){
                case 1:
                    questionResponse = (QuestionResponse) infoQuestionResponse[0];
                    rdbOui.setText(questionResponse.getResponse());
                    break;
                case 2:
                    questionResponse = (QuestionResponse) infoQuestionResponse[0];
                    rdbOui.setText(questionResponse.getResponse());
                    questionResponse = (QuestionResponse) infoQuestionResponse[1];
                    rdbNon.setText(questionResponse.getResponse());
                    break;
            }
        }



        rdbOui.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                QuestionResponse questionResponse = new QuestionResponse();
                questionResponse = (QuestionResponse) infoQuestionResponse[0];
                answerrdbOui = questionResponse.getId();
                answerQuestion = true;
            }
        });
//
        rdbNon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                QuestionResponse questionResponse = new QuestionResponse();
                questionResponse = (QuestionResponse) infoQuestionResponse[1];
                answerrdbNon = questionResponse.getId();
                answerQuestion = false;
            }
        });


        btn_Validation_Form.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                // -------------------------------------------------
                Boolean inputDataOk = false;
                //
                if ( answerrdbOui > 0 || answerrdbNon > 0 ){
                    inputDataOk = true;
                    ArrayList<ResponseQuestionnaire> listResponseQuestionnaireIn = new ArrayList<>();
                    //
                    ResponseQuestionnaire responseQuestionnaire = new ResponseQuestionnaire();
                    responseQuestionnaire.setId_question_follow_up(followUpDay.getId_follow_up());
                    responseQuestionnaire.setId_question_response(followUpDay.getId_question());
                    //
                    ArrayList<ResponseItem> listResponseItem = new ArrayList<>();
                    //
                    QuestionResponse questionResponse = new QuestionResponse();
                    ResponseItem responseItem = new ResponseItem();
                    //
                    questionResponse = (QuestionResponse) infoQuestionResponse[0];
                    responseItem = new ResponseItem();
                    if ( answerQuestion ) {
                        responseItem.setId(answerrdbOui);
                    }
                    else {
                        responseItem.setId(answerrdbNon);
                    }
                    //
                    responseItem.setResponse(questionResponse.getResponse());
                    //
                    listResponseItem.add(responseItem);
                    //
                    responseQuestionnaire.setRangeValue("0");
                    responseQuestionnaire.setResponses(listResponseItem);
                    //
                    listResponseQuestionnaireIn.add(responseQuestionnaire);
                    //
                    ArrayList<ResponseQuestionnaire> listResponseQuestionnaireOut =  ResponseQuestionnaireManager.postResponseQuestionnaire(listResponseQuestionnaireIn);
                    //
                }
                //
                if ( inputDataOk) {
                    // redirect to MainActivity
                    Intent intent = new Intent(ctx, Home.class).addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY); //  | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    Gson gson = new Gson();
                    String JSON = gson.toJson(user);
                    intent.putExtra("user", JSON);
                    //
                    JSON = gson.toJson(establishment);
                    intent.putExtra("establishment", JSON);
                    //
                    startActivity(intent);
                }
                else{
                    AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                    builder.setTitle("Atention");
                    builder.setMessage("You must select an option");
                    builder.setPositiveButton("OK", null);
                    AlertDialog dialog = builder.create();
                    dialog.show();
                }
            }
        });



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