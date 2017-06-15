// class declaration in js
function Asteroid(position, minSize, maxSize) {
  // define the position of the asteroid by random
  // check if parameters are valid or not
  if (minSize)
    this.minSize = max(minSize, 10);
  else
    this.minSize = 25;
  if (maxSize)
    this.maxSize = maxSize;
  else
    this.maxSize = 75;
  if (position)
    this.pos = position.copy();
  else
    this.pos = createVector(random(width), random(height));

  this.r = random(this.minSize, this.maxSize);
  // number of dots per asteroid
  this.total = random(5, 15);
  //this.vel = createVector(random(0,5), random(0,5));
  this.vel = p5.Vector.random2D();
  // now we set an offset array
  // to move each dot in or out from the circle concept
  this.offset = [];
  this.maxOffset = this.minSize*0.6;
  for (var i = 0; i < this.total; i++)
    this.offset[i] = random(-this.maxOffset, this.maxOffset);

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    noFill();
    // use ellipse function to draw a circle
    // but we want an asteroid, not a circle!!
    //ellipse(0,0, this.r * 2);
    // so let's a:
    // Polar to Cartesian coodrinates conversion
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  // if the asteroid exits from the screen generate a new one
  this.edges = function () {
    // check if the asteroid is out of screen in x axe
    if (this.pos.x > width + this.r)
      this.pos.x = -this.r;
    else if (this.pos.x < -this.r)
      this.pos.x = width + this.r;

    // check if the asteroid is out of screen in y axe
    if (this.pos.y > height + this.r)
      this.pos.y = -this.r;
    else if (this.pos.y < -this.r)
      this.pos.y = height + this.r;
  }

  this.breakup = function() {
    var toReturn = [];
    toReturn[0] = new Asteroid(this.pos, this.minSize/2, this.maxSize/2);
    toReturn[1] = new Asteroid(this.pos, this.minSize/2, this.maxSize/2);
    return toReturn;

  }

  this.tooSmall = function() {
    if (this.r < 7) return true; return false;
  }
}
