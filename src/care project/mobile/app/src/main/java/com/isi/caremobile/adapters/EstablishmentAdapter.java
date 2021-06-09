package com.isi.caremobile.adapters;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.isi.caremobile.FollowUp;
import com.isi.caremobile.R;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.User;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
public class EstablishmentAdapter extends ArrayAdapter<Establishment>  {

    int idRessource;
    ImageView iconEstablishment;
    Establishment establishment;


    public EstablishmentAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Establishment> objects) {
        super(context, resource, objects);
        idRessource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(idRessource , null);
        }
        establishment = getItem(position);
        iconEstablishment = convertView.findViewById(R.id.iconEstablishment);
        TextView textViewname = convertView.findViewById(R.id.nameEstablishment);
        //
        textViewname.setText(establishment.getDescription());
        //
        new MyTask().execute();
        //
        return convertView;
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
                    iconEstablishment.setImageBitmap(loadedImage);
                }
            }
            super.onPostExecute(aVoid);
        }
    }

}
