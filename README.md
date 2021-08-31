# Js-Inputについて

javascriptでsetIntervalなどのメインループで入力判定を行う支援クラスです

 htmlで  js-input.js を 読み込ませると jsinputクラスが使えます

例：

<script type="text/javascript" charset="utf-8" src="js-input.js"></script>

本内容は index.htmlと同様です。
（リンク、参照などを見る場合はブラウザーでindex.htmlを開いてください）

サンプルプログラムは sample.html を参照してください
キーコードは keycode.html を参照してください
js-input.js がクラス本体です




## クラス JsInput

| メソッド                 |                                                              |
| ------------------------ | ------------------------------------------------------------ |
| add(vKey)                | 使いたいキーコード名を登録する<br /> vKey 仮想キー名  <br />初期化時に定義する<br /> input.add(input.vk_a); input.add(input.vk_b); input.add(input.vk_c); |
| exec()                   | メインループで毎回実行するもの <br />setInterval内のfunctionなどで定義する(メインループ) |
| show()                   | デバッグ用のコンソール表示 <br />setInterval内のfunction などで定義する(メインループ) |
| keyClear(vKey)           | 仮想キーの変数をクリアする                                   |
| clear()                  | 登録したすべての仮想キーの変数をクリアする                   |
| onDown(code)             | イベント登録用 keydown<br /> document.addEventListener("keydown", event => { input.onDown(event.keyCode); }); |
| onUp(code)               | イベント登録用 keyup<br /> document.addEventListener("keyup", event => { input.onUp(event.keyCode); }); |
| getClick(vKey)           | click判定(一度だけ判定) <br />vKey 仮想キー名 <br />setInterval内のfnctionなどで定義する(メインループ) <br />if( input.getClick(input.vk_a)) console.log("A 1回だけ処理"); |
| getRepeat(vKey)          | リピート数を返す<br /> vKey 仮想キー名 <br />setInterval内のfunctionなどで定義する(メインループ) <br />if(input.getRepeat(input.vk_a)==10) console.log("A リピートが10回押された"); |
| getLongPress(vKey,value) | 押しっぱなし判定(一度だけ判定) <br />vKey 仮想キー名 <br />value 時間(ms) setInterval内のfunctionなどで定義する(メインループ) <br />if( input.getLongPress(input.vk_a,1000)) console.log("A 1秒押しっぱなし"); |
| getLoopPress(vKey,value) | 押しっぱなし判定(一定時間を繰り返す)<br />vKey 仮想キー名<br />value 時間(ms) <br />setInterval内のfunctionなどで定義する(メインループ) <br />if(input.getLoopPress(input.vk_left,500)) console.log("left 500msで繰り返し 長押ししたら判定"); |
| getPress(vKey,value) | 押しっぱなし判定(クリック判定と一定時間を繰り返す)<br />vKey 仮想キー名<br />value 時間(ms) <br />setInterval内のfunctionなどで定義する(メインループ) <br />if(input.getPress(input.vk_left,500)) console.log("left クリック判定と500msで繰り返し"); |

