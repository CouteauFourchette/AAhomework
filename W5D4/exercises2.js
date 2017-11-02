function titleize(names, callback) {
  pretty_names = names.map(name => ('Mx. ' + name + ' Jingleheimer Schmidt') );
  callback && callback(pretty_names);
}

const printCallback = (strings) => {
  strings.forEach(el => console.log(el))
}

titleize(["Mary", "Brian", "Leo"], printCallback);

function Elephant(name, height, tricks) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function () {
  console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!'`);
};

Elephant.prototype.grow = function () {
  this.height += 12;
};

Elephant.prototype.addTrick = function (trick) {
  this.tricks.push(trick);
};

Elephant.prototype.play = function () {
  let brackets = 1 / (this.tricks.length);
  let pos = Math.floor(Math.random() / brackets);
  console.log(this.tricks[pos])
};

let eleph = new Elephant('George', 5, ['playing ball', 'doing things']);
eleph.trumpet();
eleph.grow();
console.log(eleph.height);
eleph.addTrick('Moving things around');
console.log(eleph.tricks);
eleph.play();

let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, charlie, kate, micah];

function paradeHelper(elephant) {
  console.log(elephant.name + ' is trotting by!')
}

herd.forEach(paradeHelper)


function foodString(foods) {
  result = "I'd like " + foods[0]
  for (var i = 1; i < foods.length; i++) {
    result += ' and ' + foods[i]
  }
  return result + " please."
}


function dinerBreakfast() {
  foods = ['scrambled eggs']
  console.log(foodString(foods));
  return (food) => {
    foods.push(food)
    console.log(foodString(foods));
  };
}

let bfastOrder = dinerBreakfast();
bfastOrder("chocolate chip pancakes");
bfastOrder("grits");
