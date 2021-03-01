document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrisPieces = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let randomPiece = Math.floor(Math.random() * tetrisPieces.length);

  let currentPosition = 4;
  let currentRotation = 0;
  let current = tetrisPieces[randomPiece][currentRotation];

  const drawPiece = () => {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  };

  const erasePiece = () => {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  };

  const control = (e) => {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
    }
  };

  document.addEventListener('keyup', control);

  const moveDown = () => {
    erasePiece();
    currentPosition += width;
    drawPiece();
    freeze();
  };

  timerId = setInterval(moveDown, 1000);

  const freeze = () => {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      randomPiece = nextRandom;
      randomPiece = Math.floor(Math.random() * tetrisPieces.length);
      current = tetrisPieces[randomPiece][currentRotation];
      currentPosition = 4;
      drawPiece();
      displayPiece();
    }
  };

  const moveLeft = () => {
    erasePiece();
    const leftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!leftEdge) currentPosition -= 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    drawPiece();
  };

  const moveRight = () => {
    erasePiece();
    const rightEdge = current.some((index) => (currentPosition + index) % width === width - 1);

    if (!rightEdge) currentPosition += 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition - +1;
    }
    drawPiece();
  };

  const rotate = () => {
    erasePiece();
    currentRotation++;

    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = tetrisPieces[randomPiece][currentRotation];
    drawPiece();
  };

  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;

  const upNextPiece = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  const displayPiece = () => {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    upNextPiece[nextRandom];
  };
});
