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
canvas.height = 500;
canvas.width = 500;

// function animateN(i, el) {
//   ctx.clearRect(i * 10, 200, 5, -100);
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(i * 10, 200, 5, -el);
// }
let cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateCards();
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
      this.moveUp();
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
    for (let i = 0; i < numberOfCards; i += 1) {
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