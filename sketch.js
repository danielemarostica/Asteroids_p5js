var ship;
var asteroids = [];
var lasers = [];

function setup() {
  // create the canvas panel where you can add your items
  createCanvas(1600, 900);

  // create the Ship object
  ship = new Ship();

  // create the Asteroid array
  for (var i = 0; i < 7; i++)
    asteroids.push(new Asteroid());
}

function draw() {
  // set the background to black
  background(0);

  // calling Asteroid public methods
  for (var i = 0; i < asteroids.length; i++){
    if (ship.hits(asteroids[i])){
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  // do a backward loop to not cause problems while looping new items
  for (var i = lasers.length-1; i >=0 ; i--){
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offScreen()){
      lasers.splice(i, 1);

    } else{
      for (var j = asteroids.length-1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])){
          if (asteroids[j].r > 10){
            // if laser hits asteroid then split this in two smaller ones
            var newAsteroids = asteroids[j].breakup();
            //console.log(newAsteroids);
            asteroids = asteroids.concat(newAsteroids);
          }
          // then remove the old one from the array and the laser
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

// this function is called every time i release a key
function keyReleased() {
  //if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW)
    ship.setRotation(0);
    ship.boosting(false);
}

// this function is called every time i pres a key
function keyPressed() {
  if (keyCode == RIGHT_ARROW)
    ship.setRotation(0.1);
  else if (keyCode == LEFT_ARROW)
    ship.setRotation(-0.1);
  else if (keyCode == UP_ARROW)
    ship.boosting(true);
  else if (key == ' ')
    lasers.push(new Laser(ship.pos, ship.heading));
}
