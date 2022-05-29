class Player {

  constructor() {
    this.x = 50;
    this.y = 100;
    this.width = 20;
    this.height = 20;
    
    this.strength = -1.5;
    // this.max_vel = -2;
    this.vel = 0;
    this.grav = 0.02;

    this.respawning = false;
    this.respawn_timer = 0;
  }


  show() {

    if (this.respawning) {
      stroke(255, 0, 0);
      strokeWeight(2);
      fill(255, 0, 0);
    } else {
      stroke(0);
      strokeWeight(2);
      fill(0);
    }
    
    rect(this.x, this.y, this.width, this.height);

  }


  update() {
    this.vel += this.grav;
    this.y += this.vel;

    // Hit the floor
    if (this.y + this.height/2 > height) {
      this.y = height - this.height/2;
      this.vel = 0;
    }

    // Hit the ceiling
    if (this.y - this.height/2 < 0) {
      this.y = this.height/2;
      this.vel = 0;
    }

    // Update respawn timer


    if (this.respawn_timer > 0) {
      this.respawn_timer -= 1;
    } else if (this.respawn_timer == 0) {
      this.respawning = false;
    } 

    console.log(this.respawn_timer)



  }

  swim() {
    // Unintuitive but positive is down and negative is up in p5.js
    this.vel = this.strength;
  }
  
  eats(fish) {

    let x_overlap = (this.x + this.width > fish.x) && (this.x + this.width - 5 < fish.x);
    let y_overlap = (this.y - fish.height < fish.y) && (this.y + this.height > fish.y);

    return x_overlap && y_overlap

  }

  respawn() {

    this.respawning = true;
    this.respawn_timer = 100; 

  }


}