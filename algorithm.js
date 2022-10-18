function bestMove(board,turn) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
       
        if (board[i][j] == 0) {
          board[i][j] = turn;
          let score = minimax(board, 0, false,-Infinity,Infinity);
          board[i][j] = 0;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    board[move.i][move.j] = turn;
    updateBoardGUI(move.i,move.j,turn);
  }
  
  
  function minimax(localboard, depth, isMaximizing,alpha,beta) {
    let result = checkForWin(localboard);
    if (result ==-1 || result==1 || result==0) {
      return result*10;
    }
  
    if (isMaximizing) {
    //   let bestScore = -Infinity;
      for (let i = 0; i < localboard.length; i++) {
        for (let j = 0; j < localboard.length; j++) {
          if (localboard[i][j] == 0) {
            localboard[i][j] = 1;
            let score = minimax(localboard, depth + 1, false,alpha,beta);
            localboard[i][j] = 0;
            // bestScore = Math.max(score, bestScore);
            if (score > alpha) alpha = score
            if (alpha >= beta) return alpha;  // beta cut-off
          }
        }
      }
      return alpha;
    } else {
    //   let bestScore = Infinity;
      for (let i = 0; i < localboard.length; i++) {
        for (let j = 0; j < localboard.length; j++) {
          if (localboard[i][j] == 0) {
            localboard[i][j] = -1;
            let score = minimax(localboard, depth + 1, true,alpha,beta);
            localboard[i][j] = 0;
            // bestScore = Math.min(score, bestScore);
            if (score < beta) beta = score
            if (alpha >= beta) return beta;  // alpha cut-off
          }
        }
      }
      return beta;
    }
  }