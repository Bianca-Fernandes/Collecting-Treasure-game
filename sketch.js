//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var path, boy, cash, diamonds, jewellery, sword, retry;
var pathImg, boyImg, cashImg, diamondsImg, jewelleryImg, swordImg, endImg, retryImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var song;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamond.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("swords.png");
  endImg =loadAnimation("gameover.png");
  retryImg = loadImage("retry.png");
  song = loadSound("bgSound.mp3");
}

function setup(){
  
  createCanvas(400,470);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,390,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
retry = createSprite (200, 300);
retry.addImage(retryImg);
retry.scale = 0.25;
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

  boy.setCollider("circle", 0, 0, 550);
  song.play();
}

function draw() {

  background(0);
  if(gameState === PLAY){
     boy.x = World.mouseX;
     edges= createEdgeSprites();
     boy.collide(edges);
  retry.visible = false;
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
    
    createCash();
    createDiamonds();
    createJewellery();
    createSword(); 
    
    if(cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100;
      
    }else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollection = treasureCollection+150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        swordGroup.destroyEach();
    }
  }
  }
  
if(gameState === END){
  song.stop();
  boy.addAnimation("SahilRunning", endImg);
  boy.y = 235;
  boy.x = 200;
  boy.scale = 1;
  path.velocityY = 0;
  boy.velocityX = 0;
  retry.visible = true;
  if(mousePressedOver(retry)){
    reset();
  }
  
  cashG.destroyEach();
  diamondsG.destroyEach();
  jewelleryG.destroyEach();
  
  cashG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  jewelleryG.setVelocityYEach(0); 
}
  drawSprites();
  textSize(25);
  fill("gold");
  text("Treasure: "+ treasureCollection,140,30);
}

function reset(){
  gameState = PLAY;
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.x = 70;
  boy.y = 390;
  song.play();
  retry.visible = false;
  cashG.destroyEach();
  diamondsG.destroyEach();
  jewelleryG.destroyEach();
  treasureCollection = 0;
}
function createCash() {
  if (World.frameCount % 80 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 90 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.2;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 100 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.2;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}