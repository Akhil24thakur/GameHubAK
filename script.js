document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                statusText.textContent = `${currentPlayer} wins! 🎉`;
                highlightWinningCells(pattern);
                return;
            }
        }

        if (!boardState.includes("")) {
            gameActive = false;
            statusText.textContent = "It's a draw! 🤝";
        }
    }

    function highlightWinningCells(pattern) {
        pattern.forEach(index => {
            cells[index].classList.add("winning-cell");
        });
    }

    function handleClick(e) {
        const index = e.target.getAttribute("data-index");

        if (boardState[index] !== "" || !gameActive) return;

        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function restartGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X's turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winning-cell");
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);

    restartGame(); // Initialize game state
});
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝", "🍊", "🍍"];
    let cardsArray = [...symbols, ...symbols]; // Double for pairs
    let flippedCards = [];
    let matchedCards = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = "";
        shuffle(cardsArray);
        cardsArray.forEach((symbol, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.symbol = symbol;

            const front = document.createElement("div");
            front.classList.add("front");
            front.textContent = symbol;

            const back = document.createElement("div");
            back.classList.add("back");
            back.textContent = "❓";

            card.appendChild(front);
            card.appendChild(back);
            gameBoard.appendChild(card);

            card.addEventListener("click", () => flipCard(card));
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("flip")) {
            card.classList.add("flip");
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards += 2;
            card1.removeEventListener("click", flipCard);
            card2.removeEventListener("click", flipCard);
        } else {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
        }
        flippedCards = [];

        if (matchedCards === cardsArray.length) {
            statusText.textContent = "🎉 You found all pairs!";
        }
    }

    restartButton.addEventListener("click", () => {
        matchedCards = 0;
        flippedCards = [];
        statusText.textContent = "Find all matching pairs!";
        createBoard();
    });

    createBoard();
});
document.addEventListener("DOMContentLoaded", () => {
    const stack = document.getElementById("stack");
    const scoreText = document.getElementById("score");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let stackHeight = 0;
    let blockWidth = 100;
    let currentBlock;
    let gameActive = true;
    let score = 0;

    function createBlock(moving = true) {
        if (!gameActive) return;
        
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.width = `${blockWidth}%`;
        block.style.bottom = `${stackHeight * 30}px`;

        if (moving) {
            block.classList.add("moving");
        } else {
            block.style.left = `${currentBlock.offsetLeft}px`;
        }

        stack.appendChild(block);
        currentBlock = block;
    }

    function placeBlock() {
        if (!gameActive) return;

        currentBlock.classList.remove("moving");

        let prevBlock = stack.children[stack.children.length - 2];
        if (prevBlock) {
            let offset = Math.abs(currentBlock.offsetLeft - prevBlock.offsetLeft);
            if (offset > blockWidth / 2) {
                gameOver();
                return;
            }
            if (offset > 0) {
                blockWidth -= offset;
                currentBlock.style.width = `${blockWidth}%`;
                currentBlock.style.left = `${prevBlock.offsetLeft + offset / 2}px`;
            }
        }

        stackHeight++;
        score++;
        scoreText.textContent = `Score: ${score}`;

        if (blockWidth <= 5) {
            gameOver();
            return;
        }

        createBlock();
    }

    function gameOver() {
        gameActive = false;
        statusText.textContent = "Game Over! Press Restart";
    }

    function restartGame() {
        gameActive = true;
        stack.innerHTML = "";
        stackHeight = 0;
        blockWidth = 100;
        score = 0;
        scoreText.textContent = "Score: 0";
        statusText.textContent = "Click or Press Space to Place Block";
        createBlock();
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") placeBlock();
    });
    document.addEventListener("click", placeBlock);
    restartButton.addEventListener("click", restartGame);

    createBlock();
});

const cssColorsOriginal=["lightblue","lightgray","pink","red","yellow"];
let cssColors=cssColorsOriginal;
class Player {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.id=id;
	}
	getDomElement(){
		if(!this.dom){
			this.dom = document.createElement("div");
			this.dom.classList.add("player");
			let idx=randIntv1(cssColors.length);
			this.dom.style["background"]=cssColors[idx];
			cssColors.splice(idx,1);
			this.dom.style["marginLeft"]=`${randIntv1(20)}px`;
			this.dom.style["marginTop"]=`${randIntv1(20)}px`;
			let text=document.createTextNode(this.id);
			this.dom.appendChild(text);
		}
		return this.dom;
	}
}

class Ladder {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	getAngle() {
		return Math.atan((this.endY - this.startY) / (this.endX - this.startX));
	}
	getLength() {
		return Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
	}
}

class Snake {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	getAngle() {
		return Math.atan((this.endY - this.startY) / (this.endX - this.startX));
	}
	getLength() {
		return Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
	}
}

const height = 10;
const width = 10;

let players =[];
let currentPlayer,playerIterator;

//normally have 8 to 9 ladders, and one less snake to ladders
let ladders = [
	new Ladder(1, 0, 4, 3),
	new Ladder(2, 5, 4, 8),
	new Ladder(3, 7, 2, 8),
	new Ladder(3, 4, 4, 5),
	new Ladder(5, 1, 6, 7),
	new Ladder(6, 4, 9, 8),
	new Ladder(7, 1, 9, 3),
	new Ladder(7, 2, 4, 6),
];

