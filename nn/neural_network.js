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

  sigmoid(matrix) {
    let y;

    matrix.forEach(function (value, index, matrix) {
      y = 1 / (1 + math.e ** -value);

      matrix.subset(math.index(index[0], index[1]), y);
    });

    return matrix;
  }

  negOneToOne() {
    let num;

    if (Math.random() < 0.5) {
      num = Math.random();
    } else {
      num = -Math.random();
    }

    return num;
  }

  init_wb(m, n) {
    // Initializes random weights and biases between -1 and 1
    let matrix = math.ones(m, n);
    let new_num;
    let self = this;

    matrix.forEach(function (value, index, matrix) {
      // There might be a better way to get a random value from -1 to 1 in JS

      new_num = self.negOneToOne();

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
    let output = this.sigmoid(
      math.add(math.multiply(this.ow, hidden_output), this.ob)
    );

    return output;
  }

  // This is temporary but right now this is mutating the original neural network.
  // I might want this to make a copy eventually.
  mutate(mut_rate) {
    let self = this;
    let new_num;
    let scale = 0.2;

    this.hw.forEach(function (value, index, hw) {
      if (Math.random() < mut_rate) {
        new_num = value + self.negOneToOne() * scale;
        hw.subset(math.index(index[0], index[1]), new_num);
      }
    });

    this.hb.forEach(function (value, index, hb) {
      if (Math.random() < mut_rate) {
        new_num = value + self.negOneToOne() * scale;
        hb.subset(math.index(index[0], index[1]), new_num);
      }
    });

    this.ow.forEach(function (value, index, ow) {
      if (Math.random() < mut_rate) {
        new_num = value + self.negOneToOne() * scale;
        ow.subset(math.index(index[0], index[1]), new_num);
      }
    });

    this.ob.forEach(function (value, index, ob) {
      if (Math.random() < mut_rate) {
        new_num = value + self.negOneToOne() * scale;
        ob.subset(math.index(index[0], index[1]), new_num);
      }
    });

    return this;
  }
}
