// rouletteオブジェクト
function jumpPage(){
    location.href = "09.html";
}

var roulette = {
    // 定数
    BING_NUMBER : 50, // この整数内でビンゴを行う
    BING_NUMBER_HALF : 0, // BING_NUMBERの半分の値を後で入れる
    ROULETTE_SPEED : 100, // ルーレット回転速度(ms)
    FADEIN_SPEED : 4000, // フェードイン速度(ms)
    // 英語表記用英数字
    ENGLISH_NUMBER_LIST_SMALL : [
        'one','two','three','four','five','six','seven','eight','nine','ten',
        'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'    
    ],
    ENGLISH_NUMBER_LIST_BIG : [
        '','','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety'    
    ],
    
    // プロパティ
    // 割とtemp的な変数も持っちゃってる
    id : '',
    stop_flg : false,
    rand : 0,
    number : 0,
    number_english : '',
    select_number_list : [],
    past_number_list : [],
    $bing_number : {},
    $past_number_early_ul : {},
    $past_number_late_ul : {},
    
    // 初期化する
    init : function(){
        // bing_numberのjqueryオブジェクトを取っておく
        roulette.$bing_number = $('#bing_number');
        // 全体のwidthをウィンドウの大きさに設定
        $('#wrapper').css({
            width: $(document).width()
        });
        // ルーレットの使う数の半分を持つ
        roulette.BING_NUMBER_HALF = Math.floor(roulette.BING_NUMBER / 2);
        
        // ルーレットで使用する候補整数列を生成
        for (var i = 0; i < roulette.BING_NUMBER; i++) {
            roulette.select_number_list[i] = i + 1;
        }
        
        // 過去に出た数字を表示する領域を生成
        // 1列目
        var li = '';
        roulette.$past_number_early_ul = $('<ul>').addClass('past_number_list');
        for (var i = 1; i <= roulette.BING_NUMBER_HALF; i++) {
            li += '<li><div class="background_box">&nbsp;</div></li>';
        }
        roulette.$past_number_early_ul.append(li);
        $('#past_number_list_early').append(roulette.$past_number_early_ul);
        
        // 2列目
        li = '';
        roulette.$past_number_late_ul = $('<ul>').addClass('past_number_list');
        for (i = roulette.BING_NUMBER_HALF + 1; i <= roulette.BING_NUMBER; i++) {
            li += '<li><div class="background_box">&nbsp;</div></li>';
        }
        roulette.$past_number_late_ul.append(li);
        $('#past_number_list_late').append(roulette.$past_number_late_ul);
        
	// 各要素の大きさ、font-sizeなどを定義
        // li要素のwidth、height、font-sizeをウインドウサイズに合わせる
        var list_size = Math.floor($('.past_number_list').width() / (roulette.BING_NUMBER_HALF+7));
        $('.past_number_list > li').width(list_size);
        $('.past_number_list > li').height(list_size);
        $('.past_number_list > li').css({fontSize:list_size+'px'});
        // .past_number_listも高さをlist_sizeの2倍にする
        $('.past_number_list').height(list_size * 2);
	$('');
	
        // ルーレットの数字を回転中のcssに設定
        roulette.$bing_number.attr('id', 'bing_number_rolling');
    },
    
    // ルーレットを止める
    stop : function() {
        roulette.stop_flg = true;
    },
    
    // ルーレット回転中
    running : function(){
        // 回してるように見えるようダミー回転
        roulette.rand = Math.floor( Math.random() * roulette.BING_NUMBER );
        // 停止ボタンが押された
        if (roulette.stop_flg) {
            // setIntervalを解放
            clearInterval(roulette.id);
            roulette.number_english = '';
            // 実際のルーレット
            roulette.rand = Math.floor( Math.random() * roulette.select_number_list.length );
            roulette.number = roulette.select_number_list[roulette.rand];
            
            // 英語文字列生成
            var english_str = 0;
            if (roulette.number < 20) {
                english_str = roulette.ENGLISH_NUMBER_LIST_SMALL[roulette.number-1];
                for (var i = 0; i < english_str.length; i++) {
                    roulette.number_english += english_str.charAt(i)+'&nbsp;&nbsp;&nbsp;&nbsp;';
                }
            }
            else {
                english_str = roulette.ENGLISH_NUMBER_LIST_BIG[Math.floor(roulette.number/10)];
                for (var i = 0; i < english_str.length; i++) {
                    roulette.number_english += english_str.charAt(i)+'&nbsp;&nbsp;&nbsp;&nbsp;';
                }
                if (roulette.number % 10 != 0) {
                    roulette.number_english += '&nbsp;&nbsp;&nbsp;&nbsp;';
                    english_str = roulette.ENGLISH_NUMBER_LIST_SMALL[roulette.number-Math.floor(roulette.number/10)*10-1];
                    for (var i = 0; i < english_str.length; i++) {
                        roulette.number_english += english_str.charAt(i)+'&nbsp;&nbsp;&nbsp;&nbsp;';
                    }    
                }
            }
            
            // 出た数字の表示処理
            roulette.$bing_number
            // var numberVal = parseInt($("roulette.$bing_number").val())
            // console.log(parseInt(numberVal))
            // 一旦非表示
            //.hide()
            // idを回転用から表示用に変更
            .attr('id', 'bing_number_decide')
            // その隙に数字を入れておく
            .text(roulette.number)
            // フェードインさせる
            .fadeIn(roulette.FADEIN_SPEED);
            
	    // 英数字を同じようにフェードイン
            $('#number_english')
            .hide()
            .html(roulette.number_english)
            .fadeIn(roulette.FADEIN_SPEED);
            
            // 出た数を保存
            roulette.past_number_list[roulette.number] = roulette.number;
            var numberVal = roulette.number;
            console.log(numberVal);
            if(numberVal <= 25){
                // function jumpPage(){
                //  location.href = "Result.html";
                // }
                setTimeout("jumpPage()",2*1000);
            }else if(numberVal >= 26){
                // function jumpPage(){
                //  location.href = "Result.html";
                // }
                setTimeout("jumpPage()",2*1000);
            }
            // 今回表示する数字を候補配列から削除して配列を詰める
            roulette.select_number_list.splice(roulette.rand, 1);
            // ボタンのclickイベントをもとに戻す
            $('#exe_button').off('click')
            .on('click', roulette.execute)
            .text('Roulette!!');
            
        }
        else {
            // ストップされなかったら数字を表示するだけ
            roulette.$bing_number.text(roulette.rand);
        }
    },
    
    // 初期化してルーレットを走らせる
    execute : function(){
        // ここで過去に出た数字を表示
        // 0より大きく半分より下の値であればearlyに入れる
        if (0 < roulette.number && roulette.number <= roulette.BING_NUMBER_HALF) {
            $(roulette.$past_number_early_ul[0].childNodes[roulette.number-1]).hide().text(roulette.number).fadeIn(1000);
        }
        // 上の値であればlateに入れる
        else {
            $(roulette.$past_number_late_ul[0].childNodes[roulette.number - roulette.BING_NUMBER_HALF-1]).hide().text(roulette.number).fadeIn(1000);
        }
        // リストが空になったら終了して走らせない
        if (roulette.select_number_list.length == 0) {
            alert('終了しました');
            return false;
        }
        // ボタンのclickイベントを停止するよう付け替える
        $('#exe_button').off('click')
        .on('click', roulette.stop)
        .text('Stop!!');
        
        // 初期化
        roulette.$bing_number.attr('id', 'bing_number_rolling');
        roulette.stop_flg = false;
        
        // 英語表記を消す
        $('#number_english').fadeOut(500,function(){$('#number_english').html('&nbsp;').show();});
        // ルーレットを走らせてidを取っておく
        roulette.id = setInterval(roulette.running, roulette.ROULETTE_SPEED);
    }
};

// エンターキーでボタンクリック動作
function enter_key2push_button(e) {
    if (e.keyCode == 13) {
        // デフォルトのsubmitイベントを止める
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.returnValue = false;
        }
        // ボタンをclickさせる
        $('#exe_button').click();
    }
}

// 読み込み時実行
$(function(){
    roulette.init();
    // イベントをバインド
    $('#exe_button').on('click', roulette.execute);
    $(document).on('keydown', enter_key2push_button);
});