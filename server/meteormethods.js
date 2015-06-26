
Meteor.methods({
	
	createNewPlayer : function(playerName){
		var player = new Player(playerName);
		return player.initNewPlayer();
	},

	getCard : function(id_game,playerName){
		var deck = new Deck();
		deck.getTopCard(id_game,playerName);
	},

	endTurn : function(id_game,playerName){
		var ctrlGame = new GamesControl();
		ctrlGame.changePlayer(id_game,playerName);
	}
});






