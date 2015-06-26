ID_GAME=1;
WaitingPlayers = new Array();

Game = function(id_game,firstPlayer,secondPlayer){
	this.id_game = id_game;
	this.firstPlayer = firstPlayer;
	this.secondPlayer = secondPlayer;
	return this;
};

Game.prototype.initGame = function(){
		//колода
		this.deck = new Deck();
		this.deck.initDeck();
		this.deck.shuffle();

		var players = {};
		players[this.firstPlayer.login]={};
		players[this.firstPlayer.login]['cards'] = this.firstPlayer.cards;
		players[this.firstPlayer.login]['score'] = 0;

		players[this.secondPlayer.login] = {};
		players[this.secondPlayer.login]['cards']= this.secondPlayer.cards;
		players[this.secondPlayer.login]['score'] = 0
		//инициализация. Создание информации об игре в бд
		Games.insert({
				'id_game' : this.id_game,
				'winner' : null,
				'players' : players,
				'gameState' : 'active',
				'turn' : this.firstPlayer.login,
				'deck' : this.deck

		});
		
		ID_GAME+=1;
};

