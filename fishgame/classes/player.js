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
    this.fitness = 0;

    this.brain = new NeuralNetwork(
      _stats_pkg.nn_config.in_size,
      _stats_pkg.nn_config.hidden_size,
      1
    );
  }

  swim() {
    this.vel = this.strength;
  }

  findClosestObject(objects) {
    let closest_x = Infinity;
    let closest_object = {
      x: 0,
      y: 0,
    };

    if (objects.length > 0) {
      for (let object of objects) {
        if (object.x < closest_x && object.x > this.x + this.width) {
          closest_object = object;
        }
      }
    }

    return closest_object;
  }

  think(sharks, fishes) {
    let closest_shark = this.findClosestObject(sharks);
    let closest_fish = this.findClosestObject(fishes);

    let inputs = [];

    inputs[0] = this.y / this.p.height;
    inputs[1] = this.vel / 5;
    inputs[2] = closest_shark.x / this.p.width;
    inputs[3] = closest_shark.y / this.p.height;
    inputs[4] = closest_fish.x / this.p.width;
    inputs[5] = closest_fish.y / this.p.height;

    let output = this.brain.feedforward(inputs);
    output = math.subset(output, math.index(0, 0)); // grab the value

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
    let a = 100;
    if (this.respawning) {
      this.p.stroke(255, 0, 0, a);
      this.p.strokeWeight(2);
      this.p.fill(255, 0, 0, a);
    } else {
      this.p.stroke(0, 0, 0, a);
      this.p.strokeWeight(2);
      this.p.fill(0, 0, 0, a);
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
