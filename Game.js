function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
}
// For Loading Images
function preload() {
  windows = loadAnimation('assets/windows.png');
  road2 = loadAnimation('assets/road2.png');
  luigi = loadAnimation('assets/luigi/sprite_0.png');
  yoshi = loadAnimation('assets/yoshi/sprite_0.png');
  toad = loadAnimation('assets/toad/sprite_0.png');
  fluigi = loadAnimation('assets/luigi_down/sprite_0.png');
  /*
    Example
    ghost = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
    */
}
// Create your variables here
var background2 = createSprite(200, 200);
background2.setAnimation("windows");
var road1 = createSprite(200, 200, 300, 1000);
var road3 = createSprite(250, 1000, 300, 1000);
road3.visible=false;

var road2 = createSprite(500, -400, 300, 1000);

road2.setAnimation("road2");
road2.visible= false;
road2.scale= 5;

var space = 0;
var Time = 5 ;
background2.scale=2;
var luigi = createSprite(50, 200);
luigi.setAnimation("luigi");
luigi.scale = .85;

var yoshi = createSprite(200, 200);
yoshi.setAnimation("yoshi");
yoshi.scale = .75;
var toad = createSprite(350, 200);
toad.setAnimation("toad");
toad.scale = .5;
 luigi.visible = false;
    yoshi.visible = false;
    toad.visible = false;

// Create your sprites here

function draw() {
  // draw background
  background("red");

  // update sprites

  drawSprites();
if (toad.y == 700 && yoshi.y == 700) {
  Gamestart();
  road1.visible= true;

}
else {
  road1.visible= false;
}
if (road1.visible=== true) {
  luigi.visible = true;
 CtrlPlayer();
screenmove();
}

  if (keyWentDown("space")) {
    space = space+1;
  }
  if (space==0) {
    Start();
  }
  if (space ==1) {
    background2.visible = true;
    Fighter();

  } else {
    background2.visible= false;

  }

}

// Create your functions here
function Start() {
 background("red");
 textSize(40);
 fill("white");
 textFont("comicsans");
 text("Kool Kart", 100, 200);
 textSize(20);
 text("Space to continue", 0, 15);
}
function Fighter() {
  luigi.visible = true;
    yoshi.visible = true;
    toad.visible = true;

fill("black");
textSize(30);
text("Choose Your Fighter", 50,100 );
text("press space once you pick", 30, 300);
  if (mousePressedOver(luigi)) {

    toad.y =700;
    yoshi.y = 700;
    textSize(20);

    luigi.x = 200 ;
    luigi.y = 200;
  }
    if (luigi.isTouching(road1) ||luigi.isTouching(road2)|| luigi.isTouching(road3) ){
    luigi.setCollider("rectangle",0,40, 100,20);

  }

}
function Gamestart() {
 fill("black");
 textSize(20);
 text(Time, 0, 15);

 if (World.seconds >= 5) {
   road1.velocityY= 3;
    road2.velocityY= 3;
 }

 if (World.seconds == 1) {
   Time=4;
 }
 if (World.seconds ==2) {
   Time=3;
 }
  if (World.seconds == 3) {
   Time=2;
 }
   if (World.seconds == 4) {
   Time=1;
 } if (World.seconds >= 5) {
   Time=0;
 }
}

  function CtrlPlayer() {

    if (keyDown("right")) {
      luigi.velocityX = 3;

    }
    if (keyDown("left")) {
      luigi.velocityX = -3;

    }
    if (keyDown("d")) {
      luigi.rotation= luigi.rotation + 2;
      luigi.velocityX= luigi.velocityX + .25;
    } else if (keyDown("a")) {
      luigi.rotation= luigi.rotation - 2;
      luigi.velocityX= luigi.velocityX - .25;
    } else {
      luigi.velocityY = 0;
      luigi.rotation = 0;
    }
    if (luigi.rotaion >= 180) {
      luigi.rotation = 0;

    } else if (luigi.rotation <= -180) {
      luigi.rotation =0;
    }

  }
function screenmove() {

if (road1.y >=200) {
  road2.visible=true;

}
if (luigi.isTouching(road2)) {
  road2.velocityX = -2;
}
  if(road2.x<-70){
    road2.velocityX=0;
    road2.velocityY=-3;

  }
else if (road2.y>=300) {
  road2.velocityX=-3;
  road2.velocityY=0;

}
if (road2.velocityY ==-3){
road3.velocityY=-3;
luigi.setAnimation("fluigi");
road3.visible= true;}

}
