//Test Import
var script1 = document.createElement('script');
script1.type = 'text/javascript';
script1.src = 'lib/p5.min.js';
document.getElementsByTagName('head')[0].appendChild(script1);

var script2 = document.createElement('script');
script2.type = 'text/javascript';
script2.src = 'lib/p5.play.js';
document.getElementsByTagName('head')[0].appendChild(script2);

var script3= document.createElement('script');
script3.type = 'text/javascript';
script3.src = 'lib/p5.dom.js';
document.getElementsByTagName('head')[0].appendChild(script3);

var script4 = document.createElement('script');
script4.type = 'text/javascript';
script4.src = 'lib/p5.sound.js';
document.getElementsByTagName('head')[0].appendChild(script4);

// Start-Up
function setup() {
  createCanvas(400, 400);
	var background2 = createSprite(200, 200);
	var road1 = createSprite(200, 200, 300, 1000);
	var road2 = createSprite(500, -400, 300, 1000);
	var road3 = createSprite(250, 1000, 300, 1000);
	var luigi = createSprite(50, 200);
	var yoshi = createSprite(200, 200);
	var toad = createSprite(350, 200);
}

// Loading Images
function preload() {
  windows = loadAnimation("assets/windows.png");
  road2 = loadAnimation("assets/road2.png");
  luigi = loadAnimation("assets/luigi/luigi_left.png");
  yoshi = loadAnimation("assets/yoshi/yoshi_left.png");
  toad = loadAnimation("assets/toad/toad_left.png");
}
// Create your variables here
background2.setAnimation("windows");
background2.scale=2;

// Roads
road2.setAnimation("road2");
road2.visible= false;
road3.visible=false;
road2.scale= 5;

var space = 0;
var Time = 5 ;

// Characters
luigi.setAnimation("luigi");
luigi.visible = false;
luigi.scale = 0.85;


yoshi.setAnimation("yoshi");
yoshi.visible = false;
yoshi.scale = 0.75;

toad.setAnimation("toad");
toad.visible = false;
toad.scale = 0.5;

function draw() {
  // Draw Background
	background("red");

  // Update Sprites
  drawSprites();

// Processing
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
    PlayersVisable();
	}
	else {
    background2.visible= false;
  }

}

// Functions
function Start() {
 background("red");
 textSize(40);
 fill("white");
	//Wowwww... Comic Sans... We should have used Papyrus...
 textFont("comicsans");
 text("Kool Kart", 100, 200);
 textSize(20);
 text("Press Space to Continue", 0, 15);
}

function PlayersVisable() {
  luigi.visible = true;
  yoshi.visible = true;
  toad.visible = true;

fill("black");
textSize(30);
text("Choose Your Fighter", 50,100 );
text("Press Space When Done", 30, 300);

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
	}
	if (World.seconds >= 5) {
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
  }

	else if (keyDown("a")) {
      luigi.rotation= luigi.rotation - 2;
      luigi.velocityX= luigi.velocityX - .25;
    }

	else {
      luigi.velocityY = 0;
      luigi.rotation = 0;
    }

  if (luigi.rotaion >= 180) {
      luigi.rotation = 0;
	}

	else if (luigi.rotation <= -180) {
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
		// Commented Out For Debug Purposes- 11/23/18: luigi.setAnimation("fluigi");
		road3.visible= true;
	}

}
