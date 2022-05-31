function fishGameSketch(p) {
  let in_manual_mode = true;

  let paused;
  let scoreboard;

  let players;
  let sharks;
  let fishes;

  const shark_rate = 0.003;
  const big_fish_rate = 0.005;
  const small_fish_rate = 0.005;

  p.isPaused = function () {
    return paused;
  };

  p.pauseToggle = function (button) {
    paused = button == "pause";
  };

  p.isManual = function () {
    return in_manual_mode;
  };

  p.gameModeToggle = function () {
    in_manual_mode = !in_manual_mode;
    p.initializeSketch();
  };

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

  p.initializeSketch = function () {
    scoreboard = new Scoreboard(p);
    players = [];
    sharks = [];
    fishes = [];

    paused = true;
    p.background(100, 150, 200);

    if (in_manual_mode) {
      players.push(new Player(p, in_manual_mode));
      players[0].show();
      scoreboard.show(players[0].score);
    } else {
      for (let i = 0; i < _stats_pkg.pop_size; i++) {
        players.push(new Player(p, in_manual_mode));
        players[i].show();
      }
    }
  };

  p.setup = function () {
    p.createCanvas(500, 300);
    p.initializeSketch();
  };

  p.draw = function () {
    // Catches if the game is paused and if so skips the drawing loop
    if (paused) {
      return;
    }

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

      // Did the shark eat a player?
      for (let player of players) {
        if (shark.eats(player) && !player.respawning) {
          player.score -= shark.penalty;
          player.respawn();
        }
      }
    }

    // Check if a player ate any fish?

    for (let player of players) {
      for (i = fishes.length - 1; i >= 0; i--) {
        if (player.eats(fishes[i])) {
          player.score += fishes[i].points;

          if (in_manual_mode) {
            fishes.splice(i, 1);
          }
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

    // Player movement
    if (in_manual_mode) {
      if (p.keyIsPressed) {
        players[0].swim();
      }
      scoreboard.show(players[0].score);
    } else {
      for (let player of players) {
        if (player.think(sharks, fishes)) {
          player.swim();
        }
      }
    }

    // Show players
    for (let player of players) {
      player.update();
      player.show();
    }
  };
}
