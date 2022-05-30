function fishGameSketch(p) {
  let player1;
  let sharks = [];
  let fishes = [];

  const shark_rate = 0.003;
  const big_fish_rate = 0.005;
  const small_fish_rate = 0.005;

  let score = 0;
  const shark_penalty = 30;

  spawn_fish_and_sharks = function () {
    if (p.random(0, 1) < shark_rate) {
      sharks.push(new Shark(p));
    }

    if (p.random(0, 1) < big_fish_rate) {
      fishes.push(new Fish(p, "big"));
    }

    if (p.random(0, 1) < small_fish_rate) {
      fishes.push(new Fish(p, "small"));
    }
  };

  p.setup = function () {
    p.createCanvas(500, 400);
    player1 = new Player(p);
  };

  p.draw = function () {
    p.background(100, 150, 200);

    // Spawn new fish
    spawn_fish_and_sharks();

    // Update fish; remove offscreen fish
    for (i = sharks.length - 1; i >= 0; i--) {
      if (sharks[i].isOffscreen()) {
        sharks.splice(i, 1);
      } else {
        sharks[i].update();
      }
    }

    for (i = fishes.length - 1; i >= 0; i--) {
      if (fishes[i].isOffscreen()) {
        fishes.splice(i, 1);
      } else {
        fishes[i].update();
      }
    }

    // Remove fish eaten by sharks
    for (let shark of sharks) {
      for (let i = fishes.length - 1; i >= 0; i--) {
        if (shark.eats(fishes[i])) {
          fishes.splice(i, 1);
        }
      }

      // Did the shark eat the player?
      if (shark.eats(player1) && !player1.respawning) {
        score -= shark_penalty;
        player1.respawn();
      }
    }

    // Check if player ate any fish

    if (!player1.respawning) {
      for (i = fishes.length - 1; i >= 0; i--) {
        if (player1.eats(fishes[i])) {
          score += fishes[i].points;
          fishes.splice(i, 1);
        }
      }
    }

    // Show objects on canvas
    for (let shark of sharks) {
      shark.show();
    }

    for (let fish of fishes) {
      fish.show();
    }

    // Player Code

    player1.update();
    player1.show();

    if (p.keyIsPressed) {
      player1.swim();
    }

    // Scoreboard. Might become it's own class soon.
    p.stroke(0);
    p.strokeWeight(1);
    p.textSize(16);
    p.text(p.str(score), p.width - 50, 50, p.width - 20, 70);
  };
}

let sketch_test = new p5(fishGameSketch, "game_window");
