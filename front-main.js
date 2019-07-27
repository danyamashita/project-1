
const myGame = {
  boardPlayer1: document.querySelector('#player-1'),
  boardPlayer2: document.querySelector('#player-2'),
  board: document.querySelector('#board'),
  numberOfPieces: 5,

  drawBoard() {
    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer1.innerHTML += `<div class = "square Player1 Player1-${i}"></div>`;
    }

    for (let i = 0; i < game.boardHeight; i++) {
      for (let j = 0; j < game.boardWidth; j++) {
        this.board.innerHTML += '<div class = "square board"></div>';
      }
    }

    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer2.innerHTML += `<div class = "square Player2 Player2-${i}"></div>`;
    }
  },

  piecesOnBoard() {
    // console.log(this.boardPlayer1);
  },
};

myGame.drawBoard();
myGame.piecesOnBoard();

const square = document.querySelectorAll('.board');

square[1].classList.toggle('red');
let savedClasses = [];
let savedIndex = [];

square.forEach((element, index) => {
  element.onclick = function (e) {
    savedClasses.push(element.classList.value.split(" "));
    savedIndex.push(index);
    if (savedIndex.length === 2) {
      square[savedIndex[0]].classList = '';
      square[savedIndex[1]].classList = '';

      savedClasses[0].forEach((classe) => {
        square[savedIndex[1]].classList.add(classe);
      });
      savedClasses[1].forEach((classe) => {
        square[savedIndex[0]].classList.add(classe);
      });
      savedClasses=[]
      savedIndex=[]
    }
  };
});

