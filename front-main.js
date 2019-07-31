
const myHtml = {
  boardPlayer1: document.querySelector('#player-1'),
  boardPlayer2: document.querySelector('#player-2'),
  board: document.querySelector('#board'),
  counter: 0,
  players: ['Player1', 'Player2'],
  player: 'Player1',
  savedClasses: [],
  savedIndex: [],

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

    let board = document.getElementById('board')
    let boardWidth = game.boardWidth*(80+2*10+6); //square size + margin + border
    board.style.width = `${boardWidth}px`;

  },

  playerPieces() {
    for (let i = 0; i < game.numberOfCards; i++) {
      this.boardPlayer1.children[i].classList.add(game.boardPlayer[0][i].name);
      this.boardPlayer2.children[i].classList.add(game.boardPlayer[1][i].name);
    }
  },

  initialPositioning(player, element, index) {
    if (myHtml.savedIndex.length === 0) {
      if (element.classList[0] === player) {
        myHtml.savedClasses.push(element.classList.value.split(' '));
        myHtml.savedIndex.push(index);
        element.classList.toggle('active')
        return
        // console.log(myHtml.savedIndex)
      } else {
        return window.alert(`${player} you can only select your own pieces`);
      }
    }
    if (myHtml.savedIndex.length === 1) {
      // console.log('sucesso', myHtml.savedIndex)
      
      if (element.classList[0] !== myHtml.players[0] && element.classList[0] !== myHtml.players[1]) {
        myHtml.savedClasses.push(element.classList.value.split(' '));
        myHtml.savedIndex.push(index);
        // console.log(myHtml.savedIndex)
      } else {
        window.alert(`${player}, please select an empty spot`);
      }
    }

    if (myHtml.savedIndex.length === 2) {
      square[myHtml.savedIndex[0]].classList = '';
      square[myHtml.savedIndex[1]].classList = '';

      myHtml.savedClasses[0].forEach((classe) => {
        square[myHtml.savedIndex[1]].classList.add(classe);
      });
      myHtml.savedClasses[1].forEach((classe) => {
        square[myHtml.savedIndex[0]].classList.add(classe);
      });
      console.log(myHtml.savedIndex, game.numberOfCards);
      if (myHtml.savedIndex[0] >= game.numberOfCards && myHtml.savedIndex[0] < square.length - game.numberOfCards) {
        console.log(myHtml.savedIndex[0], square.length, game.numberOfCards);
        game.movePiece(myHtml.savedIndex[0] - game.numberOfCards, myHtml.savedIndex[1] - game.numberOfCards);
      } else if (myHtml.savedIndex[0] < game.numberOfCards) {
        square[myHtml.savedIndex[0]].classList.add('blocked');
        game.positionPiece(myHtml.savedIndex[0], myHtml.savedIndex[1] - game.numberOfCards, player);
        myHtml.counter += 1;
      } else {
        square[myHtml.savedIndex[0]].classList.add('blocked');
        game.positionPiece(myHtml.savedIndex[0] - square.length + game.numberOfCards, myHtml.savedIndex[1] - game.numberOfCards, player);
        myHtml.counter += 1;
      }
      myHtml.savedClasses = [];
      myHtml.savedIndex = [];
      if(myHtml.counter === game.numberOfCards){
        setTimeout(function(){
          window.alert('Player 2 position your pieces')
        }, 500)
      }
      if(myHtml.counter === 2*game.numberOfCards){
        setTimeout(function(){
          window.alert('Time to Battle!')
        }, 500)
      }
    }
  } /* end function */,

  movePiece(player, element, index) {
    console.log(player, element, index);
    if (myHtml.savedIndex.length === 0) {
      if (element.classList[0] === player) {
        const line = Math.floor((index-game.numberOfCards)/ game.boardWidth);
        const column = (index-game.numberOfCards) % game.boardWidth;
        if(game.board[line][column].name === 'Bomb' || game.board[line][column].name === 'Flag'){
          return window.alert(`${player}, Bombs and Flags can not walk`)
        } else {
          myHtml.savedClasses.push(element.classList.value.split(' '));
          myHtml.savedIndex.push(index - game.numberOfCards);
          element.classList.toggle('active')
          console.log(myHtml.savedIndex);
          return;
        }
      }
      return window.alert(`${player} you can only select your own pieces`);
    }

    if (myHtml.savedIndex.length === 1) {
      console.log('index sucesso', index, myHtml.savedIndex[0])
      if(index - game.numberOfCards === myHtml.savedIndex[0]){
        element.classList.toggle('active')
        myHtml.savedClasses = [];
        myHtml.savedIndex = [];
        return
      }
      console.log('sucesso', myHtml.savedIndex, index);
      if (element.classList[0] !== player && game.checkDistance(myHtml.savedIndex[0], index - game.numberOfCards)) {
        myHtml.savedClasses.push(element.classList.value.split(' '));
        myHtml.savedIndex.push(index - game.numberOfCards);
        // console.log(myHtml.savedIndex)
      } else {
        return window.alert(`${player}, you can only walk 1 square at a time`);
      }
    }

    if (game.checkIfEmpty(myHtml.savedIndex[1])) {
      console.log('andou');
      game.movePiece(myHtml.savedIndex[0], myHtml.savedIndex[1]);
      square[myHtml.savedIndex[0] + game.numberOfCards].classList = '';
      square[myHtml.savedIndex[1] + game.numberOfCards].classList = '';

      myHtml.savedClasses[0].forEach((classe) => {
        square[myHtml.savedIndex[1] + game.numberOfCards].classList.add(classe);
      });
      myHtml.savedClasses[1].forEach((classe) => {
        square[myHtml.savedIndex[0] + game.numberOfCards].classList.add(classe);
      });
    } else {
      switch (game.confront(myHtml.savedIndex[0], myHtml.savedIndex[1])) {
        case 0:
          window.alert(`${player} captured the Flag and won`);
          break;

        case 1:
          square[myHtml.savedIndex[0] + game.numberOfCards].classList = 'square';
          square[myHtml.savedIndex[1] + game.numberOfCards].classList = '';

          myHtml.savedClasses[0].forEach((classe) => {
            square[myHtml.savedIndex[1] + game.numberOfCards].classList.add(classe);
          });
          break;

        case 2:
          square[myHtml.savedIndex[0] + game.numberOfCards].classList = 'square';
          break;

        case 3:
        case 4:
          square[myHtml.savedIndex[0] + game.numberOfCards].classList = 'square';
          square[myHtml.savedIndex[1] + game.numberOfCards].classList = 'square';
          break;
      }
    }
    myHtml.savedClasses = [];
    myHtml.savedIndex = [];
    console.log('old player', myHtml.player);
    this.changePlayer(player);
    console.log('new player', myHtml.player);
  },

  changePlayer(player) {
    if (player === this.players[0]) {
      myHtml.player = this.players[1];
    } else {
      myHtml.player = this.players[0];
    }
  },


};

