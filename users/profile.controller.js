'use strict';

(function(angular) {

    angular.module('chatApp')
        .controller('ProfileController', function($state, md5, auth, profile) {

            var profileCtrl = this;
            console.log('Profile controller inject Profile: ', profile);
            console.log('Profile controller inject Auth: ', auth);

            profileCtrl.profile = profile;

            profileCtrl.updateProfile = function() {
                profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
                profileCtrl.profile.$save().then(function(auth) {
                    $state.go('channels');
                });
            };

        });

})(angular);