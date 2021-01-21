var PLAY = 1;
var END = 0;

var gameState = PLAY;
var gameState = END;


var survivalTime = 0;
var score = 0;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var ground, invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400); 

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  obstacleGroup = new Group();
  bananaGroup = new Group();

  
}


function draw() {
   background("225");
  
    stroke("white");
  textSize(20);
  fill("black");
  text("score:"+score,310,40);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,20,40);

  
     
  
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
    if(bananaGroup.isTouching(monkey)){
     score = score+2;
     bananaGroup.destroyEach();
     
     }
  
  if(obstacleGroup.isTouching(monkey)){
     score = score-2;
    gameState = END;
     obstacleGroup.destroyEach(); 
     monkey.destroy();
     bananaGroup.destroyEach();
     obstacleGroup.velocityX=0;
     bananaGroup.velocityX=0;
     monkey.velocityX=0;
    
     }
  

    
 obstacles();
  bananas();
drawSprites();
  
}

function obstacles(){
  
  if(frameCount % 300 === 0){
   var obstacle = createSprite(390,345,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(1.5+ score/20 );
   obstacle.scale=0.12;
   obstacle.collide(ground);
   obstacle.lifetime=400;
    
  obstacleGroup.add(obstacle);
  }
}

function bananas(){
  
  if(frameCount % 80 ===0){
  var banana = createSprite(80,315,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX = -(1 + score/10);
  banana.scale = 0.1;
  banana.lifetime = 400;
  bananaGroup.add(banana);
  }
}






