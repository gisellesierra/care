package com.isi.caremobile;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.gson.Gson;
import com.isi.caremobile.adapters.MessageAdapter;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.MessageSend;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.managers.MessageManager;
import com.isi.caremobile.managers.MessageSendManager;
import com.isi.caremobile.managers.UserManager;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
public class Message extends Fragment  {

    // ArrayList<UserMessage>  messageList ;
    ArrayList<com.isi.caremobile.entities.Message>  messageList ;
    ArrayList<User> listUser;
    User user;
    Establishment establishment;
    Context ctx;
    ListView listView;
    EditText edit_gchat_message;
    Button button_gchat_send;
    TextView tv_nameEtablissement;
    LinearLayout llnameEtablissement;
    ImageView logoEtablissementClique;


    Counter counter;



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        ctx = container.getContext();


        String stuser = getArguments().getString("user");
        //
        Gson gson = new Gson();
        user = gson.fromJson(stuser, User.class);
        //
        String stestablishment = getArguments().getString("establishment");
        gson = new Gson();
        establishment = gson.fromJson(stestablishment, Establishment.class);
        //
        // Get all users
        ArrayList<User> listUser = UserManager.getAllUsers();
        //
        // Get Messages by establishment id
        if ( establishment != null){
            // messageList = MessageManager.getMesaagesByFollowUpId(establishment.getId() );
            messageList = MessageManager.getMesaagesByFollowUpId(8 );
        }

        View rootView = inflater.inflate(R.layout.fragment_list_message,container,false);

        listView = rootView.findViewById(R.id.listMessages);

        if ( messageList != null) {
            MessageAdapter messaageAdapter = new MessageAdapter(ctx, R.layout.message_layout, messageList, user,listUser);
            listView.setAdapter(messaageAdapter);
        }

        logoEtablissementClique = rootView.findViewById(R.id.logoEtablissementClique);

        tv_nameEtablissement = rootView.findViewById(R.id.tv_nameEtablissement);
        llnameEtablissement = rootView.findViewById(R.id.llnameEtablissement);
        llnameEtablissement.setVisibility(View.INVISIBLE);
        if ( establishment != null) {
            llnameEtablissement.setVisibility(View.VISIBLE);
            tv_nameEtablissement.setText(establishment.getName());
            new MyTask().execute();
        }


        edit_gchat_message  = rootView.findViewById(R.id.edit_gchat_message);
        button_gchat_send  = rootView.findViewById(R.id.button_gchat_send);

         counter = new Counter(1800000,1000);
        counter.start();

        //
        button_gchat_send.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
               // if(user.getId_role() != 3){
                if (String.valueOf(edit_gchat_message.getText()).length() >0 ){
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
                    Date now = new Date();

                    // MessageSend messageSend = new  MessageSend(String.valueOf( edit_gchat_message.getText() ),establishment.getId() ,user.getId());
                    MessageSend messageSend = new  MessageSend(String.valueOf( edit_gchat_message.getText() ),8 ,user.getId());
                    //
                    MessageSendManager.sendMessage(messageSend);

                    int idMsg = messageList.size() + 1;
                    com.isi.caremobile.entities.Message userMessage = new com.isi.caremobile.entities.Message(idMsg, String.valueOf( edit_gchat_message.getText() ) , false ,false , now , user.getId(),establishment.getId());
                    messageList.add(userMessage);
                    //
                    MessageAdapter establishmentAdapter1 = new MessageAdapter(ctx, R.layout.message_layout, messageList, user,listUser);
                    listView.setAdapter(establishmentAdapter1);
                    edit_gchat_message.setText("");
                }
            }
            //}
        });

        return rootView;
    }

    public void endCounter(){
        //-->tv_nameEtablissement.setText("Fin del Timer");
    }


    public void refreshMessages(){

        if ( establishment != null) {
            ArrayList<com.isi.caremobile.entities.Message> messageListAux;
            messageListAux = MessageManager.getMesaagesByFollowUpId(establishment.getId());
            if (messageListAux != null) {
                //if (messageListAux.size() > messageList.size()) {
                    messageList = messageListAux;
                    MessageAdapter establishmentAdapter1 = new MessageAdapter(ctx, R.layout.message_layout, messageList, user, listUser);
                    listView.setAdapter(establishmentAdapter1);
                //}
            }
        }

    }


    public class Counter extends CountDownTimer {


        public Counter(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onFinish() {
            endCounter();
        }

        @Override
        public void onTick(long millisUntilFinished) {
            refreshMessages();
        }

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



