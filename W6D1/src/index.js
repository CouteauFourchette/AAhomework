import Card from './card';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 500;

// function animateN(i, el) {
//   ctx.clearRect(i * 10, 200, 5, -100);
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(i * 10, 200, 5, -el);
// }
let cards = Card.generateCards();
for (let i = 0; i < cards.length; i += 1) {
  console.log(cards[i].height);
}

function setNextPositions() {
  const left = [];
  const right = [];
  for (let i = 1; i < cards.length; i += 1) {
    if (cards[i].height < cards[0].height) {
      left.push((cards[i]));
    } else {
      right.push((cards[i]));
    }
  }
  cards[0].nextPosition = left.length;
  left.forEach((el, i) => {
    el.nextPosition = i;
  });
  right.forEach((el, i) => {
    el.nextPosition = (left.length + 1 + i);
  });
  left.push(cards[0]);
  cards = left.concat(right);
}

function selectCard() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = 'rgb(99,138,127)';
  let finishedCycle = true;
  cards[0].selected = true;
  cards.forEach((card) => {
    card.render(ctx);
    if (card.moving === true) {
      finishedCycle = false;
    }
  });
  if (!finishedCycle) {
    window.requestAnimationFrame(selectCard);
  } else {
    setNextPositions();
    console.log(cards);
    window.requestAnimationFrame(moveToNextPosition);
  }
}

function moveToNextPosition() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = 'rgb(99,138,127)';
  let finishedCycle = true;
  cards.forEach((card) => {
    card.render(ctx);
    card.moveToPosition();
    if (card.moving === true) {
      finishedCycle = false;
    }
  });
  if (!finishedCycle) {
    window.requestAnimationFrame(moveToNextPosition);
  } else {
    window.requestAnimationFrame(selectCard);
  }
}

function init() {
  window.requestAnimationFrame(selectCard);
}

init();
