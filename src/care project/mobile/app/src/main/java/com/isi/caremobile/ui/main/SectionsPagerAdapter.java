package com.isi.caremobile.ui.main;
import android.content.Context;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.google.gson.Gson;
import com.isi.caremobile.EstablishmentDetail;
import com.isi.caremobile.FollowUp;
import com.isi.caremobile.Message;
import com.isi.caremobile.R;
import com.isi.caremobile.entities.Establishment;
import com.isi.caremobile.entities.QuestionnaireAnswers;
import com.isi.caremobile.entities.User;
/**
 * A [FragmentPagerAdapter] that returns a fragment corresponding to
 * one of the sections/tabs/pages.
 */
public class SectionsPagerAdapter extends FragmentPagerAdapter {
    User muser;
    Establishment mestablishment;

    //
    @StringRes
    private static final int[] TAB_TITLES = new int[]{R.string.tab_followUp, R.string.tab_message,R.string.tab_info};
    private final Context mContext;
    public SectionsPagerAdapter(Context context, FragmentManager fm, User user, Establishment establishment ) {
        super(fm);
        mContext = context;
        muser = user;
        mestablishment = establishment;

    }
    @Override
    public Fragment getItem(int position) {
        Fragment fragment = null;
        switch (position) {
            case 0:
                fragment =new FollowUp();
                break;
            case 1:
                fragment = new Message();
                break;
            case 2:
                //fragment = new Form();
               // fragment =new FollowUp();
                fragment =new EstablishmentDetail();
                break;
        }
        Bundle data = new Bundle();
        Gson gson = new Gson();
        String JSON = gson.toJson(muser);
        data.putString("user",JSON);
        //
        if ( mestablishment != null) {
            JSON = gson.toJson(mestablishment);
            data.putString("establishment", JSON);
        }

        data.putString("position", String.valueOf(position));
        //
        fragment.setArguments(data);
        return fragment;
    }
    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:

                return "FollowUp";

            case 1:
                return "Messages";
            case 2:
                return "Information";
        }
        return null;
    }
    @Override
    public int getCount() {
        // Show 3 total pages.
        return 3;
    }
}