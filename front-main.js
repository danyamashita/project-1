
const myHtml = {
  boardPlayer1: document.querySelector('#player-1'),
  boardPlayer2: document.querySelector('#player-2'),
  board: document.querySelector('#board'),

  drawBoard() {
    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer1.innerHTML += '<div class = "Player1 square "></div>';
    }

    for (let i = 0; i < game.boardHeight; i++) {
      for (let j = 0; j < game.boardWidth; j++) {
        this.board.innerHTML += '<div class = "square"></div>';
      }
    }

    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer2.innerHTML += '<div class = "Player2 square"></div>';
    }
  },

  playerPieces() {
    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer1.children[i].classList.add(game.boardPlayer[0][i].name);
      this.boardPlayer2.children[i].classList.add(game.boardPlayer[1][i].name);
    }
  },

  initialPositioning() {
    const savedClasses = [];
    const savedIndex = [];
    boardPlayer1.forEach((piece, index) => {
      piece.onclick = function () {
        savedClasses.push(piece.classList.value.split(' '));
        savedIndex.push(index);
        console.log(savedClasses, savedIndex);

        square.forEach((boardPiece, boardIndex) => {
          boardPiece.onclick = function () {
            savedClasses.push(boardPiece.classList.value.split(' '));
            savedIndex.push(boardIndex);
            console.log(savedClasses, savedIndex);
            if (savedIndex.length === 2) {
              square[savedIndex[1]].classList.add(game.boardPlayer[0][savedIndex[0]].name);
              boardPlayer1[savedIndex[0]].classList.remove(game.boardPlayer[0][savedIndex[0]].name);
            }
          };
        });
      };
    });
  },

  movePiece(player) {
    let savedClasses = [];
    let savedIndex = [];
    square.forEach((element, index) => {
      element.onclick = function (e) {
        savedClasses.push(element.classList.value.split(' '));
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
          console.log(savedIndex)
          if (savedIndex[0] > game.numberOfCards && savedIndex[0] < square.length - game.numberOfCards) {
            game.movePiece(savedIndex[0] - game.numberOfCards, savedIndex[1] - game.numberOfCards);
          } else {
            if(savedIndex[0]<game.numberOfCards){
              square[savedIndex[0]].classList.add('blocked');
              game.positionPiece(savedIndex[0], savedIndex[1]-game.numberOfCards, player)
            } else {
              square[savedIndex[0]].classList.add('blocked');
              game.positionPiece(savedIndex[0]-square.length+game.numberOfCards, savedIndex[1]-game.numberOfCards, player)
            }
            

          }
          savedClasses = [];
          savedIndex = [];
        }
      };
    });
  },


};

const game = new frontGame(5, 5);
game.populatePlayerField();
game.createBoard();
myHtml.drawBoard();
myHtml.playerPieces();
// const square = document.querySelectorAll('.board');
const square = document.querySelectorAll('.square');
const boardPlayer1 = document.querySelectorAll('.Player1');
const boardPlayer2 = document.querySelectorAll('.Player2');

// square[1].classList.toggle('red');
// const savedClasses = [];
// const savedIndex = [];
// console.log(boardPlayer1)

myHtml.movePiece(0);
// myHtml.initialPositioning();


// console.log('teste', myGame.boardPlayer1.children[1]);
