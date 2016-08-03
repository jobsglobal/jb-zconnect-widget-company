angular.module('jb-zconnect-widget-company').controller('FollowersCtrl', ['config', 'jbWidget', 'ngZconnected', 'currentUser', 'statsService', 'profileService', '$q',
    function(config, jbWidget, ngZconnected, currentUser, statsService, profileService, $q) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.company = jbWidget.company;

        vm.array = [];
        $q.when(statsService.followers.get(vm.currentUser.user_id, vm.company.id))
        .then(function(follower) {
            if (ngZconnected._DEBUG) console.log(follower);
            vm.getUserInfo(follower.data);
        }, function(error) {
            if (ngZconnected._DEBUG) {
                console.log(error)
            }
        });
        vm.getUserInfo = function(user) {
            for (var id in user) {
                $q.when(profileService.userInfo.get(user[id]))
                .then(function(user) {
                    if (ngZconnected._DEBUG)
                    	console.log(user);
                    vm.array.push(user);
                }, function(error) {
                    if (ngZconnected._DEBUG)
                        console.log(error)
                });
            }
        }
    }
])