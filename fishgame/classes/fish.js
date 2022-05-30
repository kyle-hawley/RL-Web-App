class Fish {
  constructor(_p, _size) {
    this.p = _p;
    this.size = _size;

    if (this.size == "big") {
      this.width = 20;
      this.height = 15;
      this.points = 20;
    }

    if (this.size == "small") {
      this.width = 10;
      this.height = 5;
      this.points = 10;
    }

    this.x = this.p.width + this.width;
    this.y = this.p.random(0, this.p.height - this.height);
    this.vel = -1;
  }

  show() {
    this.p.stroke(200);
    this.p.strokeWeight(2);
    this.p.fill(200);
    this.p.rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.vel;
  }

  isOffscreen() {
    return this.x + this.width < 0;
  }
}
