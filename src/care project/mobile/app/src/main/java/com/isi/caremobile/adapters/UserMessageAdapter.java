package com.isi.caremobile.adapters;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;

import com.isi.caremobile.R;
import com.isi.caremobile.entities.User;
import com.isi.caremobile.entities.UserMessage;

import java.util.ArrayList;
public class UserMessageAdapter  extends ArrayAdapter<UserMessage>  {

    int idRessource;
    User UserLogged;


    public UserMessageAdapter(@NonNull Context context, int resource, @NonNull ArrayList<UserMessage> objects, User user) {
        super(context, resource, objects);
        idRessource = resource;
        UserLogged = user;

    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(idRessource , null);
        }
        UserMessage userMessage = getItem(position);
        //
        CardView card_gchat_message_me = convertView.findViewById(R.id.card_gchat_message_me);
        CardView card_gchat_message_other = convertView.findViewById(R.id.card_gchat_message_other);
        //
        TextView text_gchat_user_other = convertView.findViewById(R.id.text_gchat_user_other);
        //
        if ( UserLogged.getId() == userMessage.getSender().getId()){
            TextView text_gchat_message_me = convertView.findViewById(R.id.text_gchat_message_me);
            TextView text_gchat_date_me = convertView.findViewById(R.id.text_gchat_date_me);
            //
            text_gchat_message_me.setText(userMessage.getMessage());
            text_gchat_date_me.setText(userMessage.getCreatedAt());
            //
            card_gchat_message_other.setVisibility(View.INVISIBLE);
            text_gchat_user_other.setVisibility(View.INVISIBLE);
        }
        else {
            TextView text_gchat_message_other = convertView.findViewById(R.id.text_gchat_message_other);
            TextView text_gchat_date_other = convertView.findViewById(R.id.text_gchat_date_other);
            //
            text_gchat_message_other.setText(userMessage.getMessage());
            text_gchat_date_other.setText(userMessage.getCreatedAt());
            text_gchat_user_other.setText(userMessage.getSender().getFirstName());
            //
            card_gchat_message_me.setVisibility(View.INVISIBLE);
        }
        //

        return convertView;
    }

}
