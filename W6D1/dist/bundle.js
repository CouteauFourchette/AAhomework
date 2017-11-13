/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(1);


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
  const cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards(50);

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Card {
  constructor(position, height) {
    this.position = position;
    this.nextPosition = position;
    this.height = height;
    this.selected = false;
    this.moving = false;
    this.y = 0;
    this.x = 0;
  }
  render(ctx) {
    ctx.save();
    if (this.selected) {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(((this.position * 10) + this.x), (200 + this.y), 5, -this.height);
    ctx.restore();
  }

  moveUp() {
    if (this.y > -100) {
      this.y -= 1;
      this.moving = true;
    } else {
      this.moving = false;
    }
  }

  moveToPosition() {
    if (((this.position * 10) + this.x) > (this.nextPosition * 10)) {
      this.x -= 1;
      this.moving = true;
    } else if (((this.position * 10) + this.x) < (this.nextPosition * 10)) {
      this.x += 1;
      this.moving = true;
    } else {
      this.position = this.nextPosition;
      this.x = 0;
      this.moving = false;
    }
  }

  static generateCards(numberOfCards = 20) {
    const cards = [];
    for (let i = 0; i <= numberOfCards; i += 1) {
      const height = Math.floor((Math.random() * 60) + 10);
      const card = new Card(i, height);
      cards.push(card);
    }
    return cards;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ })
/******/ ]);