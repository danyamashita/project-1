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
    name: 'Flag', qty: 1, level: 0, img: '',
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
        this.boardPlayer[0].push({ name: cards[i].name, level: cards[i].level, player: 'Player1' });
        this.boardPlayer[1].push({ name: cards[i].name, level: cards[i].level, player: 'Player2' });
        count += 1;
      }
    }
    this.numberOfCards = count;
  }

  positionPiece(initialPosition, endPosition, player) { // initial position of pieces
    let playerIndex;
    if (player === 'Player1') {
      playerIndex = 0;
    } else {
      playerIndex = 1;
    }
    const initial = this.boardPlayer[playerIndex][initialPosition];
    const line2 = Math.floor(endPosition / this.boardWidth);
    const column2 = endPosition % this.boardWidth;


    this.board[line2][column2] = initial;
    this.boardPlayer[playerIndex][initialPosition] = null;
    console.log('Position player', this.boardPlayer, 'board', this.board);
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
    console.log('Move board', this.board);
  }

  checkDistance(initialPosition, endPosition) {
    // can only move to adjacent squares
    const line1 = Math.floor(initialPosition / this.boardWidth);
    const column1 = initialPosition % this.boardWidth;
    const line2 = Math.floor(endPosition / this.boardWidth);
    const column2 = endPosition % this.boardWidth;
    if (Math.abs(line1 - line2) > 1 || Math.abs(column1 - column2) > 1) {
      return false;
    }
    return true;
  }

  checkIfEmpty(endPosition) {
    const line2 = Math.floor(endPosition / this.boardWidth);
    const column2 = endPosition % this.boardWidth;
    if (this.board[line2][column2] === null) {
      return true;
    }
  }


  confront(attackerPosition, defenderPosition) {
    const line1 = Math.floor(attackerPosition / this.boardWidth);
    const column1 = attackerPosition % this.boardWidth;
    const line2 = Math.floor(defenderPosition / this.boardWidth);
    const column2 = defenderPosition % this.boardWidth;
    const attacker = this.board[line1][column1];
    const defender = this.board[line2][column2];

    if (defender.level === 0) {
      console.log('Atacante capturou a bandeira e venceu')
      return 0;
    }
    console.log(`Player ${attacker.player} shows a ${attacker.name} and Player ${defender.player} shows a ${defender.name}`);
    if (attacker.level > defender.level) {
      this.board[line2][column2] = attacker;
      this.board[line1][column1] = null;
      console.log('Attack was sucessful');
      console.log(game.board)
      return 1
      
    } else {
      console.log('Defence was sucessful');
      console.log(game.board)
      this.board[line1][column1]=null
      return 2
    }
  }
}


// game.movePiece();
// const game = new frontGame(5, 5);
// game.populatePlayerField();
/*
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
*/
