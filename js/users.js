'use strict';

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

angular.module('chatApp')
  .run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
      $timeout(() => {
        componentHandler.upgradeAllRegistered();
      })
    })
  });
