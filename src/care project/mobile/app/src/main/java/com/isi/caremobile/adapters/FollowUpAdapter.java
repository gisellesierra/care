package com.isi.caremobile.adapters;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.isi.caremobile.R;
import com.isi.caremobile.entities.FollowUp;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
public class FollowUpAdapter extends ArrayAdapter<FollowUp>  {


    int idRessource;

    public FollowUpAdapter(@NonNull Context context, int resource, @NonNull ArrayList<FollowUp> objects) {
        super(context, resource, objects);
        idRessource = resource;

    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(idRessource , null);
        }
        FollowUp followUp = getItem(position);
        //
        TextView dateFollowUp = convertView.findViewById(R.id.dateFollowUp);
        //
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
        Date now = followUp.getDate_started();
        String strDate = simpleDateFormat.format(followUp.getDate_started());
        dateFollowUp.setText(strDate);
        //
        return convertView;
    }



}
