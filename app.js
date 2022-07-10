   /**to do
     * both have turns, and they switch after one move
     * each round, we check the number of cells that are empty, and we check any winning patterns
     * created an array from 1 to 9, each move we do, we splice form the array
     * create an annouce function that will display the winner in case there is one
     * adding the display winnner
     */
(function(){
    let mainMenu = document.querySelector(".mainMenu");
    let gameSection = document.querySelector(".gameSection");
    let start_button = document.querySelector(".mainContainer .button");
    let currentPlayer = "❌";
    let displayCurrentPlayer = document.querySelector(".currentPlayer");
    displayCurrentPlayer.innerText = `Current player: ❌`;
    let board = ['','','','','','','','','']; //that array will be mapped live by the game output.
    let isGameRunning = true;
    let displayWinnerText = document.querySelector(".announcer"); 
    start_button.onclick = () =>{
            mainMenu.classList.remove("visible");
            mainMenu.classList.add("hidden");
            gameSection.classList.remove("hidden");
            gameSection.classList.add("visible");
    }
    let end_button = document.querySelector(".gameSection .button");
    end_button.onclick = () =>{
        isGameRunning = true;
        currentPlayer = "❌";
        resetBoard();
        gameSection.classList.remove("visible");
        gameSection.classList.add("hidden");
        mainMenu.classList.remove("hidden");
        mainMenu.classList.add("visible");
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
    const tiles = Array.from(document.querySelectorAll(".gridElement"));
    tiles.forEach((tile, index) =>{
        tile.addEventListener("click",()=> userAction(tile,index));
    });
    function playerChange(){
        if(currentPlayer == "❌"){
            currentPlayer = "⭕";
            displayCurrentPlayer.innerText = `Current player: ${currentPlayer}`;
        }else{
            currentPlayer = "❌";
            displayCurrentPlayer.innerText = `Current player: ${currentPlayer}`;
        }
    }
    function isValidIndex(tile){
        if(tile.innerText !==''){
            return false;
        }
        else{
            return true;
        }
    }
    function updateBoard(index){
        board[index] = currentPlayer;
    }
    function resetBoard(){
        board = ['','','','','','','','',''];
        tiles.forEach((tile)=>{
            tile.innerText = "";
        });
        displayWinnerText.innerText = "";
        currentPlayer = "❌";
        displayCurrentPlayer.innerText = "Current player: ❌";
    }
    function didAnyOneWin(){
        //see if any winning pattern is applicable, or if it is a tie.
        let roundWin = false;
        for(let i = 0 ; i<=7 ; i++){
            const winCondition = winningConditions[i]; //iterating an array of arrays.
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if(a == "" || b == "" || c == ""){
                console.log("cheking code is runnning");
                continue; //skip iteration
            }
            if(a === b && b ===c){
                 //stop any further inputs.
                roundWin = true;
                break;
            }
        }
        if(roundWin){
            displayWinner(currentPlayer);
            isGameRunning = false;
            console.log("winner must be annouced");
        }
        if (!board.includes('')) //there are no more empty spaces.
        displayWinner("TIE");
    }
    //utility function that displays the winner
    function displayWinner(player){
        if(player == "TIE"){
            displayWinnerText.innerText = "TIE!"
        }
        else{
            displayWinnerText.innerText = `the winner is player${player}`;
        }
    }

    function userAction(tile, index){
        if(isValidIndex(tile) && isGameRunning){
           tile.innerText = currentPlayer;
           updateBoard(index);
           didAnyOneWin();     
           playerChange(); //must be called at the end
        }
    }
}());