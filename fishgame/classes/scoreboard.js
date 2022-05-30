class Scoreboard {
  constructor(_p) {
    this.p = _p;
    this.width = 40;
    this.height = 30;

    this.x = this.p.width - this.width - 20;
    this.y = 20;
  }

  show(score) {
    this.p.stroke(0);
    this.p.strokeWeight(2);
    this.p.fill(255);
    this.p.rect(this.x, this.y, this.width, this.height);

    this.p.noFill();
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.textSize(16);
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    // this.p.text(
    //   score,
    //   this.x,
    //   this.y,
    //   this.x + this.width,
    //   this.y + this.width
    // );
    this.p.text(score, this.x + this.width / 2, this.y + this.height / 2);
  }
}
