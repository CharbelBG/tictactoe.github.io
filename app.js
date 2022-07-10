(function(){
    let mainMenu = document.querySelector(".mainMenu");
    let gameSection = document.querySelector(".gameSection");
    let start_button = document.querySelector("#start_button");
    let endGameButton = document.querySelector("#endGame_button");
    let board = ["","","","","","","","",""];
    let isGameRunning = true;
    let currentPlayer = "X";
    let displayText = document.querySelector(".displayText");

    displayText.innerText = `Current Player:X`;
    start_button.onclick = () =>{
        mainMenu.classList.remove("visible");
        mainMenu.classList.add("hidden");
        gameSection.classList.remove("hidden");
        gameSection.classList.add("visible");
    }
    endGameButton.onclick = () =>{
        gameSection.classList.remove("visible");
        gameSection.classList.add("hidden");
        mainMenu.classList.remove("hidden");
        mainMenu.classList.add("visible");
        reset();
    }
    let tiles = Array.from(document.querySelectorAll(".gridItem"));
    tiles.forEach((tile, index)=> {
        tile.addEventListener("click",() => userAction(tile,index));
    });
    function validAction(tile){
        if(tile.innerText ==""){
            return true;
        }else{
            return false;
        }
    }
    function changePlayer(){
        if(!isGameRunning){
            return;
        }
        if(currentPlayer == "X"){
            currentPlayer = "O";
            displayText.innerText = `Current Player:${currentPlayer}`;
        }
        else{
            currentPlayer = "X";
            displayText.innerText = `Current Player:${currentPlayer}`;
        }
    }
    function applyToTile(tile,index){
        tile.innerText = currentPlayer;
        board[index] = currentPlayer;
        addColors(tile);
    }
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function didAnyOneWin(){
        let roundWon = false;
        for(let i = 0 ; i <=7;i++){
            const winningCondition = winningConditions[i];
            const a = board[winningCondition[0]];
            const b = board[winningCondition[1]];
            const c = board[winningCondition[2]];
            if(a == "" || b == "" || c ==""){
                continue;
            }
            if(a===b && b===c){
                roundWon = true;
                highLightWinningPath(winningCondition);
                    break;
            }
        }
        if(roundWon){
            isGameRunning = false;
            displayWinner(currentPlayer);
        }
        if(!roundWon && !board.includes("")){
            isGameRunning = false;
            displayText.innerText = `TIE!`;
        }
    }
    function displayWinner(value){
        displayText.innerText = `${value} is the winner!`;
    }
    function userAction(tile,index){
        if(validAction(tile)&&isGameRunning){
            
            applyToTile(tile,index);
            didAnyOneWin();
            changePlayer();
        }
    }
    function reset(){
        tiles.forEach((tile)=>{
            tile.innerHTML = "<button></button>";
            tile.classList.remove("limeColor");
            tile.classList.remove("cyanColor");
            tile.classList.remove("orangeColor");
        });
        isGameRunning = true;
        currentPlayer = "X";
        displayText.innerText = `Current Player:X`;
        board = ["","","","","","","","",""];
    }
    function highLightWinningPath(path){
        tiles.forEach((tile,index)=>{
            for(let i =0; i<3; i++){
                if(index == path[i]){
                    console.log("index "+index);
                    tile.classList.remove("cyanColor");
                    tile.classList.remove("orangeColor");
                    tile.classList.add("limeColor");
                }
            }
        });
    }
    function addColors(tile){
        if(tile.innerText == "X"){
            tile.classList.add("cyanColor");
        }else{
            tile.classList.add("orangeColor");
        } 
    }
}());