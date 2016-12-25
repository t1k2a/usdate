myTamaWidth = 40;   // 画像の幅(ピクセル)
myTamaHeight = 40;   // 画像の高さ(ピクセル)

myX = 0;  // 玉の現在位置(X)
myY = 0;  // 玉の現在位置(Y)
myXs = 0; // 玉の開始位置(X)
myYs = 0; // 玉の開始位置(Y)
myXe = 0; // 玉の最終位置(X)
myYe = 0; // 玉の最終位置(Y)

function myTamaMain(){
    myObj=document.getElementById("tama").style;
    myXs = document.body.scrollLeft;
    myYs = document.body.scrollTop;
    myXe = myXs +document.body.clientWidth - myTamaWidth;
    myYe = myYs + document.body.clientHeight - myTamaHeight;

   // 玉の移動角度(方向)を決める
   if (myX<=myXs) myAddX = Math.floor(Math.random()*20)+10;
   if (myY<=myYs) myAddY = Math.floor(Math.random()*20)+10;
   if (myX>=myXe) myAddX = (Math.floor(Math.random()*20)+10)*(-1);
   if (myY>=myYe) myAddY = (Math.floor(Math.random()*20)+10)*(-1);

   // 玉を移動
   myX = myX + myAddX;
   if      (myX < myXs) myX=myXs;
   else if (myX > myXe) myX=myXe;

   myY = myY + myAddY;
   if      (myY < myYs) myY=myYs;
   else if (myY > myYe) myY=myYe;

   myObj.left = myX;
   myObj.top  = myY;
}




setInterval( "myTamaMain()", 100 ); // 0.1秒周期に動かす
