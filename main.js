let fg_sketch = new p5(fishGameSketch, "game_window");

function gameModeButtonToggle(button, sketch) {
  if (sketch.isManual()) {
    button.innerText = "RL";
  } else {
    button.innerText = "MAN";
  }

  sketch.gameModeToggle();
}
