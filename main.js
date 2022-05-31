let _game_pkg = {
  fitness: [],
  best_player: "object goes here",
};

let _stats_pkg = {
  nn_config: {
    in_size: 2,
    hidden_size: 3,
  },
  pop_size: 100,
  mut_rate: 0.01,
};

let fg_sketch = new p5(fishGameSketch, "game_window");
let stats_sketch = new p5(statsSketch, "stats_window");

function gameModeButtonToggle(button, sketch) {
  console.log(sketch.in_manual_mode);

  if (sketch.isManual()) {
    console.log("switching to rl");
    button.innerText = "RL";
  } else {
    console.log("switching to manual");
    button.innerText = "MAN";
  }

  sketch.gameModeToggle();
}
