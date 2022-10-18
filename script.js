let player={
    x:1,
    o:-1,
    tie:0,
    unfinish:-5
};
function createGUIBoard(size){
    let board = document.getElementsByClassName("board")[0];
    for(let i=0;i<size;i++){
        let rowDiv=document.createElement("div");
        rowDiv.classList.add("row");
        for(let j=0;j<size;j++){
            let gridDiv=document.createElement("div");
            gridDiv.innerHTML="";
            gridDiv.classList.add("grid");
            gridDiv.classList.add(i+":"+j);
            rowDiv.appendChild(gridDiv);
        }
        board.appendChild(rowDiv);
    }
}
function updateBoardGUI(x,y,res){
    document.getElementsByClassName(x+":"+y)[0].innerHTML=(res==1)?"X":"O";
}
function updateStatusGUI(response){
    document.getElementById("status").innerHTML=response;
}
function createBoard(size){
    let board=[];
    for(let i=1;i<=size;i++)board.push(new Array(size));
    for(let i=0;i<size;i++)board[i].fill(0);
    return board;
}
function checkForWin(board){
    
    // horizontally
    for(let i=0;i<board.length;i++){
        let x=0,o=0;
        for(let j=0;j<board.length;j++){
            if(board[i][j]==1)x++;
            else if(board[i][j]==-1)o++;
        }
        if(x==board.length)return player.x;
        if(o==board.length)return player.o;
    }
    // vertically
    for(let i=0;i<board.length;i++){
        let x=0,o=0;
        for(let j=0;j<board.length;j++){
            if(board[j][i]==1)x++;
            else if(board[j][i]==-1)o++;
        }
        if(x==board.length)return player.x;
        if(o==board.length)return player.o;
    }
    // diagonally and anti-diagonally
    let x1=0,o1=0,x2=0,o2=0,blank=0;
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board.length;j++){
            if(i==j){
                if(board[j][i]==1)x1++;
                else if(board[j][i]==-1)o1++;
            }
            if(i+j == board.length-1){
                if(board[j][i]==1)x2++;
                else if(board[j][i]==-1)o2++;
            }
            if(board[i][j]==0)blank++;
        }
    }
    if(x1==board.length || x2==board.length)return player.x;
    if(o1==board.length || o2==board.length)return player.o;
    if(blank == 0)return player.tie;
    return player.unfinish;
}
function gameStatus(status){
    if(status==1)return "X wins";
    else if(status==-1)return "O wins";
    else if(status==0)return "Tie";
    else return "Error";
}
function player1(board,x,y){
    
    board[x][y]=1;
    updateBoardGUI(x,y,board[x][y]);
}
function player2(board,x,y){
    board[x][y]=-1;
    updateBoardGUI(x,y,board[x][y]);
}

function playerTurn(board,turn,x,y){
    if(turn==1)return player1(board,x,y);
    else if(turn==-1)return player2(board,x,y);
}
function startGame(){
    let boardSize=3;
    createGUIBoard(boardSize);
    let board = createBoard(boardSize);
    let turn=true;
    bestMove(board,1) // AI move
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board.length;j++){
            document.getElementsByClassName(i+":"+j)[0].addEventListener("click",(e)=>{
                if(e){
                    let res=e.target.classList[1].split(":");
                    let x=parseInt(res[0]),y=parseInt(res[1]);
                    // if(turn){
                    //     playerTurn(board,1,x,y);
                    // }else{
                    //     playerTurn(board,-1,x,y);
                    // }
                    // turn=!turn;
                    playerTurn(board,-1,x,y); // human turn
                    bestMove(board,1) // AI move
                    let status = checkForWin(board);
                    if(status!=-5)  updateStatusGUI(gameStatus(status));
                }
            })
        }
    }
}
startGame();
