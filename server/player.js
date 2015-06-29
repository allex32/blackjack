Player = function(login){
	this.login = login;
	this.cards = new Array();
	return this;
};

Player.prototype.initNewPlayer = function(){
	WaitingPlayers.push(this);
		if(WaitingPlayers.length==2){
			var secondPlayer = WaitingPlayers.pop();
			var firstPlayer = WaitingPlayers.pop();
			var game = new Game(ID_GAME,firstPlayer,secondPlayer);
			game.initGame();
			return ['game',ID_GAME-1]
		}
		else
			return ['wait',ID_GAME];
}

