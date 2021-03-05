document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;

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
      case 40:
        moveDown();
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

  // timerId = setInterval(moveDown, 50);

  const freeze = () => {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      randomPiece = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrisPieces.length);
      current = tetrisPieces[randomPiece][currentRotation];
      currentPosition = 4;
      drawPiece();
      displayPiece();
      addScore();
      gameOver();
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
  const displayIndex = 0;

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
    upNextPiece[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  };

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      drawPiece();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * tetrisPieces.length);
      displayPiece();
    }
  });

  const addScore = () => {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetrimino');
        });

        const removedSquares = squares.splice(i, width);

        squares = removedSquares.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  };

  const gameOver = () => {
    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'Game Over';
      clearInterval(timerId);
    }
  };
});