const game = new frontGame(4, 4, 5);
game.populatePlayerField();
game.createBoard();
myHtml.drawBoard();
myHtml.playerPieces();
// const square = document.querySelectorAll('.board');
const square = document.querySelectorAll('.square');
const boardPlayer1 = document.querySelectorAll('.Player1');
const boardPlayer2 = document.querySelectorAll('.Player2');


setTimeout(function(){
  window.alert('Player 1 position your pieces')
}, 500)
square.forEach((element, index) => {
  element.onclick = function () {
    switch (true) {
      case (myHtml.counter < game.numberOfCards):
        // player 1 position pieces
        myHtml.initialPositioning('Player1', element, index);
        console.log('case1');
        break;

      case (myHtml.counter >= game.numberOfCards && myHtml.counter < 2 * game.numberOfCards):
        // player 2 position pieces

        myHtml.initialPositioning('Player2', element, index);
        console.log('case2');
        break;

      case (myHtml.counter >= 2 * game.numberOfCards):
        // play
        console.log('case3');
        myHtml.movePiece(myHtml.player, element, index);
    }
  };
});

/* myHtml.counter = 20;
const teste1 = 10 - game.numberOfCards;
const teste2 = 15 - game.numberOfCards;
square[10].classList.add('Player1');
square[10].classList.add('Cabo');
square[10].classList.remove('square');
square[10].classList.add('square');

square[15].classList.add('Player2');
square[15].classList.add('Flag');
square[15].classList.remove('square');
square[15].classList.add('square');

const line3 = Math.floor(teste1 / game.boardWidth);
const column3 = teste1 % game.boardWidth;
const line4 = Math.floor(teste2 / game.boardWidth);
const column4 = teste2 % game.boardWidth;

game.board[line3][column3] = { name: 'Cabo', level: 2, player: 'Player1' };
game.board[line4][column4] = { name: 'flag', level: 0, player: 'Player2' };
console.log(game.board);*/
