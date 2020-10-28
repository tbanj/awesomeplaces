package com.majaplace;
import com.reactnativenavigation.NavigationActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

public class MainActivity extends NavigationActivity {
        // @Override
        // public LinearLayout createSplashLayout() {
        //     LinearLayout view = new LinearLayout(this);
        //     TextView textView = new TextView(this);

        //     view.setBackgroundColor(Color.parseColor("#fa923f"));
        //     view.setGravity(Gravity.CENTER);

        //     textView.setTextColor(Color.parseColor("#ffffff"));
        //     textView.setText("Majaplace");
        //     textView.setGravity(Gravity.CENTER);
        //     textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        //     view.addView(textView);
        //     return view;
        // }

         @Override
    public void addDefaultSplashLayout() {
        // LinearLayout splash = new LinearLayout(this);
        // Drawable splash_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(),R.drawable.splash_screen_bitmap);
        // splash.setBackground(splash_screen_bitmap);

      LinearLayout view = new LinearLayout(this);
            TextView textView = new TextView(this);

            view.setBackgroundColor(Color.parseColor("#fa923f"));
            view.setGravity(Gravity.CENTER);

            textView.setTextColor(Color.parseColor("#ffffff"));
            textView.setText("Majaplace");
            textView.setGravity(Gravity.CENTER);
            textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

            view.addView(textView);
        setContentView(view);
    }
}
