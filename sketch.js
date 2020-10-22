var eagle;
var cloudsGroup, pigeonsGroup;
var eagleFlying, eagleDiving;
var pigeonFlying, cloudImage;
var ground;
var gameState=0;
var resetButton;
var resetButtonImage;

function preload() {
  eagleFlying = loadImage("pictures/Eagleflying.jpg");
  eagleDiving = loadImage("pictures/EagleDiving.jpg");
  pigeonFlying = loadImage("pictures/pigeonFlying.jpg");
  cloudImage = loadImage("pictures/cloudImage.png");
  resetButtonImage = loadImage("pictures/resetButton.jpg");
}

function setup() {
  createCanvas(1300,700);
  eagle = createSprite(200,200,50,50);
  eagle.addImage(eagleFlying);
  eagle.scale=0.5;
  cloudsGroup = new Group();
  pigeonsGroup = new Group();
  resetButton = createSprite(1200,50,40,10);
  resetButton.addImage(resetButtonImage);
  resetButton.scale=0.5;
  resetButton.visible=false;
  ground = createSprite(650,690,1300,20);
  ground.visible=false;
}

function draw() {
  background("blue");  
  if (gameState===0) {
    fill("white");
    textSize(25);
    text("You are the eagle. You have to eat all the pigeons to win. Press space to dive, press backspace to return.",50,340)
    text("Press 1 to start",600,380);
    if (keyWentDown("1")) {
      gameState=1;
    }
  } 
  else if(gameState===1) {
    spawnPigeons();
    spawnClouds();
    if (eagle.isTouching(ground)) {
      gameState=3;
    }  
    if(keyWentDown("space")){
      eagle.addImage(eagleDiving);
      eagle.velocityX=3;
      eagle.velocityY=3;
    }
    if(pigeonsGroup.isTouching(eagle)){
      pigeonsGroup.setVelocityEach(0,0);
      eagle.velocityX=0;
      eagle.velocityY=0;
      
      cloudsGroup.setVelocityEach(0,0);
      gameState=2;
    } 
  }
  if (gameState===2) {
      fill("white");
      textSize(25);
      text("You Win",650,350);
      pigeonsGroup.destroyEach();
      resetButton.visible=true;
      if (mousePressedOver(resetButton)){
        reset();
      }
   }
   if (gameState==3){
     eagle.visible=false;
     eagle.velocityX=0;
     eagle.velocityY=0;
     pigeonsGroup.setVelocityEach(0,0);
     cloudsGroup.setVelocityEach(0,0);
     fill("white");
     textSize(25);
     text("You Loose",650,350);
     resetButton.visible=true;
     if (mousePressedOver(resetButton)){
        eagle.visible=true;
        reset();
        pigeonsGroup.destroyEach();
     }
   }
  drawSprites();
}

function spawnPigeons(){
  if (World.frameCount%150==0) {
    var pigeon = createSprite(1200,550,20,20);
    pigeon.addImage(pigeonFlying);
    pigeon.scale=0.05;
    pigeon.velocityX=-5;
    pigeonsGroup.add(pigeon);
  }
}

function spawnClouds(){
  if (World.frameCount%120==0){
    var cloud = createSprite(1250,150,20,20);
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloudsGroup.add(cloud);
  }
}

function reset(){
  gameState=0;
  cloudsGroup.destroyEach();
  eagle.x=200;
  eagle.y=200;
  eagle.addImage(eagleFlying);
  resetButton.visible=false;
}