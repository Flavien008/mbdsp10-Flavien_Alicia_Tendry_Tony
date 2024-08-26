package com.example.tpt_mbds.adapteur;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.tpt_mbds.AllPostsFragment;
import com.example.tpt_mbds.MyPostsFragment;

public class PostsPagerAdapter extends FragmentPagerAdapter {

    public PostsPagerAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return new AllPostsFragment();
            case 1:
                return new MyPostsFragment();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return 2;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                return "Tous les posts";
            case 1:
                return "Mes posts";
            default:
                return null;
        }
    }
}
