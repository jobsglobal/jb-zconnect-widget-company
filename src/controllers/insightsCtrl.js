angular
    .module('jb-zconnect-widget-company')
    .controller('InsightsCtrl', ['config', function(config) {
        var vm = this;
        vm.config = config;
        vm.options = {
            "chart": {
                "type": "multiBarHorizontalChart",
                "height": vm.config.height,
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
                    "height": 60,
                    "ticks": null,
                    "width": 75,
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
                "multibar": {
                    "dispatch": {},
                    "width": 960,
                    "height": 500,
                    "forceY": [
                        0
                    ],
                    "stacked": false,
                    "showValues": false,
                    "id": 2732,
                    "valuePadding": 60,
                    "groupSpacing": 0.1,
                    "margin": {
                        "top": 0,
                        "right": 0,
                        "bottom": 0,
                        "left": 0
                    },
                    "duration": 250,
                    "barColor": null
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
                "width": null,
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
        vm.data = [{
            "key": "Series1",
            "color": "#d62728",
            "values": [{
                "label": "Followers",
                "value": 90
            }, {
                "label": "Shares",
                "value": 159
            }, {
                "label": "Posts",
                "value": 250
            }]
        }];
    }]);
