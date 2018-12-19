/*
 __ __            __   __ __           __  __
   / //_/___  ____  / /  / //_/___ ______/ /_/ /
  / ,< / __ \/ __ \/ /  / ,< / __ `/ ___/ __/ / 
 / /| / /_/ / /_/ / /  / /| / /_/ / /  / /_/_/  
/_/ |_\____/\____/_/  /_/ |_\__,_/_/   \__(_)   
                                                

  Created by Dylan Bober and Eric Galluzzi of Mr. Martin's 1st period

   __  __                  ______      _     __   
  / / / /_______  _____   / ____/_  __(_)___/ /__ 
 / / / / ___/ _ \/ ___/  / / __/ / / / / __  / _ \
/ /_/ (__  )  __/ /     / /_/ / /_/ / / /_/ /  __/
\____/____/\___/_/      \____/\__,_/_/\__,_/\___/

Controls
Up Arrow- Forward
Left Arrow- Left
Right Arrow- Right

Goals: 

*Get a high score
*Do so by collecting Ana (the bannana)
*Avoid Spikes


*/


// First, we need to set a few things up...


//Pause Screen
var unpauseButton = createSprite(200, 250);
unpauseButton.setAnimation("button_continue.png_1");

//Restart Button
var restartButton = createSprite(200, 350);
restartButton.setAnimation("restart");
restartButton.visible= false;


//Char. Select Background
var background2 = createSprite(200, 200);
background2.setAnimation("windows");
background2.scale=2;

// 100% Gluten-Free Homemade Road
var road1 = createSprite(200, 200, 300, 1000);
road1.setAnimation("road1");
road1.scale = 5;

// Ana
var ana = createSprite(randomNumber(60, 340), 50);
ana.setAnimation("bananaana");
ana.visible=false;
ana.scale = 0.2;

//Spikey
var spikey = createSprite(randomNumber(50, 350),0);
spikey.setAnimation("spikey");
spikey.visible= false;
spikey.velocityY = 3;
spikey.scale = 0.2;

// Placeholder for player control
var player;
var s5frame = 1;

// TOMAS AMBROSINI
var TOMAS = createSprite(200,200, 400, 400);
TOMAS.setAnimation("TOMAS");
TOMAS.scale = 2.7;

// Luigi
var luigi = createSprite(50, 200);
luigi.setAnimation("luigi");
luigi.scale = 0.75;

// Yoshi
var yoshi = createSprite(200, 200);
yoshi.setAnimation("yoshi");
yoshi.scale = 0.75;

// Toad
var toad = createSprite(350, 200);
toad.setAnimation("toad");
toad.scale = 0.5;

    
//Make Sprites Invisble
background2.visible = false;
yoshi.visible = false;
luigi.visible = false;
toad.visible = false;
road1.visible = false;
spikey.visible = false;
unpauseButton.visible = false;
  
// One run only code feasibility, Screens, and score
var curScreen = 1;
var s1frame = 1;
var s2frame = 1;
var s3frame = 1;
var score = 0;

// Debug Stuff

function draw() {
  
  drawSprites();
  
  // CurScreen Uno
  if (curScreen == 1) {
    
  textSize(60);
  fill("red");
  // The best font
  textFont("Papyrus");
  text("Kool Kart", 100, 200);
  textSize(20);
  text("Space to continue", 0, 15);
  text("controls and goals", 0, 50);
  text("Up Arrow- Forward, Left Arrow- Left", 0, 100);
  text("Right Arrow- Right", 0, 125);
   text("*Get a high score, Do so by collecting the banana", 0, 300);
  text("Avoid Spikes, (-5 score = you lose)", 0, 350);
  
  //Visibility
  background2.visible = false;
  yoshi.visible = false;
  luigi.visible = false;
  toad.visible = false;
  road1.visible = false;
  spikey.visible = false;
  unpauseButton.visible = false;
  ana.visible = false;
  TOMAS.visible = true;
  restartButton.visible = false;
  score = 0;
  
  if (keyWentDown("space")) {
    curScreen = 2;
  }
}

  // CurScreen Dos
if (curScreen == 2) {
  
  if (s2frame == 1){
     background("red");
     TOMAS.visible = false;
     s2frame = 2;
  }
  
  charSelect();
 
}

// CurScreen Tres
if (curScreen == 3) {
  
  // First Run
  if (s3frame == 1){
     background("white");
     s3frame = 2;
     ana.velocityY=3;
  }

// Visibility
  road1.visible = true;
  toad.visable = true;
  luigi.visable =true;
  yoshi.visible = true;
  ana.visible=true;
  spikey.visible = true;
  
  setAnaAndSpikey();

  slowdown();
  
  CtrlPlayer();
  
  road1.play();
  
  cheatMode();
  
  checkGameOver();
  
  //Score
  textSize(50);
  fill("red");
  text(score, 20, 40);
  
//Need a Pause?
if (keyWentDown("p")) {
  curScreen = 4;
}

}

if (mousePressedOver(restartButton)) {
    curScreen = 1;
    s1frame = 1;
    s2frame = 1;
    s3frame = 1;
    score = 0;
  }

if (curScreen == 4) {
  textSize(20);
  text('Game Paused', 150, 75);
  unpauseButton.visible = true;
  restartButton.visible = true;
  background2.visible = false;
  player.visible = false;
  road1.visible = false;
  spikey.visible = false;
  ana.visible = false;
 
  
  if (mousePressedOver(unpauseButton)) {
    curScreen= 3;
    player.visible = true;
  }
  if (mousePressedOver(restartButton)) {
    curScreen= 1;
    s1frame = 1;
    s2frame = 1;
    s3frame = 1;
  }
}
}

 

