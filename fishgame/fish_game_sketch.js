function fishGameSketch(p) {
  let gamemode = "manual";

  let paused;
  let scoreboard;
  let player1;
  let players;
  let sharks;
  let fishes;
  let score;

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
    return gamemode == "manual";
  };

  p.gameModeToggle = function () {
    if (gamemode == "manual") {
      gamemode = "RL";
    } else {
      gamemode = "manual";
    }

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
    sharks = [];
    fishes = [];
    score = 0;

    paused = true;
    p.background(100, 150, 200);
    scoreboard.show(score);

    if (gamemode == "manual") {
      player1 = new Player(p, gamemode);
      player1.show();
    } else if (gamemode == "RL") {
      players = [];
      for (let i = 0; i < _stats_pkg.pop_size; i++) {
        players.push(new Player(p, gamemode));
      }

      console.log(players);
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

      // Did the shark eat the player?
      if (shark.eats(player1) && !player1.respawning) {
        score -= shark.penalty;
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

    scoreboard.show(score);
  };
}
