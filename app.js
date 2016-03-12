'use strict';

angular
  .module('chatApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
            requireNoAuth: function ($state, Auth) {
                return Auth.$requireAuth().then(function(auth) {
                    console.log('redirecting to channels');
                    $state.go('channels');
                },
                function(error) {
                    return;
                });
            }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController as authCtrl',
        resolve: {
            requireNoAuth: function($state, Auth) {
                return Auth.$requireAuth().then(function(auth) {
                    console.log('You are already logged in');
                    $state.go('home');
                },
                function(error) {
                    return;
                })
            }
        }
      })

      .state('register', {
          url: '/register',
          templateUrl: 'auth/register.html',
          controller: 'AuthController as authCtrl',
          resolve: {
              requireNoAuth: function($state, Auth) {
                  return Auth.$requireAuth().then(function(auth) {
                      console.log('You are logged In and cannot register again')
                      $state.go('home');
                  },
                  function(error) {
                      return;
                  })
              }
          }
      })

    .state('profile', {
        url: '/profile',
        templateUrl: 'users/profile.html',
        controller: 'ProfileController as profileCtrl',
        resolve: {
            auth: function($state, Auth) {
                return Auth.$requireAuth().catch(function() {
                    $state.go('home');
                })
            },
            profile: function(Users, Auth) {
                return Auth.$requireAuth().then(function(auth) {
                    return Users.getProfile(auth.uid).$loaded();
                });
            }
        }
    })

      .state('channels', {
          url: '/channels',
          templateUrl: 'channels/channels.html',
          controller: 'ChannelsController as channelsCtrl',
          resolve: {
              channels: function(Channels) {
                  return Channels.$loaded();
              },
              profile: function($state, Auth, Users) {
                  return Auth.$requireAuth().then(function(auth) {
                          return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                        if(profile.displayName) {
                            return profile;
                        } else {
                            $state.go('profile');
                        }
                      })
                      },
                  function(error) {
                        $state.go('home');
                  });
              }
          }
      })

        .state('channels.create', {
            url: '/create',
            templateUrl: 'channels/create.html',
            controller: 'ChannelsController as channelsCtrl'
        })

        .state('channels.messages', {
            url: '/{channelId}/messages',
            templateUrl: 'messages/messages.html',
            controller: 'MessagesController as messagesCtrl',
            resolve: {
                messages: function($stateParams, Messages) {
                    return Messages.forChannel($stateParams.channelId).$loaded();
                },
                channelName: function($stateParams, channels) {
                    return '#' + channels.$getRecord($stateParams.channelId).name;
                }
            }
        })

        .state('channels.direct', {
            url: '/{uid}/messages/direct',
            templateUrl: 'messages/messages.html',
            controller: 'MessagesController as messagesCtrl',
            resolve: {
                messages: function($stateParams, Messages, profile) {
                    return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
                },
                channelName: function($stateParams, Users) {
                    return Users.all.$loaded().then(function() {
                        return '@'+Users.getDisplayName($stateParams.uid);
                    })
                }
            }
        });

    $urlRouterProvider.otherwise('/');

  })
  .constant('FirebaseUrl', 'https://boiling-torch-6950.firebaseio.com/');