// Functions

function setAnaAndSpikey() {
  if (ana.y >= 420 || player.isTouching(ana)) {
    
    if (player.isTouching(ana)) {
      score = score + 1;
      playSound("sound://category_digital/win.mp3");
    }
    
    ana.x = randomNumber(60, 340);
    ana.y = -60;
    ana.velocityY = randomNumber(2.5, 4);
  }

  if (spikey.y >= 420 || player.isTouching(spikey)) {
    
    if (player.isTouching(spikey)) {
      score = score - 3;
    }
    
    spikey.x = randomNumber(60, 340);
    spikey.y = -60;
    spikey.velocityY = randomNumber(2.5, 3.5);
  }
  
  // Advancement
    if (score >= 15) {
    ana.velocityY + 40;
    spikey.velocityY + 100;
  }
}

function charSelect() {
  luigi.visible = true;
  yoshi.visible = true;
  toad.visible = true;
  luigi.x = 100;
  luigi.y = 200;
  yoshi.x = 200;
  yoshi.y = 200;
  toad.x = 300;
  toad.y = 200;
    
fill("black");
textSize(30);
textFont("papyrus");
text("Choose Your Fighter", 50,100 );
text("press space once you pick", 30, 300);

if (mousePressedOver(yoshi)) {
  curScreen = 3;
  player = yoshi;
  toad.y= 1000;
  luigi.y= 1000;
  yoshi.x = 200;
  yoshi.y = 300;
}

if (mousePressedOver(toad)) {
  curScreen = 3;
  player = toad;
  yoshi.y= 1000;
  luigi.y= 1000;
  toad.x = 200;
  toad.y = 300;
}

if (mousePressedOver(luigi)) {
  curScreen = 3;
  player = luigi;
  toad.y= 1000;
  yoshi.y= 1000;
  luigi.x = 200;
  luigi.y = 300;
  }
}


  


  function CtrlPlayer() {

    if (keyDown("right")) {
      player.velocityX = 3;
      
    }
    if (keyDown("left")) {
      player.velocityX = -3;
      
    } 
    if (keyDown("d")) {
      player.rotation= player.rotation + 2;
      player.velocityX= player.velocityX + 0.25;
    } else if (keyDown("a")) {
      player.rotation= player.rotation - 2;
      player.velocityX= player.velocityX - 0.25;
    } else {
      player.velocityY = 0;
      player.rotation = 0;
    }
    if (player.rotaion >= 180) {
      player.rotation = 0;
      
    } else if (player.rotation <= -180) {
      player.rotation =0;
    }
  
    
    
  }
  
function slowdown() {
if (player.velocityX >= 0.01) {
    player.velocityX = player.velocityX - 0.08;
  }

if (player.velocityX <= -0.01) {
    player.velocityX = player.velocityX + 0.08;
  }
}

function checkGameOver() {
  
  if (score < -4) {
    curScreen = 5;
    playSound("sound://category_male_voiceover/you_lose_male.mp3");
    s5frame = 2;
    road1.visible = false;
    player.visible = false;
    spikey.visible = false;
    ana.visible = false;
    background("red");
    restartButton.visible = true;
  }
}
//Extra
function cheatMode() {
  if (keyWentDown("c")) {
  score = score + 5;
  }
}
