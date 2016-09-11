
window.onload = function(){

	// Initialize player1 and player2 positions
	resetPositions();

	document.addEventListener("keydown",moveBox);

	var wrapper = document.getElementById("wrapper");
	var player1 = document.getElementById("player1");
	var player2 = document.getElementById("player2");
	var winner = document.getElementById("winner");
	var player1score = 0;
	var player2score = 0;
	var oneScore = document.getElementById("oneScore");
	var twoScore = document.getElementById("twoScore");
	var resetButton=document.getElementsByTagName("button");
	var isRaceStarted = true;
	var timeStart;
	var timeEnd;
	var highScores=[];
	var highScoreElement = document.getElementById("highScores");

	
	// When keys 'z' and 'right-arrow' are pressed, move player1 and player2 respectively
	// If resetButton is present, stop movement
	function moveBox(e) {
		if(resetButton.innerHTML==undefined||resetButton.innerHTML=="move") {
			if(isRaceStarted) {
				timeStart = Date.now();
				isRaceStarted = false;
			}
			switch(e.keyCode) {
				case 90:
					player1position+=1;
					player1.style.left=player1position+"%";
					whoWins();
					break;
				case 39:
					player2position+=1;
					player2.style.left=player2position+"%";
					whoWins();
					break;
			}
		}
	}

	// When player crosses finish line, display winner and reset positions
	function whoWins() {
		if(player1position==80) {
			player1score+=1;
			player1.style.left="45%";
			player2.style.left="0%";
			winner.innerHTML="Popeye is the Winner!<br>Winning Time: "+getRaceTime()+" seconds";
			resetPositions();
			displayScores();
		} else if(player2position==80) { 
			player2score+=1;
			player1.style.left="0%";
			player2.style.left="45%";
			winner.innerHTML="The Colonel is the Winner!<br>Winning Time: "+getRaceTime()+" seconds";
			resetPositions();	
			displayScores();
		}
	}

	// Reset player1 and player2 positions for a new race
	function resetPositions() {
		player1position=0;
		player2position=0;	
	}

	// Display player1 vs player2 scores
	function displayScores() {
		oneScore.innerHTML="Popeye: "+player1score;
		twoScore.innerHTML="The Colonel: "+player2score;
		calculateHighScores(getRaceTime());
		highScoreElement.innerHTML="High Scores<BR>1. "+cleanUndefined(highScores[0])+" s<BR>2. "+cleanUndefined(highScores[1])+" s<BR>3. "+cleanUndefined(highScores[2])+" s";
		displayButton();
	}

	// Replace UNDEFINED for displaying on page
	function cleanUndefined(element) {
		if (element==undefined){
			return 0;
		}
		else {
			return element;
		}
	}

	// When race is won, display "RESET" button
	function displayButton() {
		resetButton = document.createElement("button");
		resetButton.textContent = "RESET";
		wrapper.appendChild(resetButton);
		resetButton.addEventListener("click",resetBoard);
	}

	// When RESET is clicked, move players back to start, clear board of Winning Messages, set resetButton to allow movement
	function resetBoard() {
	    player1.style.left=player1position+"%";
	    player2.style.left=player2position+"%";
	    resetButton.innerHTML="move";
	    winner.innerHTML="";
	    wrapper.removeChild(resetButton);
	}

	// Return race time in seconds and reset isRaceStarted for next race
	function getRaceTime() {
		timeEnd = Date.now();
		isRaceStarted=true;
		return (timeEnd - timeStart)/1000;
	}

	// Populate highScore array with sorted High Scores
	function calculateHighScores(winningScore) {
		if (highScores.length>3) {
			highScores.pop();
		}
		highScores.push(winningScore);
		var sortedScores = sortScores(highScores);
		highScores = sortedScores;
	}

	// Sort High Scores -- Selection Sort
	function sortScores() {
		var min, swap;
		for (var i=0;i<highScores.length-1;i++){
			min=i;
			for(var j=i+1;j<highScores.length;j++){
				if (highScores[j]<highScores[min]) {
					min=j;
				}
				swap=highScores[i];
				highScores[i]=highScores[min];
				highScores[min]=swap;
			}
		}
		return highScores;
	}
}