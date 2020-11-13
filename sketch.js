var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, cloudGroup;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6

var gameOverimg,restartimg,ObstacleGroup,CloudsGroup


var PLAY,END,gameState,count
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obsatcleImage6 = loadImage("obstacle6.png");
  
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(400, 400);
  
  trex = createSprite(50,350,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
   ObstacleGroup = createGroup();
   CloudsGroup = createGroup();


  gameOver = createSprite(30,300);
  restart = createSprite(30,340);
  gameOver.addImage("gameOver",gameOverimg);
  gameOver.scale = 0.5;
  restart.addImage("restart",restartimg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
 
  
  
  ground = createSprite(200,350,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,355,400,10);
  invisibleGround.visible = false;
  
  
   PLAY = 1;
   END = 0;
   gameState = PLAY;
  count = 0;
}

function draw() {
  background(255);
  camera.position.x = ground.velocityX+40
  camera.position.y = trex.y
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(World.frameRate/60);
  
  
  if(keyDown("space") && trex.y>326) {
    trex.velocityY = -15;
     
  }
  
  
  
  
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2-200;
  }
  textSize(20);
  text("Score: "+ count, 250, 100);
  console.log(World.frameCount)
  spawnCloud();
  spawnObstacles();
    
    if(ObstacleGroup.isTouching(trex) || World.frameCount%2000 === true){
     
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();}
  }
 
  
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnCloud(){
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.addImage(cloudImage);
    cloud.y = random(280,320);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 180;
    
  
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  
  if(World.frameCount % 60 === 0) {
    
     var obstacle = createSprite(400,335,10,40);
     obstacle.velocityX = -6;
    
    
    var rand = Math.round(random(1,6))
   switch(rand){
     case 1: obstacle.addImage(obstacleImage1);
             break;
             
     case 2 : obstacle.addImage(obstacleImage2);
              break;
              
    case 3 : obstacle.addImage(obstacleImage3);
             break;
             
    case 4 : obstacle.addImage(obstacleImage4);
             break;
             
    case 5 : obstacle.addImage(obstacleImage5);
            break;
            
    case 6 : obstacle.addImage(obsatcleImage6);
             break;
   }
          
    obstacle.scale = 0.5;
    obstacle.lifetime = 170;
    
    console.log(obstacle.y);
    
    ObstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstacleGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trex",trex);
  
  count = 0;
  
}