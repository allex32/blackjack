Games = new Meteor.Collection('games');

Session.setDefault('currentView','login');
Session.setDefault('playerName',null);
Session.setDefault('id_game',null);


Template.app.helpers({
	login : function(){
		return Session.equals('currentView','login');
	},
	wait : function(){
		return Session.equals('currentView','wait');
	},
	game : function(){
		return Session.equals('currentView','game');
	},
	endGame : function(){
		return Session.equals('currentView','endGame');
	}
});

Deps.autorun(function(){
	var handle = Meteor.subscribe('games',Session.get('id_game'),Session.get('playerName'));
	if(handle.ready()){
		if(Games.find().count()!=0){
			Session.set('currentView','game');
			var id_game  = Games.findOne().id_game;
			Session.set('id_game',id_game);

			if(Games.findOne({'id_game':Session.get('id_game')}).winner)
				Session.set('currentView','endGame');
		}
	}
});



