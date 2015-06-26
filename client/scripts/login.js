
Template.loginForm.events({
	'submit form': function(){
		event.preventDefault();
		var playerName = event.target.playerLogin.value;
		Session.set('playerName',playerName);
		Meteor.call('createNewPlayer',playerName,function(err,result){
			Session.set('currentView',result[0]);
			Session.set('id_game',result[1]);
		});
	}
});