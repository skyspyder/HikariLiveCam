//----------------------------------------------------------
// 画面構成
//----------------------------------------------------------
// ウィンドウ・画像サイズ変数
var win_width;               // 画面横サイズ
var win_height;              // 画面縦サイズ
var img_width;               // イメージ横サイズ
var img_height;              // イメージ縦サイズ

// ウィンドウ初期化
window.onload  = function() {
	win_size();
	page_load();
}

// ウィンドウリサイズ処理
window.onresize = win_size;

// イメージ・メニュ表示サイズ設定
function win_size() {
	// canvas要素のノードオブジェクト
	canvas = document.getElementById('cvs');
	// canvas要素の存在チェックとCanvas未対応ブラウザの対処
	if ( ! canvas || ! canvas.getContext ) { return false; }


	// ウィンドウサイズ 読み込み
	win_width  = window.innerWidth;
	win_height = window.innerHeight;
	// 縦横判定（画面サイズの縦横サイズで判定）
	if (win_width <= win_height) {
		// ===========================
		img_width  = win_width;              // 横：イメージサイズ = 画面サイズ
		img_height = Math.floor(img_width / 4 * 3);      // 縦：縦横比のみ設定
		// ---------------------------
		// 縦画面 画面上部
		canvas.width = img_width;
		canvas.height = img_height;
		document.getElementById("main").style.width = img_width + "px";
		document.getElementById("main").style.height = img_height + "px";
		document.getElementById("menu").style.width = img_width + "px";
		// ---------------------------
		// リンク部 横サイズ設定
		var colLink
		colLink = document.getElementsByTagName("li");
		for (i = 0; i < colLink.length; i++) {
			colLink[i].style.width = (Math.floor(img_width / 3)-8) + "px";
			colLink[i].style.height = "40px";
			colLink[i].style.lineheight = colLink[i].style.height;
		}
		// ---------------------------
		// リスト部 折り返し設定
		var colList
		colList = document.getElementsByTagName("li");
		for (i = 0; i < colList.length; i++) {
			colList[i].style.cssFloat = "left"
		}
	} else {
		// ===========================
		img_height = win_height;                      // 縦：イメージサイズ = 画面サイズ
		img_width  = Math.floor(img_height / 3 * 4);  // 横：縦横比のみ設定
		// ---------------------------
		// 横画面 画面左側
		canvas.width = img_width;
		canvas.height = img_height;
		document.getElementById("main").style.width = img_width + "px";
		document.getElementById("main").style.height = img_height + "px";
		document.getElementById("menu").style.height = img_height + "px";
		// リンク部 横サイズ設定
		var colLink
		colLink = document.getElementsByTagName("li");
		for (i = 0; i < colLink.length; i++) {
			colLink[i].style.width = (win_width - img_width - 10) + "px";
			colLink[i].style.height = (Math.floor(img_height / 11)) + "px";
		}
		// ---------------------------
		// リスト部 折り返し解除設定
		var colList
		colList = document.getElementsByTagName("li");
		for (i = 0; i < colList.length; i++) {
			colList[i].style.cssFloat = "none"
		}
	}
}

//----------------------------------------------------------
// 画像表示
//----------------------------------------------------------
// カメラ7台 Name,ID配列 設定
var arrName = ["みたらい湾","伊藤公記念公園","虹ヶ浜海岸","室積海岸","島田川","光井川","冠山総合公園"];
var arrID = ["mitaraiwan","itoukoukinenkouen","nijigahama","murozumikaigan","shimadagawa","mitsuigawa","kanmuriyamakouen"];
// タイマーID 変数
var TimerID;
// 読込中カメラ番号 変数
var camNo;
// 画像読み込み時 キャッシュ対策 変数
var myDate;
// 時刻表示 変数
var nowDate;
// 表示画像アドレス格納 変数
var imgSrc;
// 画像表示領域
var canvas;
// カメラ画像アドレス（固定） 定数
var camAdr = "http://camera.city.hikari.lg.jp:8080/getimage/?camName="
// 読込間隔 定数
var loadTime = 5000

// 初期表示
function page_load() {
	camNo = document.getElementById("cam_No").value;
	document.getElementById("cam_name").innerText = arrName[camNo];
	timeView();
	cvs_draw(camNo);
}

function cvs_draw(camNo) {
	cam_view(camNo);
	// タイマー開始
	setTimeout(function(){},0);
	timerID = setTimeout("cvs_draw(camNo)",loadTime); 
}

function cam_view(camNo){
	// キャッシュ対策用
	myDate = new Date();
	// 2Dコンテキスト
	var ctx = canvas.getContext('2d');
	// Imageオブジェクトを生成
	var img = new Image();
	img.src = camAdr + arrID[camNo] + "&PAGE=" + myDate.getTime();
	// 画像が読み込まれるのを待ってから処理を続行
	img.onload = function() {
		ctx.drawImage(img, 0, 0, img_width, img_height);
		timeView();
	}
}

// タイマー終了
function clearTimer() {
	clearTimeout(timerID);
}

// 日付時刻表示
function timeView() {
	nowDate= new Date();
	document.getElementById("cam_time").innerText 
		= nowDate.getFullYear() + "/" 
		+ nowDate.getMonth()+1 + "/"
		+ nowDate.getDate() + " "
		+ nowDate.getHours() + ":"
		+ nowDate.getMinutes() + ":"
		+ nowDate.getSeconds();
}

// カメラ切り替え
function change_img(camNo) {
	clearTimer();
	document.getElementById("cam_No").value = camNo;
	page_load();
}

// コマンドの送信
function sendAction(strOpt){
	camNo = document.getElementById("cam_No").value;
	var url = "http://camera.city.hikari.lg.jp:8080/camctrl/?" + "camName=" + arrID[camNo] + "&" + strOpt;
	idummy.location = url;
}
