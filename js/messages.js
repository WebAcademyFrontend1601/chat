'use strict';

angular.module('chatApp')
  .controller('MessagesController', function(profile, channelName, messages ) {

    var messagesCtrl = this;

    messagesCtrl.channelName = channelName;
    messagesCtrl.messages = messages;

    messagesCtrl.message = '';

    messagesCtrl.sendMessage = function() {
        if(messagesCtrl.message.length > 0) {
            messagesCtrl.messages.$add({
                uid: profile.$id,
                body: messagesCtrl.message,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }).then(function() {
                messagesCtrl.message = '';
            });
        }
    };

  });

angular.module('chatApp')
  .factory('Messages', function($firebaseArray, FirebaseUrl) {

    var channelMessagesRef = new Firebase(FirebaseUrl + 'roomsMessages');
    var userMessagesRef = new Firebase(FirebaseUrl + 'userMessages');

    return {
        forChannel: function(channelId) {
            return $firebaseArray(channelMessagesRef.child(channelId));
        },
        forUsers: function(uid1, uid2) {
            var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;
            return $firebaseArray(userMessagesRef.child(path));
        }
    };
  });

angular.module('chatApp')
  .run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
      $timeout(() => {
        componentHandler.upgradeAllRegistered();
      })
    })
  });
