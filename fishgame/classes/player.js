class Player {
  constructor(_p) {
    this.p = _p;
    this.x = 50;
    this.y = 100;
    this.width = 20;
    this.height = 20;

    this.strength = -1.5;
    this.mouth_size = 5;

    // this.max_vel = -2;
    this.vel = 0;
    this.grav = 0.02;

    this.respawning = false;
    this.respawn_timer = 0;
    this.default_respawn_time = 100;
  }

  show() {
    if (this.respawning) {
      this.p.stroke(255, 0, 0);
      this.p.strokeWeight(2);
      this.p.fill(255, 0, 0);
    } else {
      this.p.stroke(0);
      this.p.strokeWeight(2);
      this.p.fill(0);
    }

    this.p.rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.vel += this.grav;
    this.y += this.vel;

    // Hit the floor
    if (this.y + this.height > this.p.height) {
      this.y = this.p.height - this.height;
      this.vel = 0;
    }

    // Hit the ceiling
    if (this.y < 0) {
      this.y = 0;
      this.vel = 0;
    }

    // Update respawn timer
    if (this.respawn_timer > 0) {
      this.respawn_timer -= 1;
    } else if (this.respawn_timer == 0) {
      this.respawning = false;
    }
  }

  swim() {
    this.vel = this.strength;
  }

  eats(fish) {
    let x_overlap =
      this.x + this.width > fish.x &&
      this.x + this.width - this.mouth_size < fish.x;
    let y_overlap =
      this.y - fish.height < fish.y && this.y + this.height > fish.y;

    return x_overlap && y_overlap;
  }

  respawn() {
    this.respawning = true;
    this.respawn_timer = this.default_respawn_time;
  }
}
