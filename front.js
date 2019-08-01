class frontGame {
  constructor(width, height, numberOfCards) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = [];
    this.gameOver = false;
    this.boardPlayer = [[], []];
    this.numberOfCards = numberOfCards;
    this.numberOfDifusers = Math.ceil(this.numberOfCards / 8);
    this.numberOfSergeants = Math.ceil(this.numberOfCards / 10);
    this.numberOfLieutenant = Math.round(this.numberOfCards / 10);;
    this.numberOfMarshal = 1;
    this.numberOfSpy = 1;
    this.numberOfBombs = Math.ceil(this.numberOfCards / 5);
    this.numbersOfOthers = this.numberOfBombs + this.numberOfDifusers + this.numberOfSergeants + 3 +this.numberOfLieutenant;
    this.playerTurn = 1;
    this.cards = [
      {
        name: 'Flag', qty: 1, level: 0, img: 'white-flag.png',
      },
      {
        name: 'Bomb', qty: this.numberOfBombs, level: 0, img: 'bomb.png',
      },
      {
        name: 'Soldier', qty: this.numberOfCards - this.numbersOfOthers, level: 1, img: 'soldier.png',
      },
      {
        name: 'BombDefuser', qty: this.numberOfDifusers, level: 2, img: 'defuser.png',
      },
      {
        name: 'Sergeant', qty: this.numberOfSergeants, level: 3, img: 'sergeant.png',
      },
      {
        name: 'Lieutenant', qty: this.numberOfLieutenant, level: 4, img: 'lieutenant.png',
      },
      {
        name: 'Marshal', qty: this.numberOfMarshal, level: 5, img: 'marshal.png',
      },
      {
        name: 'Spy', qty: this.numberOfSpy, level: 1, img: 'spy.png',
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

  checkIfOver(player) {
    console.log('completeboard', this.board);
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        console.log('board', i, j, this.board[i][j]);
        if (this.board[i][j] !== null && this.board[i][j].player === player) {
          if (this.board[i][j].level !== 0) {
            return false;
          }
        }
      }
    }
    this.gameOver = true;
    return true;
  }


  confront(attackerPosition, defenderPosition) {
    const line1 = Math.floor(attackerPosition / this.boardWidth);
    const column1 = attackerPosition % this.boardWidth;
    const line2 = Math.floor(defenderPosition / this.boardWidth);
    const column2 = defenderPosition % this.boardWidth;
    const attacker = this.board[line1][column1];
    const defender = this.board[line2][column2];

    switch (true) {
      case (defender.name === 'Flag' || attacker.name === 'Flag'):
        this.gameOver=true;
        return 0;

      case (defender.name === 'Bomb'):
        console.log(attacker.name)
        if(attacker.name !== 'BombDefuser' && attacker.name !== 'Marshal'){
          this.board[line1][column1] = null;
          this.board[line2][column2] = null;
          console.log(this.board);
          window.alert('Kaboom!!!');
          return 4;
        } 
          this.board[line2][column2] = attacker;
          this.board[line1][column1] = null;
          window.alert('Bomb Defused!')
          console.log(this.board);
          return 5;
        
      case (attacker.name === 'Spy'):
          this.board[line2][column2] = attacker;
          this.board[line1][column1] = null;
          window.alert(`${defender.name} was assassinated`)
          return 6

      case (attacker.level > defender.level):
        this.board[line2][column2] = attacker;
        this.board[line1][column1] = null;
        window.alert(`Attack was sucessful. Attacker shows a ${attacker.name} and Defender shows a ${defender.name}`);
        console.log(this.board);
        return 1;

      case (attacker.level < defender.level):
        window.alert(`Defense was sucessful. Defense shows a ${defender.name} and Attacker shows a ${atacker.name}`);
        this.board[line1][column1] = null;
        console.log(this.board);
        return 2;

      case (attacker.level === defender.level):
        this.board[line1][column1] = null;
        this.board[line2][column2] = null;
        console.log(this.board);
        window.alert(`It was a tie, both died. Both players shows ${defender.name}`);
        return 3;
    }
  }
}
