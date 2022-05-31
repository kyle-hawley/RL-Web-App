class Player {
  constructor(_p, _in_manual_mode) {
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
    this.score = 0;

    if (!_in_manual_mode) {
      this.brain = new NeuralNetwork(
        _stats_pkg.nn_config.in_size,
        _stats_pkg.nn_config.hidden_size,
        1
      );
    }
  }

  swim() {
    this.vel = this.strength;
  }

  think(sharks, fishes) {
    let inputs = [0.3, 0.6, 0.7, 0.6, 0.2, 0.9];

    // inputs[0] = this.y;
    // inputs[1] = this.vel;
    // inputs[2] = sharks[0].x;
    // inputs[3] = sharks[0].y;
    // inputs[4] = fishes[0].x;
    // inputs[5] = fishes[0].y;

    let output = this.brain.feedforward(inputs);

    if (output > 0.5) {
      return true;
    } else {
      return false;
    }
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

  show() {
    if (this.respawning) {
      this.p.stroke(255, 0, 0, 200);
      this.p.strokeWeight(2);
      this.p.fill(255, 0, 0, 200);
    } else {
      this.p.stroke(0, 0, 0, 200);
      this.p.strokeWeight(2);
      this.p.fill(0, 0, 0, 200);
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
}
