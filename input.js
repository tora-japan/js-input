﻿//-----------------------------------------------------------------------------
//
// キー入力用クラス
//
//-----------------------------------------------------------------------------

// キーコード、名称、コード確認の参考サイト
// https://web-designer.cman.jp/javascript_ref/keyboard/keycode/
// http://www.rinneza.com/junya/tech/keyboard_name.html
// https://web-designer.cman.jp/javascript_ref/keyboard/keycode/

/*
 * サンプル
 */

/*
<script type="text/javascript">

// 初期化
input = new Input();
// 登録
input.add(input.vk_a);
input.add(input.vk_left);
input.add(input.vk_right);

// イベントを追加：キーダウン
document.addEventListener("keydown", event => {
    input.onDown(event.keyCode);
});
// イベントを追加：キーアップ
document.addEventListener("keyup", event => {
    input.onUp(event.keyCode);
});

// インターバル
setInterval(function () {
  input.exec(); // 必ず呼び出すこと。
//  input.show(); // 状態を確認したいとき

  // キー判定
  if( input.getClick(input.vk_a))
  {
    console.log("A 1回だけ処理");
  }
  // 時間で判定
  if( input.getLongPress(input.vk_a,1000))
  {
    console.log("A 1秒押しっぱなし");
  }

  // リピート数で判定
  if(input.getRepeat(input.vk_a)==10)
  {
    console.log("A リピートが10回押された");
  }

  if(input.getLoopPress(input.vk_left,500))
  {
    console.log("left 500msで繰り返し");
  }
  if(input.getLoopPress(input.vk_right,500))
  {
    console.log("right 500msで繰り返し");
  }
}, 50);

</script>
*/



class Input
{
  // コンストラクタ―
  constructor()
  {
    this.keys=[];     // 判定したいキー（連想配列）
    this.click=[];    // クリック状態
    this.down=[];     // 押す・放すの状態
    this.repeat=[];   // 繰り返し
    this.time=[];     // 時間(ミリ秒)
    this.usedTime=[]; // 時間判定使用済
    this.keyState=[]; // キーの状態(仮想キーのコード番号を入れるもの)

    //
    // キーコード
    //
    this.vk_a=65;               // a
    this.vk_b=66;               // b
    this.vk_c=67;               // c
    this.vk_d=68;               // d
    this.vk_e=69;               // e
    this.vk_f=70;               // f
    this.vk_g=71;               // g
    this.vk_h=72;               // h
    this.vk_i=73;               // i
    this.vk_j=74;               // j
    this.vk_k=75;               // k
    this.vk_l=76;               // l
    this.vk_m=77;               // m
    this.vk_n=78;               // n
    this.vk_o=79;               // o
    this.vk_p=80;               // p
    this.vk_q=81;               // q
    this.vk_r=82;               // r
    this.vk_s=83;               // s
    this.vk_t=84;               // t
    this.vk_u=85;               // u
    this.vk_v=86;               // v
    this.vk_w=87;               // w
    this.vk_x=88;               // x
    this.vk_y=89;               // y
    this.vk_z=90;               // z

    this.vk_numpad0=96;         // numpad0
    this.vk_numpad1=97;         // numpad1
    this.vk_numpad2=98;         // numpad2
    this.vk_numpad3=99;         // numpad3
    this.vk_numpad4=100;        // numpad4
    this.vk_numpad5=101;        // numpad5
    this.vk_numpad6=102;        // numpad6
    this.vk_numpad7=103;        // numpad7
    this.vk_numpad8=104;        // numpad8
    this.vk_numpad9=105;        // numpad9
    this.vk_numpadMul=106;      // numpad*
    this.vk_numpadAdd=107;      // numpad+
    this.vk_numpadMinus-=109;   // numpad-
    this.vk_numpadPeriod=110;   // numpad.
    this.vk_numpadDiv=111;      // numpad/

    this.vk_f1=112;             // f1
    this.vk_f2=113;             // f2
    this.vk_f3=114;             // f3
    this.vk_f4=115;             // f4
    this.vk_f5=116;             // f5
    this.vk_f6=117;             // f6
    this.vk_f7=118;             // f7
    this.vk_f8=119;             // f8
    this.vk_f9=120;             // f9
    this.vk_f10=121;            // f10
    this.vk_f11=122;            // f11
    this.vk_f12=123;            // f12

    this.vk_backspace=8;        // backspace
    this.vk_tab=9;              // tab
    this.vk_enter=13;           // enter
    this.vk_shift=16;           // shift
    this.vk_ctrl=17;            // ctrl
    this.vk_alt=18;             // alt
    this.vk_pausebreak=19;      // pausebreak
    this.vk_esc=27;             // esc
    this.vk_space=32;           // space
    this.vk_pageup=33;          // pageup
    this.vk_pagedown=34;        // pagedown
    this.vk_end=35;             // end
    this.vk_home=36;            // home
    this.vk_left=37;            // left
    this.vk_up=38;              // up
    this.vk_right=39;           // right
    this.vk_down=40;            // down
    this.vk_insert=45;          // insert
    this.vk_delete=46;          // delete
    this.vk_numlock=144;         // numlock

    // !1 "2 #3 $4 %5 &6 '7 (8 )9  0
    this.vk_1= 49;              // !1
    this.vk_2= 50;              // "2
    this.vk_3= 51;              // #3
    this.vk_4= 52;              // $4
    this.vk_5= 53;              // %5
    this.vk_6= 54;              // &6
    this.vk_7= 55;              // '7
    this.vk_8= 56;              // (8
    this.vk_9= 57;              // )9
    this.vk_0= 48;              // 0

    // =- ^~ |\ @` [{ ;+ :* ]} <, >. /? \_
    this.vk_eq=173;             // =-
    this.vk_caret=160;          // ^~
    this.vk_verticalbar=220;    // |\
    this.vk_at=64;              // @`
    this.vk_leftbracket=219;    // [{
    this.vk_semicolon=59;       // ;+
    this.vk_colon=58;           // :*
    this.vk_rightbracket=221;   // ]}
    this.vk_lessthan=188;       // <,
    this.vk_greaterthan=190;    // >.
    this.vk_slash=191;          // /?
    this.vk_underscore=220;     // \_
  }