let snakes = [
	new Snake(0, 7, 0, 3),
	new Snake(2, 3, 4, 1),
	new Snake(3, 9, 2, 8),
	new Snake(6, 6, 9, 0),
	new Snake(6, 8, 2, 5),
	new Snake(6, 9, 8, 7),
	new Snake(8, 5, 9, 4),
]

function randIntv1(x){
	return Math.trunc((Math.random()*100000)%x);
}

function* cyclicIterator(v){
	let i=0;
	let j=v.length;
	while(true){
		yield {idx:i,value:v[i]};
		j=v.length;
		i=(i+1)%j;
	}
}

function startGame(){
	let selector=document.querySelector("#player-num");
	if(!selector.checkValidity()){
		alert("Please select a valid number from 2 to 4");
		selector.valueAsNumber=2;
		return;
	}
	//with the correct values provided lets setup the internal structures
	let v=selector.valueAsNumber;
	for(let i=0;i<v;i++){
		players.push(new Player(0,0,i+1));
	}
	//initialize the iterators
	playerIterator=cyclicIterator(players);
	currentPlayer=playerIterator.next().value;
	//show the game board
	document.querySelector("#gameboard").hidden=false;
	document.querySelector("#welcome").hidden=true;
	document.getElementById("dice-results").innerText=`Player ${currentPlayer.idx+1}'s turn`;
	document.getElementById("roll-dice").disabled = false;
	renderBoard();
}

function restart() {
	document.getElementById("win").hidden = true;
	document.querySelector("#gameboard").hidden=true;
	document.querySelector("#welcome").hidden=false;
	players=[]; //clear the player list
	cssColors=cssColorsOriginal; //reset the colors
	currentPlayer=undefined;
	playerIterator=undefined; //clear the ptrs
}

function initializeBoard() {
	let board = [];
	for (let y = 0; y < height; y++) {
		let array = [];
		for (let x = 0; x < width; x++) {
			array.push(new Tile(x, y));
		}
		board.push(array);
	}
	return board;
}

function initializeLadders() {}

function renderBoard() {
	let output = document.getElementById("board");
	output.innerHTML = "";
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tile = document.createElement("div");
			tile.classList.add("tile");

			players.forEach((player) => {
				if(player.x == x && player.y == y){
					tile.appendChild(player.getDomElement());
				}
			});
			output.append(tile);
		}
	}
}

async function rollDice() {
	let result = randIntv1(6)+1;
	// result = 1;
	document.getElementById("dice-results").innerText = `dice: ${result}`;
	document.getElementById("roll-dice").disabled = true;
	for (let i = 0; i < result; i++) {
		await new Promise(resolve => setTimeout(resolve, 200));
		movePlayer(currentPlayer.value);
		// setTimeout(movePlayer, 200 * i);
		if(checkWin(currentPlayer))return i+1;
	}
	document.getElementById("roll-dice").disabled = false;
	//make it slower
	await new Promise(resolve => setTimeout(resolve, 200));
	// console.log("finished moving player");
	checkLadder(currentPlayer.value);
	checksnakes(currentPlayer.value);
	//next player
	currentPlayer=playerIterator.next().value;
	document.getElementById("dice-results").innerText=`Player ${currentPlayer.idx+1}'s turn`;
	return result;
}

function movePlayer(player) {
	if (player.y % 2 == 0) {
		// at even row
		if (player.x >= width - 1) {
			// reached boundary, wrap
			player.y++;
		} else {
			player.x++;
		}
	} else {
		if (player.x <= 0) {
			// reached boundary at front, wrap
			player.y++;
		} else {
			player.x--;
		}
	}
	renderBoard();
}

function checkLadder(player) {
	// console.log("chekcing ladder");
	ladders.forEach(ladder => {
		if (ladder.startX == player.x && ladder.startY == player.y) {
			player.x = ladder.endX;
			player.y = ladder.endY;
			renderBoard();
		}
	});
}

function checksnakes(player) {
	snakes.forEach(Snake => {
		if (Snake.startX == player.x && Snake.startY == player.y) {
			player.x = Snake.endX;
			player.y = Snake.endY;
			renderBoard();
		}
	});
}

function checkWin(data) {
	let player=data.value;
	let idx=data.idx;
	if (height % 2 == 0) {
		// player wins when they are at x = 0
		if (player.y >= height - 1 && player.x <= 0) {
			console.log("WIN");
			document.getElementById("win").hidden = false;
			document.getElementById("win-text").innerHTML=`Player ${idx+1} wins`;
			return true;
		}
	} else {
		// player wins at x = width - 1
		if (player.y >= height - 1 && player.x >= width - 1) {
			console.log("WIN");
			document.getElementById("win").hidden = false;
			document.getElementById("win-text").innerHTML=`Player ${idx+1} wins`;
			return true;
		}
	}
}

function openDrawer() {
	document.getElementById("drawer").style.width = "400px";
  }

  function closeDrawer() {
	document.getElementById("drawer").style.width = "0";
  }
