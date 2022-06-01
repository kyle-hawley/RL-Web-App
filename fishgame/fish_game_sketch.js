function fishGameSketch(p) {
  const generation_length = 3000;
  let generation_timer;
  let in_manual_mode = true;

  let paused;
  let scoreboard;

  let players;
  let sharks;
  let fishes;

  const shark_rate = 0.003;
  const big_fish_rate = 0.005;
  const small_fish_rate = 0.005;

  let slider;

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
    p.initializeSketch(true);
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

  p.initializeSketch = function (first_time) {
    scoreboard = new Scoreboard(p);
    sharks = [];
    fishes = [];

    paused = true;
    p.background(100, 150, 200);

    if (in_manual_mode) {
      players = [];
      players.push(new Player(p, in_manual_mode));
      players[0].show();
      scoreboard.show(players[0].score);
    } else {
      if (first_time) {
        paused = true;
        players = [];
        for (let i = 0; i < _stats_pkg.pop_size; i++) {
          players.push(new Player(p, in_manual_mode));
          players[i].show();
        }
      } else {
        paused = false;
        let new_players = createNextGeneration(p, players, "fishgame");
        players = new_players;
      }

      generation_timer = generation_length;
      scoreboard.show(generation_timer);
    }
  };

  p.setup = function () {
    p.createCanvas(500, 300);
    p.initializeSketch(true);
    slider = p.createSlider(1, 100, 1);
  };

  p.draw = function () {
    // Catches if the game is paused and if so skips the drawing loop

    if (paused) {
      return;
    }

    for (let n = 0; n < slider.value(); n++) {
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

            if (player.score < 0) {
              players.score = 0;
            }

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

      // Player movement
      if (in_manual_mode) {
        if (p.keyIsPressed) {
          players[0].swim();
        }
      } else {
        for (let player of players) {
          if (player.think(sharks, fishes)) {
            player.swim();
          }
        }
      }

      for (let player of players) {
        player.update();
      }

      generation_timer--;

      if (generation_timer == 0) {
        p.initializeSketch(false);
      }
    }

    // Drawing things

    p.background(100, 150, 200);

    for (let shark of sharks) {
      shark.show();
    }

    for (let fish of fishes) {
      fish.show();
    }

    for (let player of players) {
      player.show();
    }

    if (in_manual_mode) {
      scoreboard.show(players[0].score);
    } else {
      scoreboard.show(generation_timer);
    }
  };
}
