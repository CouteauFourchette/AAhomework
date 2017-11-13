import Card from './card';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 300;
canvas.width = 600;


function render(cards) {
  ctx.clearRect(0, 0, 600, 200);
  ctx.fillStyle = 'rgb(99,138,127)';
  cards.forEach((card) => {
    card.render(ctx);
  });
}

function moveToNextPosition(cards, pivotPos, low, high, doneCallback) {
  let finishedCycle = true;
  cards[pivotPos].selected = true;
  for (let i = low; i <= high; i += 1) {
    cards[i].moveToPosition();
    if (cards[i].moving === true) {
      finishedCycle = false;
    }
  }
  render(cards);
  if (!finishedCycle) {
    window.requestAnimationFrame(() => {
      moveToNextPosition(cards, pivotPos, low, high, doneCallback);
    });
  } else {
    setTimeout(() => {
      cards[pivotPos].selected = false;
      doneCallback();
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

      moveToNextPosition(cards, pivotPos, low, high, () => {
        quickSort(cards, low, pivotPos - 1);
        quickSort(cards, pivotPos + 1, high);
      });
    });
  }
}

function bubbleSort(cards) {
  let sorted = true;
  for (let i = 1; i <  cards.length; i += 1) {
    if (cards[i].height < cards[i - 1].height) {
      swapCard(cards, i, i - 1);
      sorted = false;
    }
  }
  if (!sorted) {
    window.requestAnimationFrame(() => {
      moveToNextPosition(cards, 0, 0, cards.length - 1, () => {
        bubbleSort(cards);
      });
    });
  }
}

function shuffle(cards) {
  for (let i = 0; i < cards.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    swapCard(cards, i, j);
  }
  window.requestAnimationFrame(() => {
    moveToNextPosition(cards, 0, 0, cards.length - 1);
  });
}


function init() {
  const cards = Card.generateCards(50);

  const quickSortButton = document.querySelector('.quicksort');
  quickSortButton.addEventListener('click', () => {
    window.requestAnimationFrame(() => {
      quickSort(cards, 0, cards.length - 1);
    });
    
    const bubbleSortButton = document.querySelector('.bubblesort');
    bubbleSortButton.addEventListener('click', () => {
      window.requestAnimationFrame(() => {
        bubbleSort(cards);
      });
    });

    const shuffleButton = document.querySelector('.shuffle');
    bubbleSortButton.addEventListener('click', () => {
      window.requestAnimationFrame(() => {
        shuffle(cards);
      });
    });
  });
  console.log(cards);
}

init();
