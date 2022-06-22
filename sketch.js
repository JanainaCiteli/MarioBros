const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var mario, mario_running, mario_jumping, mario_stop;
var plantsGroup, plant_eating;
var coinsGroup, coins_img;
var star_png, one_star, two_star, tree_star;
var zero_star;
var cloud_img, cloudsGroup;
var ground, invisible_ground, ground_img;
var surpriseGroup, surprise_img;
var coin;
var coin1, coin2, coin3;
var touches = [0, 1, 2];

var rope, fruit, ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button, button2, button3;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var star;
var star_img;
function preload() {


  mario_running = loadAnimation("assets/mario1.png", "assets/mario2.png", "assets/mario3.png");
  mario_jumping = loadImage("assets/mariojump.png");
  mario_stop = loadImage("assets/mario1.png");
  coins_img = loadImage("assets/coin.png")
  plant_eating = loadAnimation("./assets/planta1.png", "./assets/planta2.png");
  surprise_img = loadImage("./assets/surprise.png");
  coins = loadImage("./assets/coin.png");

  one_star = loadImage("./assets/1star.png");
  two_star = loadImage("./assets/2star.png");
  tree_star = loadImage("./assets/3star.png");
  zero_star = loadImage("./assets/0star.png");

  cloud_img = loadImage("./assets/cloud.png");
  ground_img = loadImage("./assets/ground.png");

  mario_running.playing = true;
  mario_jumping.playing = true;
  mario_stop.playing = true;
  mario_stop.looping = false;
  mario_jumping.looping = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  

  engine = Engine.create();
  world = engine.world;
  mario = createSprite(90, windowHeight - 270, 20, 50);
  mario.scale = 0.35;

  mario.addAnimation("running", mario_running);
  mario.addImage("jumping", mario_jumping);
  mario.addImage("stop", mario_stop);
  //mario.addImage("stop");
  mario.setCollider("rectangle", 0, 0, mario.width, mario.height);

  ground = createSprite(windowWidth / 2, windowHeight - 10, 400, 20);

  ground.scale = 0.5
  ground.addImage("ground", ground_img);
  ground.x = ground.width / 2;

  var star_display = createSprite(125, 50, 30, 30);
  star_display.scale = 0.2;
  star_display.addImage("zero", zero_star);
  star_display.addImage("one", one_star);
  star_display.addImage("two", two_star);
  star_display.addImage("tree", tree_star);
  //star_display.addImage("'empty'");

  invisibleGround = createSprite(50, windowHeight - 130, 400, 10);
  invisibleGround.visible = false;
  // console.log(invisibleGround.y);

  plantsGroup = createGroup();
  cloudsGroup = createGroup();
  surpriseGroup = createGroup();
  //coinsGroup = createGroup();

  //coinsGroup.add(spawCoins);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background("lightBlue");
  if (gameState === PLAY) {
    spawClouds();
    spawPlants();
    spawSurprise();
    ground.velocityX = -3;
    mario.changeAnimation(mario_running);
    mario.collide(invisibleGround);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    };
    console.log(mario.y);

    /**
     * Compare os dois ifs, há erro na inserção da imagem do mário no pulo
     */
    if (keyDown("space") || touches.length > 0 || touches.length > 0) {
      mario.velocityY = -12;
      mario.changeAnimation("jumping", mario_jumping);
    }
    mario.changeAnimation("running", mario_running)
    // if ((keyDown("space") && mario.y >= windowHeight - 39) || touches.length > 0 || touches.length > 0) {
    //   mario.velocityY = -12;
    //   mario.addImage(mario_jumping);
    // };

    mario.velocityY = mario.velocityY + 0.8;
    mario.collide(ground);


    if (surpriseGroup.isTouching(mario)) {
      spawCoins();
      star_display.addImage('one');
     // touches[1];
    };

    // if (surpriseGroup.isTouching(mario) && touches[0]) {
    //   coinsGroup();
    //   star_display.addImage('one');
    //   touches[1];
    // };

    // if (surpriseGroup.isTouching(mario) && touches[1]) {
    //   coinsGroup();
    //   star_display.addImage('two');
    //   touches[2];
    // };

    // if (surpriseGroup.isTouching(mario) && touches[2]) {
    //   coinsGroup();
    //   star_display.addImage('tree');
    //   gameState = WIN;
    // };
    if (plantsGroup.isTouching(mario)) {
      gameState = END;
    };

  } else if (gameState === WIN) {
    win();
  }
  else if (gameState === END) {
    mario.velocityX = 0
    mario.velocityY = 0
    plantsGroup.setVelocityXEach(0)
    ground.velocityX = 0
    gameOver();
  };

  drawSprites();
}
function spawPlants() {
 
  var aleatorio = [130, 250, 280, 430,800]
  for (i = 0; i < aleatorio.length; i++) {
    var numAleatorio = aleatorio[i]
  }

  if (frameCount % numAleatorio === 1) {
    var obstacle = createSprite(windowWidth, windowHeight - 125, 10, 40);
    obstacle.velocityX = -3;
    obstacle.addAnimation("death", plant_eating);
    obstacle.scale = 0.15;
    obstacle.lifetime = windowWidth - 200;
    plantsGroup.add(obstacle);
  }
};

function spawClouds() {
  var aleatorio = [130, 250, 280, 430,800]
  for (i = 0; i < aleatorio.length; i++) {
    var numAleatorio = aleatorio[i]
  }
  if (frameCount % numAleatorio === 1) {
    var cloud = createSprite(windowWidth, 120, 40, 10);
    cloud.y = Math.round(random(90, 350));
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -2;
    cloud.lifetime = windowWidth;
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;
    cloudsGroup.add(cloud);
  }
};

function spawSurprise() {
  if (frameCount % 100 === 0) {
    var gift = createSprite(windowWidth, windowHeight - 35, 20, 20);
    gift.y = Math.round(random(300, 350));
    gift.addImage(surprise_img);
    gift.scale = 0.15;
    gift.velocityX = -3;
    gift.lifetime = windowWidth - 200;
    surpriseGroup.add(gift);
  }

};

function spawCoins() {
  var options = {
    restitution: 0.5,
    frictionAir: 0,
    friction: 0.02
  }
  coin1 = createSprite(300, 300, 20, 20);
  coin1.addImage(coins_img);
  coin1.scale = 0.5;
  // coin2 = createSprite(300, 300, 20, options);
  // coin2.addImage("coin", coins_img);
  // coin2.scale = 0.5;
  // coin3 = createSprite(300, 300, 20, options);
  // coin3.addImage("coin", coins_img);
  // coin3.scale = 0.5;
};

function win() {
  swal(
    {
      title: `YOU WIN!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://o.remove.bg/downloads/98a5c951-a2d2-4e57-ad6f-bfd3e6fe764e/image-removebg-preview.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function gameOver() {
  swal(
    {
      title: `GAME OVER!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://o.remove.bg/downloads/8751b30c-085b-46d5-b3a5-179c768e10cb/image-removebg-preview.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}



