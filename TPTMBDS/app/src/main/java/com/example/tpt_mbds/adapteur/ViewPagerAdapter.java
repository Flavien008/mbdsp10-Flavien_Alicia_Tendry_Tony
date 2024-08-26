package com.example.tpt_mbds.adapteur;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.tpt_mbds.AccepteParMoisFragment;
import com.example.tpt_mbds.TotalParMoisFragment;

public class ViewPagerAdapter extends FragmentPagerAdapter {

    public ViewPagerAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return TotalParMoisFragment.newInstance();
            case 1:
                return AccepteParMoisFragment.newInstance();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return 2; // Number of tabs
    }

    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                return "Total";
            case 1:
                return "Acceptés";
            default:
                return null;
        }
    }
}
