const cards = [
  {
    name: 'Cabo', qty: 1, level: 2, img: '',
  },
  {
    name: 'Soldier', qty: 2, level: 1, img: '',
  },
  {
    name: 'Sargento', qty: 2, level: 3, img: '',
  },
  {
    name: 'flag', qty: 1, level: 0, img: '',
  },
];


class frontGame {
  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = [];
    this.boardPlayer = [[], []];
    this.numberOfCards = 0;
    this.playerTurn = 1;
  }

  createBoard() {
    for (let i = 0; i < this.boardHeight; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardWidth; j++) {
        this.board[i][j] = null;
      }
    }
  }

  populatePlayerField() {
    let count = 0;
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].qty; j++) {
        this.boardPlayer[0].push({ name: cards[i].name, level: cards[i].level, player: 1 });
        this.boardPlayer[1].push({ name: cards[i].name, level: cards[i].level, player: 2 });
        count += 1;
      }
    }
    this.numberOfCards = count;
  }

  positionPiece(initialPosition, endPosition, player) { // initial position of pieces
    const initial = this.boardPlayer[player][initialPosition];
    const line2 = Math.floor(endPosition / this.boardWidth);
    const column2 = endPosition % this.boardWidth;
    this.board[line2][column2] = initial;
    this.boardPlayer[player][initialPosition] = null;
  }

  movePiece(initialPosition, endPosition) {
    const line1 = Math.floor(initialPosition / this.boardWidth);
    const column1 = initialPosition % this.boardWidth;
    const line2 = Math.floor(endPosition / this.boardWidth);
    const column2 = endPosition % this.boardWidth;
    const initial = this.board[line1][column1];
    const final = this.board[line2][column2];
    this.board[line2][column2] = initial;
    this.board[line1][column1] = final;
  }

  checkInitial(initial) {
    // can only select its own pieces
    if (initial.player === playerTurn) {
      return true;
    }
  }

  checkFinal(line1, column1, line2, column2) {
    // can only move to adjacent squares
    if (Math.abs(line1 - line2) > 1 || Math.abs(column1 - column2) > 1) {
      return false;
    }
    // can only move to empty squares or enemy square
    if(this.board[line2][column2]===null){
      return true
    } else {
      if (this.board[line2][column2].player === this.playerTurn) {
        //console.log(this.board[line2][column2].player, 'player');
        return false;
      } else {
        this.confront()
      }
    }
  }


  confront() {
    let attacker = this.board[line1][column1];
    let defender = this.board[line2][column2]
    console.log(`Player ${attacker.player} shows a ${attacker.name} and Player ${defender.player} shows a ${defender.name}`)
    if(attacker.level > defender.level){
      this.board[line2][column2]=attacker
      console.log(`Attack was sucessful`)
    } else {
      console.log('Defence was sucessful')
    }

    this.board[line1][column1] = null
    // if square has enemy piece, turn pieces to check who has higher rank
    // remove piece from board and put into playerboard
    // if piece is the flag, game is over
  }
}

const game = new frontGame(5, 5);
game.populatePlayerField();

// game.movePiece();

game.board = [
  [cards[1], null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

game.movePiece(0, 5);

game.createBoard();
console.log(game.board, game.boardPlayer[0]);
game.positionPiece(1, 5, 0);
console.log(game.board);
game.movePiece(5, 1);
console.log(game.board);

console.log(game.checkFinal(1, 1, 0, 1));
