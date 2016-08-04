angular.module('jb-zconnect-widget-company').controller('InsightsCtrl', ['config', 'currentUser', '$q', 'ngZconnected', 'jbWidget', 'employerService', 'statsService',
    function(config, currentUser, $q, ngZconnected, jbWidget, employerService, statsService) {
        var vm = this;
        vm.config = config;
        vm.companyId = jbWidget.company.id;
        vm.currentUser = currentUser;
        vm.options = {
            "chart": {
                "type": "multiBarHorizontalChart",
                "showControls": false,
                "showValues": true,
                "duration": 500,
                "x": function(d) {
                    return d.label;
                },
                "y": function(d) {
                    return d.value;
                },
                "xAxis": {
                    "showMaxMin": false,
                    "dispatch": {},
                    "axisLabelDistance": 0,
                    "staggerLabels": false,
                    "rotateLabels": 0,
                    "rotateYLabel": true,
                    "axisLabel": null,
                    "height": 100,
                    "ticks": null,
                    "margin": {
                        "top": 0,
                        "right": 0,
                        "bottom": 0,
                        "left": 0
                    },
                    "duration": 250,
                    "orient": "left",
                    "tickValues": null,
                    "tickSubdivide": 0,
                    "tickSize": 6,
                    "tickPadding": 5,
                    "domain": [
                        0,
                        1
                    ],
                    "range": [
                        0,
                        1
                    ]
                },
                "tooltip": {
                    "duration": 0,
                    "gravity": "w",
                    "distance": 25,
                    "snapDistance": 0,
                    "classes": null,
                    "chartContainer": null,
                    "enabled": true,
                    "hideDelay": 200,
                    "headerEnabled": true,
                    "fixedTop": null,
                    "offset": {
                        "left": 0,
                        "top": 0
                    },
                    "hidden": true,
                    "data": null,
                    "id": "nvtooltip-68611"
                },
                "forceY": [
                    0
                ],
                "stacked": false,
                "valuePadding": 60,
                "groupSpacing": 0.1,
                "margin": {
                    "top": 0,
                    "right": 30,
                    "bottom": 0,
                    "left": 60
                },
                "showLegend": false,
                "showXAxis": true,
                "showYAxis": false,
            },
            "styles": {
                "classes": {
                    "with-3d-shadow": true,
                    "with-transitions": true,
                    "gallery": false
                },
                "css": {}
            }
        };
        vm.follower = 0;
        vm.post = 0;
        vm.like = 0;
        vm.data = null;
        $q.when(statsService.followers.get(vm.currentUser.user_id, vm.companyId)).then(function(follower) {
            if (ngZconnected._DEBUG) 
                console.log(follower);
                vm.follower = follower.meta.count;
            return employerService.insights.getTotalPosts(vm.currentUser.user_id, vm.companyId);
        }).then(function(post) {
            if (ngZconnected._DEBUG) 
                console.log(post);
                vm.post = post.total;
            return employerService.insights.getTotalLikes(vm.currentUser.user_id, vm.companyId);
        }).then(function(like) {
            if (ngZconnected._DEBUG) 
                console.log(like);
                vm.like = like.total;
            return employerService.insights.getTotalShares(vm.currentUser.user_id, vm.companyId);
        }).then(function(share) {
            if (ngZconnected._DEBUG) console.log(share);
            vm.displayTime(vm.follower, vm.post, vm.like, share.total);
        }, function(error) {
            if (ngZconnected._DEBUG) {
                console.log(error)
            }
        });
        vm.displayTime = function(followers, posts, likes, share) {
            vm.data = [{
                "key": "Series1",
                "color": "#d62728",
                "values": [{
                    "label": "Followers",
                    "value": followers
                }, {
                    "label": "Shares",
                    "value": share
                }, {
                    "label": "Posts",
                    "value": posts
                }, {
                    "label": "Likes",
                    "value": likes
                }]
            }];
        }
    }
]);