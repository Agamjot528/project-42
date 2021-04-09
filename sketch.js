
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var gameState=0
var jungleimage,jungle;
function preload(){
  
  
  monkey_running = loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png")
  monkey_collided= loadImage("images/sprite_0.png")
  bananaImage = loadImage("images/banana.png");
  obstaceImage = loadImage("images/obstacle.png");
 gameoverimage = loadImage("images/gameOver.png");
 restartimage = loadImage("images/restart.png");
  jungleimage=loadImage("images/jungle.jpg");
}



function setup() {
  createCanvas(400,400);
  
  jungle=createSprite(200,200);
  
  jungle.addImage(jungleimage);
  
  monkey=createSprite(80,385,20,20);
  monkey.addAnimation("moving ",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale=0.1;
  
  ground=createSprite(400,390,900,10);
  
  gameover=createSprite(202,100,20,20);
  gameover.addImage(gameoverimage);

  restart=createSprite(190,250,20,20);
  restart.addImage(restartimage);

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  
}


function draw() {
  background("white");
   
  
  if (gameState === 0){
    food();
    obstacles();
    monkey.changeAnimation("moving ", monkey_running);
    jungle.velocityX=-2;
  }

  ground.visible=false;
  gameover.visible=false;
  restart.visible=false;
  
  if(keyDown("space")) {
          monkey.velocityY = -12;
      }

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.4;


    if(jungle.x<0){
      jungle.x=jungle.width/2;
    }
  
  if (bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
    
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
  }

  if(obstacleGroup.isTouching(monkey) && score===0){
   gameState =3
  }

  if(mousePressedOver(restart)) {
    reset();
  }

  if (gameState === 3) {
    gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    jungle.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    banana.lifetime=-100;
    obstacle.lifetime=-80;
    monkey.changeAnimation("collided", monkey_collided);
  }
  switch (score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;
    default: break;        
  }
  
  monkey.collide(ground);
 // ground.visible=false;

  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  
}



function food(){
  
   if (frameCount % 80 === 0){
     banana=createSprite(400,200,10,10);
     banana.scale=0.1;
     banana.addImage(bananaImage);
     banana.y=Math.round(random(120,200));
     banana.velocityX=-4;
     banana.lifetime=100;
     bananaGroup.add(banana);
   }
  
}

function obstacles(){
  if (frameCount % 300 === 0){
    obstacle=createSprite(400,355,20,20);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
    obstacle.addImage(obstaceImage);
    obstacle.lifetime=80;
    
    obstacleGroup.add(obstacle);
  }
  
}


function reset(){
  gameState = 0;
  gameover.visible = false;
  restart.visible = false;

  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
}
