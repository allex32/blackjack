GamesControl = function(){};

GamesControl.prototype.changePlayer = function(id_game,playerName) {

	var selector = {};
	selector['id_game']=id_game;
	selector['gameState']='active';
	selector['turn']=playerName;

	var tmp = Games.findOne(selector)['players'];
	var listPlayers=[];

	for(var key in tmp)
		listPlayers.push(key);

	if(playerName == listPlayers[1])
		this.endGame(id_game);
	else{
		var updateQuery = {};
		updateQuery['turn'] = listPlayers[1];
		Games.update(selector,{$set : updateQuery});
	}

};

GamesControl.prototype.endGame = function(id_game){
	
	var winner = this.getWinner(id_game);

	var selector = {};
	selector['id_game'] = id_game;

	var updateQuery = {};
	updateQuery['gameState'] = 'finished';
	updateQuery['winner'] = winner;

	Games.update(selector,{$set : updateQuery});


};

GamesControl.prototype.getWinner = function(id_game){;
	var selector = {};
	console.log(id_game);
	selector['id_game'] = id_game;

	var gameData = Games.findOne(selector)['players'];
	
	var listScores = [];
	var listKeys = [];
	for(var key in gameData){
		listScores.push(gameData[key]['score']);
		listKeys.push(key);
	};

	if(listScores[0]>21 && listScores[1]<=21)
		return listKeys[1];
	if(listScores[0]<=21 && listScores[1]>21)
		return listKeys[0];
	if(listScores[0]>21 && listScores[1]>21)
		return 'отсутствует.Ничья';
	if(listScores[0]<=21 && listScores[1]<=21){
		if(listScores[0]==listScores[1])
			return 'отсутствует. Ничья';
		if(listScores[0]>listScores[1])
			return listKeys[0];
		if(listScores[0]<listScores[1])
			return listKeys[1];
	}	
};