class Fish {

  constructor(size) {
    this.size = size;

    this.x = width -50;
    this.y = random(0, height);
    this.vel = -1;

    if (this.size == 'big') {
      this.width = 20;
      this.height = 15;
      this.points = 20;
    }

    if (this.size == 'small') {
      this.width = 10;
      this.height = 5;
      this.points = 10
    }
  }

  show() {

    stroke(200);
    strokeWeight(2);
    fill(200);
    rect(this.x, this.y, this.width, this.height);

  }

  update() {

    this.x += this.vel

  }

  isOffscreen() {

    return this.x + this.width < 0

  }

}