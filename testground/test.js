class Shark {
  constructor(name) {
    this.name = name;
  }
}

let sharks = [];

sharks.push(new Shark("Tony"))
sharks.push(new Shark("Larry"))
sharks.push(new Shark("Frank"))

console.log("Full list")
console.log(sharks)

for (let shark of sharks) {

  console.log("I chose this shark")
  console.log(shark)

  i = sharks.indexOf(shark);
  let removed_shark = sharks.splice(i, 1);
  console.log("removed")
  console.log(removed_shark)
}

console.log("final list")
console.log(sharks.length)