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

function setNextPositions(shift, left, pivot, right) {
  // const start = 0;
  // console.log(start);
  pivot.nextPosition = shift + left.length;
  left.forEach((el, i) => {
    el.nextPosition = shift + i;
  });
  right.forEach((el, i) => {
    el.nextPosition = shift + (left.length + 1 + i);
  });
  const result = left.slice(0);
  result.push(pivot);
  return result.concat(right);
}

// function selectCard(cards) {
//   ctx.clearRect(0, 0, 300, 300);
//   ctx.fillStyle = 'rgb(99,138,127)';
//   let finishedCycle = true;
//   cards[0].selected = true;
//   cards.forEach((card) => {
//     card.render(ctx);
//     if (card.moving === true) {
//       finishedCycle = false;
//     }
//   });
//   if (!finishedCycle) {
//     window.requestAnimationFrame(selectCard);
//   }
// }

function moveToNextPosition(cards) {
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
    window.requestAnimationFrame(() => {
      moveToNextPosition(cards);
    });
  }
}

function quickSort(cards, start, end) {
  if (start > end) {
    return [];
  }
  const pivot = cards[start]; // using first element as pivot
  pivot.selected = true;
  const left = [];
  const right = [];
  for (let i = start; i <= end; i += 1) {
    const element = cards[i];
    if (element.height < pivot.height) {
      left.push(element);
    } else {
      right.push(element);
    }
  }
  const nextCards = setNextPositions(start, left, pivot, right);
  window.requestAnimationFrame(() => {
    moveToNextPosition(nextCards);
  });
  // console.log(nextCards);
  pivot.selected = false;
  return
  return quickSort(nextCards, start, start + left.length - 1).concat([pivot], quickSort(right, start + left.length + 1, end));
}

function init() {
  const cards = Card.generateCards();

  window.requestAnimationFrame(() => {
    quickSort(cards, 0, cards.length - 1);
  });
}

init();
