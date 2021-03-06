let bubbles = [];
let fishes = [];
let rand = [];

function setup() {
  createCanvas(700, 500);
  signal = 0;
  //setting up an array of random values for consistant grass and pebbles
  for (i = 0; i < 1000; i++) {
    rand[i] = random(-5, 10);
  }
  //setting up an array of bubble objects
  for (let i = 0; i < 10; i++) {
    bubbles[i] = new Bubble();
  }


}

function draw() {
  bg();
  house2();
  house();
  //bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  grass();
  //fishes
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].move();
    fishes[i].display();
  }
  pebbles();


}

//a function for creating the background
function bg() {
  noStroke();
  smooth();
  for (i = height * 2; i > 0; i = i - 5) {
    fill(0, 150 - (i / 4), 255 - (i / 1.7));
    circle(width / 2, 0, 2 * i);
  }
}
//function for consistant realistic grass
function grass() {
  fill(0, 56, 23);
  for (i = 0; i < width; i = i + 1) {
    triangle(i, height - 20, i + (rand[i] / 2), height - 20, i + rand[i], height - (7 * rand[i + 2]))
  }
}
//function for consistant realistic pebbles
function pebbles() {

  for (i = 0; i < width; i = i + 1) {
    fill(rand[i] * 10);
    ellipse(i, height, 10 + (rand[i] * 2), 10 + (rand[i + 1] * 4));
  }

  for (i = 0; i < width; i = i + 10) {
    fill(rand[i] * 10);
    ellipse(i, height, 10 + (rand[i] * 2), 10 + (rand[i + 1] * 4));
  }

  for (i = 0; i < width; i = i + 10) {
    fill(rand[i] * 10);
    ellipse(i, height, 10 + (rand[i + 1] * 2), 10 + (rand[i] * 4));
  }
}
//function for continuous bubbles
function Bubble() {
  this.x = random(100, 120);
  this.y = random(0, height);
  this.i = random(100, 120);
  this.j = random(0, height - 100);
  //two types of bubble for variation
  this.display = function() {
    noStroke();
    fill(260, 80);
    ellipse(this.x, this.y, 20);

    noStroke();
    fill(260, 60);
    ellipse(this.i, this.j, 28);
  }
  //moving the bubbles in a circular loop with variations
  this.move = function() {
    this.x = this.x + random(-0.50, 0.50);
    this.y = this.y - 1;
    this.i = this.i + random(-0.50, 0.50);
    this.j = this.j - 1;
    if (this.y < 0) {
      this.y = height;
      this.x = random(100, 120);
    }
    if (this.j < 0) {
      this.j = height;
      this.i = random(100, 120);
    }
  }
}
//1st type of house
function house() {
  circle(width / 4, height, 250);
  for (i = 250; i > 0; i = i - 5) {
    fill(i - 20, 21, 21)
    circle(width / 4, height, i);
  }
  fill(0, 15, 20)
  ellipse(width / 3, height, 100, 180)
  circle(width / 4 - 40, height - 70, 50)
}
//2nd type of house
function house2() {
  circle(width / 2, height, 350);
  for (i = 350; i > 0; i = i - 5) {
    fill(0, 10, i - 60)
    circle(width / 2, height, i);
  }
  fill(0, 15, 20)
  ellipse(width / 2 - 40, height, 100, 180)
  circle(width / 1.5 - 60, height - 70, 50)
}
//function to create new fish
function mousePressed() {
  let newFish = new Fish(mouseX, mouseY);
  fishes.push(newFish);
}
//creating the fish class for aquarium
class Fish {

  constructor(x, y) {
    this.speed = 2;
    this.dir = 1;
    this.w = 50;
    this.h = 13;
    this.x = x;
    this.baseY = y;
    this.speed = int(random(1, 10));
    this.fishColour = color(random(255), random(255), random(255));
    this.fishColour2 = color(random(255), random(255), random(255));
  }
  //method for realistic motion for the fish
  move() {
    this.x += (this.dir * this.speed);
    if (this.x < 0 || this.x > width) {
      this.dir = -this.dir;
      this.x += (this.dir * this.speed);
    }
    this.y = this.baseY + sin(radians(frameCount * 2)) * 40;

    this.w = 50 * this.dir;
  }
  //method for varried appearence for the fish
  display() {
    fill(this.fishColour);
    triangle(this.x - (40 * this.dir), this.y, this.x - this.w, this.y - this.h, this.x - this.w, this.y + this.h);
    triangle(this.x + (30 * this.dir), this.y, this.x - (10 * this.dir), this.y - 40, this.x - (10 * this.dir), this.y + 40);
    fill(this.fishColour2);
    ellipse(this.x - (20 * this.dir), this.y, 40, 30);
    ellipse(this.x, this.y, 80, 40);
    fill(0);
    ellipse(this.x + (25 * this.dir), this.y, 20, 20);
    fill(255);
    ellipse(this.x + (20 * this.dir), this.y - 5, 5, 5);
    ellipse(this.x + (20 * this.dir) + (5 * this.dir), this.y + 2, 10, 10);
  }
}