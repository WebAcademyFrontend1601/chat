'use strict';

(function(angular) {

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

})(angular);