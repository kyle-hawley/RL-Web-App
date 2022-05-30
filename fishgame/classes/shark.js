class Shark {
  constructor(_p) {
    this.p = _p;
    this.x = this.p.width - 50;
    this.y = this.p.random(0, this.p.height);
    this.vel = -2;

    this.height = 30;
    this.width = 45;
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
      this.x < fish.x + fish.width && this.x > fish.x + fish.width - 5;
    let y_overlap =
      fish.y - this.height < this.y && this.y < fish.y + fish.height;

    return x_overlap && y_overlap;
  }
}
