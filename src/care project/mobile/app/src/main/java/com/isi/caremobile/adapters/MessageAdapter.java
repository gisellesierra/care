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
import com.isi.caremobile.entities.Message;
import com.isi.caremobile.entities.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
public class MessageAdapter extends ArrayAdapter<Message>  {

    int idRessource;
    User UserLogged;
    //
    ArrayList<User> listUser = new ArrayList();


    public MessageAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Message> objects, User user, ArrayList<User> userList) {
        super(context, resource, objects);
        idRessource = resource;
        UserLogged = user;
        listUser = userList;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(idRessource , null);
        }
        Message message = getItem(position);
        //
        CardView card_gchat_message_me = convertView.findViewById(R.id.card_gchat_message_me);
        CardView card_gchat_message_other = convertView.findViewById(R.id.card_gchat_message_other);
        //
        TextView text_gchat_user_other = convertView.findViewById(R.id.text_gchat_user_other);
        //
        if ( UserLogged.getId() == message.getId_user()){
            TextView text_gchat_message_me = convertView.findViewById(R.id.text_gchat_message_me);
            TextView text_gchat_date_me = convertView.findViewById(R.id.text_gchat_date_me);
            //
            text_gchat_message_me.setText(message.getContenu());
            //
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd hh:dd:ss");
            String strDate = simpleDateFormat.format( message.getDate_time());
            text_gchat_date_me.setText(strDate);
            //
            card_gchat_message_other.setVisibility(View.INVISIBLE);
            text_gchat_user_other.setVisibility(View.INVISIBLE);
            //
            card_gchat_message_me.setVisibility(View.VISIBLE);
        }
        else {
            TextView text_gchat_message_other = convertView.findViewById(R.id.text_gchat_message_other);
            TextView text_gchat_date_other = convertView.findViewById(R.id.text_gchat_date_other);
            //
            text_gchat_message_other.setText(message.getContenu());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd hh:dd:ss");
            String strDate = simpleDateFormat.format( message.getDate_time());
            text_gchat_date_other.setText(strDate);
            //
            // ----------------------------------------
            // Get other Info
            text_gchat_user_other.setText("");
            if ( listUser != null ) {
                for ( User item :  listUser ) {
                    if ( item.getId() == message.getId_user()){
                        text_gchat_user_other.setText(item.getFirstName());
                        break;
                    }
                }
            }
            //
            card_gchat_message_me.setVisibility(View.INVISIBLE);
            card_gchat_message_other.setVisibility(View.VISIBLE);
            text_gchat_user_other.setVisibility(View.VISIBLE);
        }
        //

        return convertView;
    }



}
