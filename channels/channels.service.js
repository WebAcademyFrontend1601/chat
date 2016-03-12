'use strict';

(function(angular) {

    angular.module('chatApp')
        .factory('Channels', function($firebaseArray, FirebaseUrl) {

            var ref = new Firebase(FirebaseUrl + 'rooms');
            var channels = $firebaseArray(ref);

            return channels;

        });

})(angular);