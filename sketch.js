//namespacing
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const body = Matter.Body;

var bg;
var berry, berryIMG, berry_options;
var berryGroup;
var bird, birdIMG;
var score = 0;
var collisionDetected;
var youWin, gameoverImg;

var gameState = "play";

function preload(){
bg = loadImage('background.jpg');
birdIMG = loadImage('BirdImage.png');
birdFlipIMG = loadImage('BirdImageFlip.png');
berryIMG  = loadImage('berry.png');
gameoverImg = loadImage('youwinscreen.webp');
}

function setup() {
  createCanvas(900,550);
  engine = Engine.create();
  world = engine.world;

  bird_options = {
    isStatic: false
  }

  bird = Bodies.circle(450,225,450, bird_options);
  berryGroup = new Group();
}


function draw(){
  Engine.update(engine);


  if(gameState === "play"){
     if(keyDown(37)){
        bird.position.x = bird.position.x-4;
      }
     
     if(keyDown(39)){
        bird.position.x = bird.position.x+4;
      }
    
      if (keyDown(38)){
        bird.position.y = bird.position.y-4;
      }
               
      if(keyDown(40)){
        bird.position.y = bird.position.y+4;
      }
    
      if(score === 2){
        gameState = "end_win";
      }
      image(bg,0,0,width, height);   
      spawnBerries();
    
      for(var i=0; i<=berryGroup.length; i++){
        collide(bird, berryGroup[i]);
      }
    
      drawSprites();
    
      push();
      imageMode(CENTER)
      image(birdIMG, bird.position.x, bird.position.y,90,90);
      pop();
      text("score : " + score, 700, 100)
  }

    if(gameState === "end_win"){
      
      if(keyDown(32)){
        gameState === "play";
      }
      score = 0;

      image(gameoverImg,0,0,width, height);
      
   
    }

}
 

function spawnBerries(){

if(frameCount % 60 === 0){
  berry = createSprite(Math.round(random(900)), (Math.round(random(400))));
  berryGroup.add(berry);
  berry.addImage(berryIMG);
  berry.scale=0.2;
  berry.velocityY = 3;
  berry.lifetime = 400; 
  
  }

}


function collide(body,sprite){
  if(body!=null && sprite!= undefined){
    var d = dist(body.position.x, body.position.y , sprite.position.x , sprite.position.y);

    if(d<=50){
      sprite.destroy();
      score +=1 ;
    }
  }
}

    /*function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y , sprite.x , sprite.y);
    if(d<=100){
      berry.destroy(berry);
      bird = null;
      return true;
    }
    else{
      return false;
    } 
  }
}*/




/*
  for(var i=0; i< berryGroup.length; i++){ 

    var collisionDetected = collide(bird, berryGroup[i])

      if(collisionDetected){
       berryGroup[i].destroy();
      } 
  }
*/
   