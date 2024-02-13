let engine, world, ground, astra, basket;
const astraRadius = 20;
const groundWidth = 800;
const groundHeight = 20;
const basketWidth = 100;
const basketHeight = 10;
const hoopWidth = 70;
const hoopHeight = 20;
let score = 0;

function setup() {
  createCanvas(800, 600);


  engine = Matter.Engine.create();
  world = engine.world;


  ground = Matter.Bodies.rectangle(width / 2, height - groundHeight / 2, groundWidth, groundHeight, { isStatic: true });
  Matter.World.add(world, ground);


  basket = Matter.Bodies.rectangle(width / 2, height / 2 - 50, basketWidth, basketHeight, { isStatic: true });
  Matter.World.add(world, basket);


  hoop = Matter.Bodies.rectangle(width / 2, height / 2 - 50 - basketHeight / 2 - hoopHeight / 2, hoopWidth, hoopHeight, { isStatic: true });
  Matter.World.add(world, hoop);


  astra = Matter.Bodies.circle(100, 100, astraRadius);
  Matter.World.add(world, astra);


  Matter.Events.on(engine, 'collisionStart', function (event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      if ((pair.bodyA === astra && pair.bodyB === hoop) || (pair.bodyA === hoop && pair.bodyB === astra)) {
        score++;
        resetAstra();
      }
    }
  });


  Matter.Engine.run(engine);
}

function draw() {
  background(0);


  Matter.Engine.update(engine);


  fill(255);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, groundWidth, groundHeight);


  fill(200);
  rectMode(CENTER);
  rect(basket.position.x, basket.position.y, basketWidth, basketHeight);


  fill(255, 0, 0);
  rectMode(CENTER);
  rect(hoop.position.x, hoop.position.y, hoopWidth, hoopHeight);


  fill(255, 0, 0);
  ellipseMode(RADIUS);
  ellipse(astra.position.x, astra.position.y, astraRadius, astraRadius);


  textSize(32);
  fill(255);
  text("Score: " + score, 10, 30);
}


function resetAstra() {
  Matter.Body.setPosition(astra, { x: 100, y: 100 });
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(astra, astra.position, { x: 0, y: -0.05 });
  } else if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(astra, astra.position, { x: 0, y: 0.02 });
  } else if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(astra, astra.position, { x: -0.02, y: 0 });
  } else if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(astra, astra.position, { x: 0.02, y: 0 });
  }

  Matter.Body.applyForce(astra, astra.position, force); // Aplicar a força à bola
}
