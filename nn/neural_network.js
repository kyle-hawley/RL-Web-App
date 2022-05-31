// Inspiration from Daniel Shiffman and his YouTube channel "The Coding Train"
// youtube link will go here

class NeuralNetwork {
  constructor(_isize, _hsize, _osize) {
    this.hw = this.init_wb(_hsize, _isize);
    this.hb = this.init_wb(_hsize, 1);
    this.ow = this.init_wb(_osize, _hsize);
    this.ob = this.init_wb(_osize, 1);
  }

  relu(matrix) {
    matrix.forEach(function (value, index, matrix) {
      if (value < 0) {
        matrix.subset(math.index(index[0], index[1]), 0);
      }
    });

    return matrix;
  }

  init_wb(m, n) {
    // Initializes random weights and biases between -1 and 1
    let matrix = math.ones(m, n);
    let new_num;

    matrix.forEach(function (value, index, matrix) {
      // There might be a better way to get a random value from -1 to 1 in JS
      if (Math.random() < 0.5) {
        new_num = Math.random();
      } else {
        new_num = -Math.random();
      }

      matrix.subset(math.index(index[0], index[1]), new_num);
    });

    return matrix;
  }

  feedforward(input) {
    input = math.matrix(input);
    input = input.resize([input.size()[0], 1]);

    let hidden_output = this.relu(
      math.add(math.multiply(this.hw, input), this.hb)
    );

    // This activation function should be different
    let output = this.relu(
      math.add(math.multiply(this.ow, hidden_output), this.ob)
    );
    return math.subset(output, math.index(0, 0));
  }

  mutate() {}
}
