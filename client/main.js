import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';
PlayersList = new Mongo.Collection('players');


if(Meteor.isClient){

// Template.leaderboard.player = function() {
// 	return "statment to be return"
// }
Meteor.subscribe('thePlayers');

Template.leaderboard.helpers ({
	'player': function(event) {
		event.preventDefault();
		var currentUserId= Meteor.userId();
		return PlayersList.find({},{sort:{score: -1, name:1}})
	},
	
	'selectedClass': function(){
		var playerId = this._id;
		var selectedPlayer = Session.get ('selectedPlayer');
		if (playerId == selectedPlayer) {
			return "selected"
		}
		},

	'showSelectedPlayer' : function() {
		var selectedPlayer=Session.get('selectedPlayer');
		return PlayersList.findOne(selectedPlayer)
	}
	
});

Template.leaderboard.events ({
	'click .player': function () {
	var playerId = this._id;
	Session.set('selectedPlayer', playerId);
	},
	'click .increment' : function () {
		var selectedPlayer= Session.get('selectedPlayer');
		Meteor.call('modifyPlayerScore', selectedPlayer, 5);
		
	},

	'click .decrement' : function() {
		var selectedPlayer= Session.get('selectedPlayer');
		Meteor.call('modifyPlayerScore', selectedPlayer, -5 )
	},
	
	'click .remove' : function () {
		var selectedPlayer= Session.get('selectedPlayer');
		Meteor.call('removePlayerData',selectedPlayer );
	}

});

Template.AddPlayerForm.events({
	'submit form': function(event){
		event.preventDefault();
		var PlayerNameVar= event.target.PlayerName.value;
		Meteor.call('insertPlayerData',PlayerNameVar );
	}

});

}
