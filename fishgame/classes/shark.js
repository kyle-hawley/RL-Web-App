class Shark {
  constructor(_p) {
    this.p = _p;

    this.height = 30;
    this.width = 45;
    this.x = this.p.width + this.width;
    this.y = this.p.random(0, this.p.height - this.height);
    this.vel = -2;
    this.mouth_size = 5;

    this.penalty = 30;
  }

  show() {
    this.p.stroke(255);
    this.p.strokeWeight(2);
    this.p.fill(255);
    // ellipse(this.x, this.y, this.width, this.height);
    this.p.rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.vel;
  }

  isOffscreen() {
    return this.x + this.width < 0;
  }

  eats(fish) {
    let x_overlap =
      this.x < fish.x + fish.width &&
      this.x > fish.x + fish.width - this.mouth_size;
    let y_overlap =
      this.y > fish.y - this.height && this.y < fish.y + fish.height;

    return x_overlap && y_overlap;
  }
}
