// class declaration in js
function Ship() {
  // Public properties
  // define the position of the ship on the center of the screen
  this.pos = createVector(width/2, height/2);
  this.r = 10;
  // where the ship is facing
  this.heading = 0;
  // the rotation "sense"
  this.rotation = 0;
  // moves the ship around the screen
  this.vel = createVector(0,0);
  this.isBoosting = false;
  this.offset = [0, 0, 5, 5, 0];

  // always updates what this object is doing
  this.update = function() {
    if (this.isBoosting)
      this.boost();
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  // Public method which can access private variables
  this.render = function() {
    push()
    // translate function is used to move the center of the screen
    // from the top left corner to the center i give
    // in this case the new center is the center of the screen
    translate(this.pos.x, this.pos.y);

    // rotate function works in radius, not in degrees
    // so to rotate an element i have to pass for instance PI/2, PI/4, ...
    rotate(this.heading + PI / 2);

    // set the border color of the triangle
    stroke(255);
    fill(0);

    // let's create the 'A' shape of the ship
    /*beginShape();
    for (var i = 0; i < 5; i++) {
      var angle = map(i, 0, 5, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);*/

    // use the triangle function to create a triangle
    // by passing the x and y coordinates of the three vertices
    triangle(-this.r/4*3, this.r,
              this.r/4*3, this.r,
              0, -this.r);

    //var m1 = (-this.r-this.r)/(0+this.r/4*3);
    //var m2 = (-this.r-this.r)/(0-this.r/4*3);
    //var extLength = dist(0, -this.r, this.r/4*3, this.r)*0.2;
    line(-this.r/4*3, this.r, -9, 14 );
    line(this.r/4*3, this.r, 9, 14);
    //line(-this.r-this.r);
    pop();
  }

  // the keyPressed function works only when a key is pressed
  // but what i want is that the ship rotates till the key is down
  // so the keyPressed function will call this function instead of ship.turn
  // to stop the rotation when key is released the keyReleased will be called
  this.setRotation = function(angle) {
    this.rotation = angle;
  }

  // called to check if the ship goes out of the screen
  this.edges = function () {
    // check if ship out of screen in x axe
    if (this.pos.x > width + this.r)
      this.pos.x = -this.r;
    else if (this.pos.x < -this.r)
      this.pos.x = width + this.r;

    // check if ship out of screen in y axe
    if (this.pos.y > height + this.r)
      this.pos.y = -this.r;
    else if (this.pos.y < -this.r)
      this.pos.y = height + this.r;
  }

  // the ship is always turning
  // if not, it means that the turning degree is 0 :)
  this.turn = function() {
    this.heading += this.rotation;
  }

  this.boosting = function(bool) {
    this.isBoosting = bool;
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    //the add method is a vector sum, so not use += !!!
    this.vel.add(force);
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y,
        asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r + this.r)
      return true;
    return false;
  }
}
