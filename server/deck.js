Array.prototype.shuffle = function() {
  var i=this.length, j, tmp;
  if (i==0){ return this;}
  while(--i){
     j = Math.floor( Math.random()*(i+1));
     tmp = this[i]; this[i]=this[j]; this[j]=tmp;
  }
  return this;
}

var Card = function(value,color){
	this.value = value;
	this.color = color;
	return this;
}

Deck = function(){
	this.Deck = new Array();
	return this;
};

Deck.prototype.shuffle = function(){
	this.Deck.shuffle();
}
Deck.prototype.initDeck = function(){
	if(this.Deck.length==0){
			this.Deck.push(new Card(2,'heart'));
			this.Deck.push(new Card(3,'heart'));
			this.Deck.push(new Card(4,'heart'));
			this.Deck.push(new Card(5,'heart'));
			this.Deck.push(new Card(6,'heart'));
			this.Deck.push(new Card(7,'heart'));
			this.Deck.push(new Card(8,'heart'));
			this.Deck.push(new Card(9,'heart'));
			this.Deck.push(new Card(10,'heart'));
			this.Deck.push(new Card('jack','heart'));
			this.Deck.push(new Card('queen','heart'));
			this.Deck.push(new Card('king','heart'));

			this.Deck.push(new Card(2,'diamond'));
			this.Deck.push(new Card(3,'diamond'));
			this.Deck.push(new Card(4,'diamond'));
			this.Deck.push(new Card(5,'diamond'));
			this.Deck.push(new Card(6,'diamond'));
			this.Deck.push(new Card(7,'diamond'));
			this.Deck.push(new Card(8,'diamond'));
			this.Deck.push(new Card(9,'diamond'));
			this.Deck.push(new Card(10,'diamond'));
			this.Deck.push(new Card('jack','diamond'));
			this.Deck.push(new Card('queen','diamond'));
			this.Deck.push(new Card('king','diamond'));

			this.Deck.push(new Card(2,'spade'));
			this.Deck.push(new Card(3,'spade'));
			this.Deck.push(new Card(4,'spade'));
			this.Deck.push(new Card(5,'spade'));
			this.Deck.push(new Card(6,'spade'));
			this.Deck.push(new Card(7,'spade'));
			this.Deck.push(new Card(8,'spade'));
			this.Deck.push(new Card(9,'spade'));
			this.Deck.push(new Card(10,'spade'));
			this.Deck.push(new Card('jack','spade'));
			this.Deck.push(new Card('queen','spade'));
			this.Deck.push(new Card('king','spade'));

			this.Deck.push(new Card(2,'club'));
			this.Deck.push(new Card(3,'club'));
			this.Deck.push(new Card(4,'club'));
			this.Deck.push(new Card(5,'club'));
			this.Deck.push(new Card(6,'club'));
			this.Deck.push(new Card(7,'club'));
			this.Deck.push(new Card(8,'club'));
			this.Deck.push(new Card(9,'club'));
			this.Deck.push(new Card(10,'club'));
			this.Deck.push(new Card('jack','club'));
			this.Deck.push(new Card('queen','club'));
			this.Deck.push(new Card('king','club'));

			this.Deck.push(new Card('joker','black'));
			this.Deck.push(new Card('joker','red'));
	}
};

//получаем карту, добавляем пользователю, снимаем с колоды
Deck.prototype.getTopCard = function(id_game,playerName){
	
	var selector = {};
	selector['id_game']=id_game;
	selector['gameState']='active';
	selector['turn']=playerName;

	var result = Games.findOne(selector);

	if(result){
		var card = result['deck']['Deck'].pop();
		var oldCardsPlayer = result['players'][playerName]['cards'];
		oldCardsPlayer.push(card);

		var playerScore = result['players'][playerName]['score'] + this.getCardScore(card);
		//добавляет карту в историю и убираем из колоды
		
		var updateQuery = {};
		updateQuery['deck.Deck'] = result['deck']['Deck'];
		updateQuery['players.'+playerName+'.cards']=oldCardsPlayer;
		updateQuery['players.'+playerName+'.score']=playerScore;

		Games.update(selector,{$set:updateQuery});
	}

};

Deck.prototype.getCardScore = function(card){
	if(typeof(card.value)=='number'){
		return card.value;
	}
	else{
		if(card.value == 'joker'){
			return 1;
		}
		else{
			return 10;
		}
	}
};




