'use strict';

(function(angular) {

    angular.module('chatApp')
        .controller('ChannelsController', function($state, Auth, Users, profile, channels) {

        var channelsCtrl = this;

        channelsCtrl.profile = profile;
        channelsCtrl.channels = channels;
        channelsCtrl.getDisplayName = Users.getDisplayName;

        channelsCtrl.users = Users.all;

        channelsCtrl.logout = function() {
            channelsCtrl.profile.online = null;
            channelsCtrl.profile.$save().then(function() {
                Auth.$unauth();
                $state.go('home');
            });
        };

        channelsCtrl.newChannel = {
            name: ''
        };

        channelsCtrl.createChannel = function() {
            channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref) {
                $state.go('channels.messages', {channelId: ref.key()});
            });
        }

    });

})(angular);
