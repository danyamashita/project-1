


document.querySelector('button').onclick = function () {

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
      this.boardPlayer1.innerHTML = "";
      this.boardPlayer2.innerHTML = "";
      this.board.innerHTML = "";
      for (let i = 0; i < game.numberOfCards; i++) {
        this.boardPlayer1.innerHTML += '<div class = "Player1 square "><div class = icon> </div></div>';
      }

      for (let i = 0; i < game.boardHeight; i++) {
        for (let j = 0; j < game.boardWidth; j++) {
          this.board.innerHTML += '<div class = "square"></div>';
        }
      }

      for (let i = 0; i < game.numberOfCards; i++) {
        this.boardPlayer2.innerHTML += '<div class = "Player2 square"><div class = icon> </div></div>';
      }

      // const board = document.getElementById('board');
      const boardWidth = game.boardWidth * (60 + 2 * 5 + 6); // square size + margin + border
      board.style.width = `${boardWidth}px`;
      this.board.style.width = `${boardWidth}px`;
      this.boardPlayer1.style.width = `${boardWidth}px`;
      this.boardPlayer2.style.width = `${boardWidth}px`;
    },

    playerPieces() {

      for (let i = 0; i < game.numberOfCards; i++) {
        this.boardPlayer1.children[i].classList.add(game.boardPlayer[0][i].name);
        this.boardPlayer2.children[i].classList.add(game.boardPlayer[1][i].name);
      }
    },

    loadList() {
      const list = document.querySelector('ul');
      list.innerHTML = '';
      for (let k = 0; k < game.cards.length; k++) {
        list.innerHTML += `<li><img src = "./pictures/${game.cards[k].img}" width=20px height=20px>  ${game.cards[k].name}</li>`;
      }
    },

    initialPositioning(player, element, index) {
      if (myHtml.savedIndex.length === 0) {
        if (element.classList[0] === player) {
          myHtml.savedClasses.push(element.classList.value.split(' '));
          myHtml.savedIndex.push(index);
          element.classList.toggle('active');
          return;
        // console.log(myHtml.savedIndex)
        }
        return window.alert(`${player} you can only select your own pieces`);
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
        console.log(this.savedClasses, 'class', square[myHtml.savedIndex[1]].classList[1]);

        /* for(let k=0; k<myHtml.savedIndex-1; k++){
        square[myHtml.savedIndex[1]].classList.add(myHtml.savedClasses[k]);
      } */
        myHtml.savedClasses[0].forEach((classe) => {
          square[myHtml.savedIndex[1]].classList.add(classe);
        // square[myHtml.savedIndex[1]].classList.remove(myHtml.savedClasses[0][2]);
        });
        myHtml.savedClasses[1].forEach((classe) => {
          square[myHtml.savedIndex[0]].classList.add(classe);
        // square[myHtml.savedIndex[0]].classList.remove(myHtml.savedClasses[1][2]);
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
        if (myHtml.counter === game.numberOfCards) {
          myHtml.player = myHtml.players[1];
          myHtml.printTurn();
          myHtml.toggleAll('Player1')
          myHtml.toggleAll('Player2')
          setTimeout(() => {
            window.alert('Player 2 position your pieces');
          }, 500);
        }
        if (myHtml.counter === 2 * game.numberOfCards) {
          myHtml.player = myHtml.players[0];
          myHtml.printTurn();
          myHtml.toggleAll('Player1')
          myHtml.toggleAll('Player2')
          setTimeout(() => {
            window.alert('Time to Battle!');
          }, 500);
        }
      }
    } /* end function */,

    movePiece(player, element, index) {
      console.log(player, element, index);
      if (myHtml.savedIndex.length === 0) {
        if (element.classList[0] === player) {
          const line = Math.floor((index - game.numberOfCards) / game.boardWidth);
          const column = (index - game.numberOfCards) % game.boardWidth;
          if (game.board[line][column].name === 'Bomb' || game.board[line][column].name === 'Flag') {
            return window.alert(`${player}, Bombs and Flags can not walk`);
          }
          myHtml.savedClasses.push(element.classList.value.split(' '));
          myHtml.savedIndex.push(index - game.numberOfCards);
          element.classList.toggle('active');
          console.log(myHtml.savedIndex);
          return;
        }
        return window.alert(`${player} you can only select your own pieces`);
      }

      if (myHtml.savedIndex.length === 1) {
        console.log('index sucesso', index, myHtml.savedIndex[0]);
        if (index - game.numberOfCards === myHtml.savedIndex[0]) {
          element.classList.toggle('active');
          myHtml.savedClasses = [];
          myHtml.savedIndex = [];
          return;
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
        myHtml.savedClasses = [];
        myHtml.savedIndex = [];
        myHtml.toggleAll('Player1')
        myHtml.toggleAll('Player2')
      } else { //here is if there was a confront
          this.toggleCard(myHtml.savedIndex[1]+game.numberOfCards)
            console.log('estou funcionando')
            setTimeout(()=>{
              this.toggleCard(myHtml.savedIndex[1]+game.numberOfCards)
              switch (game.confront(myHtml.savedIndex[0], myHtml.savedIndex[1])) {
                case 0:
                  window.alert(`${player} captured the Flag and won`);
                  break;
    
                case 1:
                case 5:
                case 6:
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
  
  
            if(!this.gameOver(player)){
              console.log('checando game over antes de alterar',game.gameOver)
                myHtml.savedClasses = [];
                myHtml.savedIndex = [];
                myHtml.toggleAll('Player1')
                myHtml.toggleAll('Player2')
  
            }

            })


      }

      this.changePlayer(player);
      myHtml.printTurn(myHtml.player);
    },

    gameOver(player){

      let otherPlayer = 'Player1'
      if(player === 'Player1'){
        otherPlayer = 'Player2'
      }

      switch(true){
        case (game.checkIfOver('Player1') && game.checkIfOver('Player2')):
          this.toggleAll(otherPlayer)
          square.forEach((element)=>{
            element.classList.add('blocked')
          })
           window.alert('It was a tie, both players have no moving pieces')
           return true
          
        case (game.checkIfOver('Player1')):
            this.toggleAll(otherPlayer)
            square.forEach((element)=>{
              element.classList.add('blocked')
            })
          window.alert('Player 2 won! Player 1 has not more moves')
          return true

        case (game.checkIfOver('Player2')):
            this.toggleAll(otherPlayer)
            square.forEach((element)=>{
              element.classList.add('blocked')
            })
           window.alert('Player 1 won! Player 2 has no more moves')
           return true

        case (game.gameOver === true):
            this.toggleAll(otherPlayer)
            square.forEach((element)=>{
              element.classList.add('blocked')
            })
            return true
      }
    },

    changePlayer(player) {
      if (player === this.players[0]) {
        myHtml.player = this.players[1];
      } else {
        myHtml.player = this.players[0];
      }
    },

    calculateIndexToMatrix(index) {
      //console.log('entrei', index)
      if (index < game.numberOfCards) {
        //console.log('calculate 1')
        return index;
      }
      if (index >= game.numberOfCards && index < square.length - game.numberOfCards) {
        //console.log('calculate 2', index - game.numberOfCards)
        return index - game.numberOfCards;
      }
      if (index >= square.length - game.numberOfCards) {
        //console.log('calculate 3')
        return index - square.length + game.numberOfCards;
      }
    },

    toggleCard(index, player) {
      switch (true) {
        case (index < game.numberOfCards):
          if (game.boardPlayer[myHtml.players.indexOf(player)][index].name !== null) {
            //console.log(index, player, myHtml.players.indexOf(player), 'gameboardplayer', game.boardPlayer[myHtml.players.indexOf(player)][index])
            square[index].classList.toggle(game.boardPlayer[myHtml.players.indexOf(player)][index].name);
          }
          break;

        case (index >= game.numberOfCards && index < square.length - game.numberOfCards):
          //console.log(myHtml.calculateIndexToMatrix(index), game.boardWidth)
          const line1 = Math.floor(myHtml.calculateIndexToMatrix(index) / game.boardWidth);
          const column1 = myHtml.calculateIndexToMatrix(index) % game.boardWidth;
          //console.log(line1, column1)
          if (game.board[line1][column1]!==null) {
            square[index].classList.toggle(game.board[line1][column1].name);
          }
          break;

        case (index >= square.length - game.numberOfCards):
          //console.log(this.calculateIndexToMatrix(index))
          if (game.boardPlayer[this.players.indexOf(player)][this.calculateIndexToMatrix(index)] !== null) {
            square[index].classList.toggle(game.boardPlayer[this.players.indexOf(player)][this.calculateIndexToMatrix(index)].name);
          }
      }
    },

    toggleAll(player) {
      square.forEach((element, index) => {
        if (element.classList[0] === player) {
          //console.log('toggleall', index)
          this.toggleCard(index, player);
        }
      });
    },

    printTurn() {
      const turn = document.querySelector('#turn');
      turn.innerHTML = `${myHtml.player}`;
    },


  };


  const game = new frontGame(8, 8, 16);
  game.populatePlayerField();
  game.createBoard();
  myHtml.drawBoard();
  myHtml.playerPieces();
  myHtml.loadList();
  const square = document.querySelectorAll('.square');
  

  setTimeout(() => {
    //window.alert('Player 1 position your pieces');
  }, 500);
  myHtml.printTurn();
  myHtml.toggleAll('Player2')
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
};
