import Card from './card';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 600;

function moveToNextPosition(cards, pivotPos, low, high) {
  ctx.clearRect(0, 0, 600, 200);
  ctx.fillStyle = 'rgb(99,138,127)';
  let finishedCycle = true;
  
  for (let i = low; i <= high; i += 1) {
    cards[i].moveToPosition();
    if (cards[i].moving === true) {
      finishedCycle = false;
    }
  }
  cards.forEach((card) => {
    card.render(ctx);
  });

  if (!finishedCycle) {
    window.requestAnimationFrame(() => {
      moveToNextPosition(cards, pivotPos, low, high);
    });
  } else {
    setTimeout( () => {
      console.log('calling this again');
      console.log(low);
      cards[pivotPos].selected = false;
      quickSort(cards, low, pivotPos - 1);
      quickSort(cards, pivotPos + 1, high);
      }, 1000);
  }
}

function swapCard(cards, i, j) {
  cards[i].nextPosition = j;
  cards[j].nextPosition = i;
  const swap = cards[i];
  cards[i] = cards[j];
  cards[j] = swap;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j += 1) {
    if (arr[j].height < pivot.height) {
      i += 1;
      swapCard(arr, i, j);
    }
  }
  swapCard(arr, i + 1, high);
  return (i + 1);
}

function quickSort(cards, low, high) {
  if (low < high) {
    const pivotPos = partition(cards, low, high);
    window.requestAnimationFrame(() => {
      cards[pivotPos].selected = true;
      moveToNextPosition(cards, pivotPos, low, high);
    });
  }
}

// const cards = Card.generateCards();
// quickSort(cards, 0, cards.length - 1);
// console.log(cards);
// cards.forEach((card) => {
//   console.log(card.height);
// });

function init() {
  const cards = Card.generateCards(50);

  window.requestAnimationFrame(() => {
    quickSort(cards, 0, cards.length - 1);
  });
  console.log(cards);
}

init();
