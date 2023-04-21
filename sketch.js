var tower, towerImg
var phantomImg, phantom;
var door,doorImg,doorsGroup
var climber,climberImg,climbersGroup
var line,linesGroup
var gameOver, gameOverImg

function preload(){
towerImg = loadImage("tower.png")
phantomImg = loadImage("Phantom 1.png");
doorImg = loadImage("door.png")
climberImg = loadImage("climber.png")
gameOverImg = loadImage("Game Over.png")
}

function setup() {
 createCanvas(600,600);

tower = createSprite(300,300)
tower.addImage(towerImg)
tower.velocityY = 1

 
phantom = createSprite(300,300)
phantom.addImage(phantomImg)
phantom.scale = 0.2

climbersGroup = new Group()
linesGroup = new Group()
doorsGroup = new Group()
}

function draw() {
background(200)



  
  spawndoors()

if(tower.y>400){
    tower.y = 300
}

if(keyDown("space")){
    phantom.velocityY = -10
  }
  phantom.velocityY = phantom.velocityY +0.7
  if(keyDown("left")){
    phantom.x = phantom.x -2
  }
  if(keyDown("right")){
    phantom.x = phantom.x +2
  }

 
if(phantom.isTouching(climbersGroup)){
  phantom.velocityY = 0
}

if(linesGroup.isTouching(phantom)||phantom.y>600){
  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverImg)

  phantom.destroy()
  tower.destroy()
  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  linesGroup.destroyEach()
}

phantom.debug = false
phantom.setCollider("circle",0,0,200)



 drawSprites()
 
 
}
 


function spawndoors(){
    if(frameCount%300===0){
        door = createSprite(200,-50)
        door.scale = 0.3
        door.velocityY = 1
        door.x = Math.round(random(200,400))
        doorsGroup.add(door)
        door.addImage(doorImg)
        
        climber= createSprite(door.x,-20,door.width,20)
        climber.scale = 0.3
        climber.addImage(climberImg)
        climber.velocityY = 1
        phantom.depth=door.depth+1
        climbersGroup.add(climber)
        climber.debug = false
        climber.setCollider("rectangle",0,40,500,100,0)
        
        
        line = createSprite(door.x+10,20,200,5)
        line.shapeColor = "purple"
        line.velocityY = 1
        linesGroup.add(line)
      }
}