function statsSketch(p) {
  p.setup = function () {
    p.createCanvas(500, 300);
  };

  p.draw = function () {
    p.background(200, 200, 200);

    p.stroke(0);
    p.text("hi dad", 100, 100);
  };
}
