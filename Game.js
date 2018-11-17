function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
}
// Variables
var score = 0;
// Create Sprites
var player = createSprite(200, 300);
player.setAnimation("alien");

var leftWall = createSprite(0, 200, 10, 400);
var rightWall = createSprite(400, 200, 10, 400);

var platform1 = createSprite(300,0);
platform1.setAnimation("platform");
platform1.velocityY = 1.3;
var platform2 = createSprite(100,-200);
platform2.setAnimation("platform");
platform2.velocityY = 1.3;

var star = createSprite(randomNumber(50, 350), randomNumber(-60, -30));
star.setAnimation("star");
star.velocityY = 2.5;

var star2 = createSprite(randomNumber(50, 350), randomNumber(-60, -30));
star2.setAnimation("star");
star2.velocityY = 2.5;

function draw() {
  // draw the background
  if (score < 30) {
    background1();
  }
else {
  background2();
}
showScore();
text(score, 70, 29);
  // update the sprites
loopPlatform1();
loopPlatform2();
loopItems();
loopItems2();
playerFall();
controlPlayer();
playerLands();
collectItems();
noOffScreenPlayer();
drawSprites();
}

// Functions
function background1() {
  background("darkBlue");
  noStroke();
  fill("yellow");
  ellipse(randomNumber(0, 400), randomNumber(0, 400), 3, 3);
  ellipse(randomNumber(0, 400), randomNumber(0, 400), 3, 3);
  ellipse(340, 50, 60, 60);
  fill("darkBlue");
  ellipse(320, 30, 60, 60);
}
function background2() {
  background("darkBlue");
  noStroke();
  fill("red");
  ellipse(randomNumber(0, 400), randomNumber(0, 400),4, 4);
  ellipse(randomNumber(0, 400), randomNumber(0, 400), 4, 4);
  ellipse(340, 50, 60, 60);
  fill("darkBlue");
  ellipse(320, 30, 60, 60);
}
function showScore() {
  fill("white");
  textSize(20);
  text("Score: ",10, 10, 80, 20);
}
function loopPlatform1() {
  if (platform1.y > 400) {
    platform1.y = -20;
  }
}
function loopPlatform2() {
  if (platform2.y > 400) {
    platform2.y = -20;
  }
}
function loopItems() {
  if (star.y > 420) {
    star.x = randomNumber(50, 350);
    star.y = randomNumber(-60, -30);
  }
}

function loopItems2() {
  if (star2.y > 420) {
    star2.x = randomNumber(50, 350);
    star2.y = randomNumber(-60, -30);
  }

}

function playerFall() {
  player.velocityY = 1.5;
}

function controlPlayer() {
  if (keyDown("left")) {
    player.x = player.x - 4;
    player.setAnimation("alien_left");
  }

  if (keyDown("right")) {
    player.x = player.x + 4;
    player.setAnimation("alien");
  }

  if (keyDown("up")) {
    player.velocityY = - 3;
  }
}

function playerLands() {
  player.collide(platform1);
  player.collide(platform2);
}

function collectItems() {
  if (player.isTouching(star)) {
    star.x = randomNumber(50, 350);
    star.y = randomNumber(-60, -30);
    score = score + 1;
  }
  if (player.isTouching(star2)) {
    star2.x = randomNumber(50, 350);
    star2.y = randomNumber(-60, -30);
    score = score + 1;
  }
}

function noOffScreenPlayer() {
  player.collide(leftWall);
  player.collide(rightWall);
}
