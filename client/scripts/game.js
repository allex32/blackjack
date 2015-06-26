Template.buttons.events({

	'click #getCard' : function(){
		Meteor.call('getCard',Session.get('id_game'),Session.get('playerName'));
	},

	'click #endTurn' : function(){
		Meteor.call('endTurn',Session.get('id_game'),Session.get('playerName'));
	}
});

Template.play_tmpl.helpers({
	cards : function(){
		var query = Games.findOne({id_game:Session.get('id_game')});
		var cards = query['players'][Session.get('playerName')]['cards'];
		return cards;
	}
});

Template.gameForm.helpers({
	turn : function(){
		var selector = {};
		selector['id_game'] = Session.get('id_game');
		selector['turn'] = Session.get('playerName');
		if(Games.find(selector).count()==0)
			return false;
		else 
			return true;
	}
});

Template.endGameTemplate.helpers({
	winner : function(){
		var res = Games.findOne({id_game:Session.get('id_game')});
		if(res)
			return res['winner'];
		else 
			return false;

	}
})

Template.endGameTemplate.events({
	'click #newGame' : function(){
		Session.set('id_game',null);
		Session.set('playerName',null);
		Session.set('currentView','login');
		
		

	}
});