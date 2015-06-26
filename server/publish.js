Games = new Meteor.Collection('games');
Decks = new Meteor.Collection('decks');

Meteor.publish('games',function(id_game,playerLogin){
	
	var selector = {};
	var queryFields = {};
	
	selector['players.'+playerLogin] = {$exists : true};
	selector['id_game'] = id_game;

	queryFields['id_game'] = 1;
	queryFields['gameState'] = 1;
	queryFields['players.'+playerLogin] = 1;
	queryFields['turn'] = 1;
	queryFields['winner'] = 1;

	return Games.find(selector,{fields : queryFields});
});
