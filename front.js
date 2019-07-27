const cards = [
  {
 name: 'Cabo', qty: 1, level: 2, img: '' 
},
  {
 name: 'Soldier', qty: 2, level: 1, img: '' 
},
  {
 name: 'Sargento', qty: 2, level: 3, img: '' 
},
  {
 name: 'flag', qty: 1, level: 0, img: '' 
},
];

const board = [];


class frontGame {
  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = [];
    this.boardPlayer1 = [];
    this.boardPlayer2 = [];
    this.numberOfCards = 0;
  }

  populatePlayerField() {
    let count = 0;
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].qty; j++) {
        this.boardPlayer1[count] = cards[i];
        this.boardPlayer2[count] = cards[i];
        count += 1;
      }
    }
    this.numberOfCards = count;
  }

  movePiece(position1, position2) {
    this.board[position2[0], position2[1]] = this.board[position1[0], position1[1]];
    this.board[position1[0], position1[1]] = null;
  }

  checkMove() {

  }

  confront() {

  }
}

const game = new frontGame(5, 5);
game.populatePlayerField();
console.log(game.boardPlayer1);

//game.movePiece();
