class frontGame {
  constructor(width, height, numberOfCards) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = [];
    this.boardPlayer = [[], []];
    this.numberOfCards = numberOfCards;
    this.numberOfDifusers = Math.round(this.numberOfCards / 4);
    this.numberOfSergeants = Math.ceil(this.numberOfCards / 10);
    this.numberOfBombs = Math.round(this.numberOfCards / 5);
    this.playerTurn = 1;
    this.cards = [
      {
        name: 'BombDefuser', qty: this.numberOfDifusers, level: 1, img: '',
      },
      {
        name: 'Sergeant', qty: this.numberOfSergeants, level: 3, img: '',
      },
      {
        name: 'Flag', qty: 1, level: 0, img: '',
      },
      {
        name: 'Bomb', qty: this.numberOfBombs, level: 0, img: '',
      },
      {
        name: 'Soldier', qty: this.numberOfCards - this.numberOfDifusers - this.numberOfSergeants - this.numberOfBombs - 1, level: 1, img: '',
      },
    ];
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
    for (let i = 0; i < this.cards.length; i++) {
      for (let j = 0; j < this.cards[i].qty; j++) {
        this.boardPlayer[0].push({ name: this.cards[i].name, level: this.cards[i].level, player: 'Player1' });
        this.boardPlayer[1].push({ name: this.cards[i].name, level: this.cards[i].level, player: 'Player2' });
      }
    }
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

    console.log(`Attacker shows a ${attacker.name} and Defender shows a ${defender.name}`);

    switch (true) {
      case (defender.name === 'Flag' || attacker.name === 'Flag'):
        return 0;

      case (defender.name === 'Bomb'):
        this.board[line1][column1] = null;
        this.board[line2][column2] = null;
        console.log(game.board);
        window.alert('Kaboom!!!');
        return 4;

      case (attacker.level > defender.level):
        this.board[line2][column2] = attacker;
        this.board[line1][column1] = null;
        window.alert('Attack was sucessful');
        console.log(game.board);
        return 1;

      case (attacker.level < defender.level):
        window.alert('Defence was sucessful');
        this.board[line1][column1] = null;
        console.log(game.board);
        return 2;

      case (attacker.level === defender.level):
        this.board[line1][column1] = null;
        this.board[line2][column2] = null;
        console.log(game.board);
        window.alert('it was a tied, both died');
        return 3;
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
