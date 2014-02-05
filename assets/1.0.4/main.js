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
	win_load();
}

// ウィンドウリサイズ処理
window.onresize = win_size;

// イメージ・メニュ表示サイズ設定
function win_size() {
	// ウィンドウサイズ 読み込み
	win_width  = window.innerWidth;
	win_height = window.innerHeight;
	// 縦横判定（画面サイズの縦横サイズで判定）
	if (win_width <= win_height) {
		// 縦画面 画面上部
		img_width  = win_width;                      // 横：イメージサイズ = 画面サイズ
		img_height = Math.round(img_width / 4 * 3);  // 縦：縦横比のみ設定
		// サイズを適用
		size_set();

		// 縦画面 画面下部
		// リンク部 横サイズ設定
		var colLink
		colLink = document.getElementsByTagName("a");
		for (i = 0; i < colLink.length; i++) {
			colLink[i].style.width = Math.round(img_width / 3) - 10;
			colLink[i].style.height = 50;
		}
		// リスト部 折り返し設定
		var colList
		colList = document.getElementsByTagName("li");
		for (i = 0; i < colList.length; i++) {
			colList[i].style.cssFloat = "left"
		}
	} else {
		// 横画面 画面左側
		img_height = win_height;                      // 縦：イメージサイズ = 画面サイズ
		img_width  = Math.round(img_height / 3 * 4);  // 横：縦横比のみ設定
		// サイズを適用
		size_set();
		
		// 縦画面 画面右部
		// リンク部 横サイズ設定
		var colLink
		colLink = document.getElementsByTagName("a");
		for (i = 0; i < colLink.length; i++) {
			colLink[i].style.width = win_width - img_width - 10;
			colLink[i].style.height = Math.round(img_height / 11);
		}
		// リスト部 折り返し解除設定
		var colList
		colList = document.getElementsByTagName("li");
		for (i = 0; i < colList.length; i++) {
			colList[i].style.cssFloat = "none"
		}
	}
}

// サイズを適用
function size_set() {
	// ID=main,cam_imgに適用
	document.getElementById("main").style.width     = img_width;
	document.getElementById("main").style.height    = img_height;
	document.getElementById("cam_img").style.width  = img_width;
	document.getElementById("cam_img").style.height = img_height;
	// name=camImg（imgソースサイズに適用）
	document.camImg.width  = img_width;
	document.camImg.height = img_height;
}

//----------------------------------------------------------
// 画像表示
//----------------------------------------------------------
// カメラ7台 Name,ID配列 設定
var arrName = ["みたらい湾","伊藤公記念公園","虹ヶ浜海岸","室積海岸","島田川","光井川","冠山総合公園"];
var arrID = ["mitaraiwan","itoukoukinenkouen","nijigahama","murozumikaigan","shimadagawa","mitsuigawa","kanmuriyamakouen"];
// タイマーID変数
var TimerID;
// 読み込み中カメラ番号変数
var camNo;

// イメージ読み込み時 現在時間変数
var myDate;
// カメラ切り替え時 現在時間変数
var nowDate;

// 表示イメージアドレス
var imgSrc;

// カメラ アドレス
var camAdr = "http://camera.city.hikari.lg.jp:8080/getimage/?camName="

// 初期表示
function win_load() {
	// イメージ表示タグ設定
	camNo = document.getElementById("cam_No").value;
	view_img(camNo);
}

// 画像表示
function view_img(camNo) {
	myDate = new Date();
	nowDate = new Date();

	imgSrc = camAdr + arrID[camNo] + "&PAGE=" + myDate.getTime();
	document.getElementById("cam_img").innerHTML = "<img src='" + imgSrc + "' id='cam_Img' name='camImg' width='100%' height='100%'>";
	document.getElementById("cam_title").innerText = arrName[camNo];
	timeView();
	// イメージ先読み
	loadCamera();
}

// タイマー終了
function clearTimer() {
	clearTimeout(timerID);
}

// イメージ先読み
var tmpImg
function loadCamera() {
	// 先読みイメージ設定
	tmpImg = new Image(img_width, img_height);
	myDate = new Date();
	camNo = document.getElementById("cam_No").value;
	imgSrc = camAdr + arrID[camNo] + "&PAGE=" + myDate.getTime();
	tmpImg.src = imgSrc
	tmpImg.onload = drawCamera;
	setTimeout(function(){},0);
	// タイマー開始
	timerID = setTimeout("loadCamera()",5000); 
}

// 読み込み完了後表示
function drawCamera() {
	document.getElementById("cam_Img").src = tmpImg.src;
	nowDate= new Date();
	timeView();
}

// 日付時刻表示
function timeView() {
	document.getElementById("cam_txt").innerText 
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
	
	document.getElementById("cam_img").innerHTML = "<img src='" + imgSrc + "' id='cam_Img' name='camImg' width='100%' height='100%'>";
	
	document.getElementById("cam_No").value = camNo;
	view_img(camNo);
}

// コマンドの送信
function sendAction(strOpt){
	camNo = document.getElementById("cam_No").value;
	var url = "http://camera.city.hikari.lg.jp:8080/camctrl/?" + "camName=" + arrID[camNo] + "&" + strOpt;
	idummy.location = url;
}
