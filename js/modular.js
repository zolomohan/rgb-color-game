var game = {
    difficulty: 6,
    rgbColorList: [],
    resetGame: function(argDifficulty){
        this.difficulty = argDifficulty;
    	this.rgbColorList = [];
    	this.generateRGBcolors(this.difficulty); //Generate New Colors
    	tiles.pickedTile = this.rgbColorList[this.pickColor(this.difficulty)]; //Pick New Color
    	hud.h1.style.backgroundColor = "steelblue"; //Remove h1 Background
    	buttons.reset.textContent = "New Colors"; //Reset Play Again?
    	hud.clickStatus.textContent = "";
    	tiles.setupSquares(); //Setup Everything Again
    },
    correctTile: function(){
        hud.clickStatus.style.color = tiles.pickedTile;
    	hud.clickStatus.textContent = "Correct!";
    	hud.h1.style.backgroundColor = tiles.pickedTile;
    	tiles.list.forEach(function(tile){
    		tile.style.backgroundColor = tiles.pickedTile;
    	});
    	buttons.reset.textContent = "Play Again?"
    },
    incorrectTile: function(tile){
        tile.style.backgroundColor = "#232323";
    	hud.clickStatus.style.color = "darkred";
    	hud.clickStatus.textContent = "Incorrect!";
    },
    generateRGBcolors: function(difficulty){
    	for (var i = 0; i < this.difficulty; i++) {
    		this.rgbColorList.push("rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+")");
    	}
    },
    pickColor: function(difficulty){
        return (Math.floor(Math.random()*this.difficulty));
    },
    init: function(){
        buttons.setupButtonListeners();
    	game.resetGame(game.difficulty);
    }
};

var tiles = {   
    list: document.querySelectorAll(".tile"),
    pickedTile:"",
    setupSquares: function(){
        for (var i = game.difficulty; i < this.list.length; i++) //Hiding Tiles
    		tiles.list[i].style.display = "none";
    	for (var i = 3; i < game.difficulty; i++) //Displaying Tiles
    		tiles.list[i].style.display = "block";
    	hud.questionDisplay.textContent = this.pickedTile; //Display rgb Question
    	this.list.forEach(function(tile,i){ //For Every tile in the array
        tile.style.backgroundColor = game.rgbColorList[i]; //Set All Tile Color
    	tile.addEventListener("click",function(){ //Adding Event Listener to each tile
    			console.log(this, tiles.pickedTile);             
                this.style.backgroundColor === tiles.pickedTile ? game.correctTile() : game.incorrectTile(this);
    		});
    	})
    }
};
var buttons = {
    reset: document.querySelector("#reset"),
    difficultyList: document.querySelectorAll(".mode"),
    setupButtonListeners: function(){
        for (var i = 0; i < this.difficultyList.length; i++) {
    		this.difficultyList[i].addEventListener("click",function(){
    			for (var i = 0; i < buttons.difficultyList.length; i++) {
                    buttons.difficultyList[i].classList.remove("selected");
                }
    			this.classList.add("selected"); //add selected class to selected button
    			if(this.textContent === "easy")
    				game.resetGame(3);
    			else if (this.textContent === "normal")
    			 	game.resetGame(6);
    			else
    			 	game.resetGame(9);
    		});
    	}
    	reset.addEventListener("click",function(){
    		game.resetGame(game.difficulty);
    	});
    }
};

var hud = {
    h1: document.querySelector("h1"),
    questionDisplay: document.querySelector("#question"),
    clickStatus: document.querySelector("#clickStatus"),
};

game.init();
