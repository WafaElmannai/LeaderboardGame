
import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
});

PlayersList = new Mongo.Collection('players');

if(Meteor.isServer){

Meteor.publish('thePlayers', function() {
	var currentUserId= this.userId;
		return PlayersList.find({createdBy:currentUserId})
});

Meteor.methods({
'insertPlayerData': function(PlayerNameVar){
	var currentUserId = Meteor.userId();
	PlayersList.insert({
	name : PlayerNameVar,
	score : 0,
	createdBy: currentUserId
	});
	},

'removePlayerData': function(selectedPlayer){
	var currentUserId= Meteor.userId();
	PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
	},

'modifyPlayerScore': function(selectedPlayer, scoreValue){
	var currentUserId=Meteor.userId();
	PlayersList.update({_id: selectedPlayer, createdBy:currentUserId}, {$inc:{score: scoreValue}});
	}

});
}