'use strict';

(function(angular) {

    angular.module('chatApp')
        .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl) {

            var refUsers = new Firebase(FirebaseUrl+'users');
            var users = $firebaseArray(refUsers);

            var connectedRef = new Firebase(FirebaseUrl+'.info/connected');

            var Users = {
                getProfile: function(uid) {
                    return $firebaseObject(refUsers.child(uid));
                },
                getDisplayName: function(uid) {
                    return users.$getRecord(uid).displayName;
                },
                setOnline: function(uid) {
                    var connected = $firebaseObject(connectedRef);
                },
                all: users
            };

            return Users;
        })

})(angular);
