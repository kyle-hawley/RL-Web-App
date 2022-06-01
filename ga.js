// Reference: https://www.youtube.com/watch?v=YtRA6tqgJBc

function createNextGeneration(p, players, game) {
  calculateFitness(players);

  let next_generation = [];
  let parent_brain;
  let child;

  for (let i = 0; i < _stats_pkg.pop_size; i++) {
    if (game == "fishgame") {
      child = new Player(p, false);
    }

    parent_brain = pickPlayer(players).brain;
    child.brain = parent_brain.mutate();

    next_generation.push(child);
  }

  return next_generation;
}

function calculateFitness(players) {
  let score_sum = 0;

  for (let player of players) {
    score_sum += player.score;
  }

  for (let player of players) {
    player.fitness = player.score / score_sum;
  }

  console.log(score_sum / _stats_pkg.pop_size);
}

function pickPlayer(players) {
  let index = 0;
  let r = Math.random();

  while (r > 0) {
    r -= players[index].fitness;
    index++;
  }

  index--;
  return players[index];
}
