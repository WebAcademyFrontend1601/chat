'use strict';

(function(angular) {

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

})(angular);
