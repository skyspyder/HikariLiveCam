package com.app.sky.hikarilivecam;

import android.os.Bundle;
import android.app.Activity;

//追加
import android.annotation.SuppressLint;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.KeyEvent;

public class MainActivity extends Activity {

	WebView myWebView;
	// 追加
	@SuppressLint("SetJavaScriptEnabled")
	// ---
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		
        // --- WebView 機能設定 ---
		// タイトルバーを削除
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		// ---
		
		setContentView(R.layout.activity_main);

        // --- WebView 機能設定 ---		
		// レイアウトで指定したwebViewのID指定
		myWebView = (WebView)findViewById(R.id.webView1);
		// リンクで標準ブラウザを起動しない
		myWebView.setWebViewClient(new WebViewClient());
		// ローカルページを表示
		myWebView.loadUrl("file:///android_asset/main.html");
		// 右側のスクロールバーの隙間をなくす
		myWebView.setVerticalScrollbarOverlay(true);
		// javascript を許可する
		myWebView.getSettings().setJavaScriptEnabled(true);
		// ---
    }
	
    // バックキー・ホームキーで終了
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {

        	finish();
        	android.os.Process.killProcess(android.os.Process.myPid());
        	
            return true;
        } else {
            if (keyCode == KeyEvent.KEYCODE_HOME) {
                
            	finish();
            	android.os.Process.killProcess(android.os.Process.myPid());

            	return true;
            } else {
            	return false;
            }
        }
    }
    // 非アクティブで終了
    @Override
    public void onPause() {
    	super.onPause();
    	finish();
    	android.os.Process.killProcess(android.os.Process.myPid());
    }
    // バックグラウンドで終了
    @Override
    public void onUserLeaveHint() {
    	finish();
    	android.os.Process.killProcess(android.os.Process.myPid());
    }
    // ---
    

// ---

}