  // キーを追加する
  add(vKey)
  {
    this.keys[vKey]=vKey;
    this.click[vKey]=0;
    this.down[vKey]=0;
    this.repeat[vKey]=0;
    this.time[vKey]=0;
    this.usedTime[vKey]=0;
  }
  // キーを複数登録する
  addKeys(keys)
  {
    for(var i=0;i<keys.length;i++)
    {
      // print(keys[i]);
      this.add(keys[i]);
    }
  }

  // メインループ時に毎回実行する関数
  exec()
  {
    // 配列を列挙する
    for(var vKey in this.keys)
    {
      if( this.keyState[vKey] == undefined ) continue;
//      console.log(vKey,this.keyState[vKey] );

      if( this.keyState[vKey] )
      {
        // 最初に押されていた場合、開始時間を記録する
        if(this.down[vKey]==0)
        {
          // UNIXタイムスタンプを取得する (ミリ秒単位)
          this.time[vKey]=new Date().getTime();
          this.usedTime[vKey]=0;
          this.click[vKey]=1;   // クリックフラグ
        }
        this.down[vKey]=1;    // 押されたフラグ
        // リピートのカウント 9999で上限を設ける
        if(++this.repeat[vKey]>=Number.MAX_VALUE-1)
        {
          this.repeat[vKey]=Number.MAX_VALUE-1;
        }
      }else{
        this.usedTime[vKey]=0;
        this.down[vKey]=0;    // 放された
        this.repeat[vKey]=0;  // リピートを初期化
        // clickはここでは初期化しない
      }
    }
  }
  show()
  {
    for(var vKey in this.keys)
    {
      if(this.down[vKey])
      {
        console.log("vKey time down click rep",
          vKey,
          this.time[vKey],
          this.down[vKey],
          this.click[vKey],
          this.repeat[vKey]);
      }
    }
  }
  // イベント用 keydown
  onDown(vKey)
  {
    this.keyState[vKey]=1;
  }
  // イベント用 keyup
  onUp(vKey)
  {
    this.keyState[vKey]=0;
  }
  // キーのフラグをクリア
  keyClear(vKey)
  {
    this.click[vKey]=0;
    this.down[vKey]=0;
    this.repeat[vKey]=0;
    this.time[vKey]=0;
    this.usedTime[vKey]=0;
  }
  // 状態のクリアー
  clear()
  {
    for(var vKey in this.keys)
    {
      // 初期化
      this.click[vKey]=0;
      this.down[vKey]=0;
      this.repeat[vKey]=0;
      this.time[vKey]=0;
      this.usedTime[vKey]=0;
    }
  }
  // click判定(一度だけ判定)
  getClick(vKey)
  {
    if(this.click[vKey])
    {
      this.click[vKey]=0;       // 自動でクリック状態を消す
      return 1;
    }
    return 0;
  }
  // リピート数を返す
  getRepeat(vKey)
  {
    return input.repeat[vKey];
  }
  // 押しっぱなし判定(一度だけ判定)
  getLongPress(vKey,value)
  {
    if(this.usedTime[vKey]==0)
    if(this.down[vKey])
    {
      if( this.time[vKey] + value  <= new Date().getTime())
      {
        this.usedTime[vKey]=1;  // 時間判定用：使用済を立てる
        return 1;
      }
    }
    return 0;
  }
  // 押しっぱなし判定(一定時間を繰り返す)
  getLoopPress(vKey,value)
  {
    if(this.down[vKey])
    {
      if( this.time[vKey] + value  <= new Date().getTime())
      {
        this.time[vKey] = new Date().getTime();
        return 1;
      }
    }
    return 0;
  }
};

