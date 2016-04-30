(function(window, undefined) {'use strict';


angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3', 'ngDropzone', 'slick'])
    .config(["dashboardProvider", function(dashboardProvider) {
        Dropzone.autoDiscover = false;
        var widgetConfig = {
            height: 225,
            _DEBUG: false
        };
        var widget = {
            collapse: false,
            frameless: true,
            styleClass: "",
            reload: true,
            resolve: {}
        };
        dashboardProvider
            .widget('general-stats', angular.extend(widget, {
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('top-jobs', angular.extend(widget, {
                title: 'Company Top Jobs',
                description: 'Widget for showing most applied jobs from company.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                config: angular.extend(widgetConfig, {})

            }))
            .widget('drop-cv', angular.extend(widget, {
                title: 'Company CV Dropzone',
                description: 'Widget that provides a dropzone area for uploading applicants cv.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html',
                controller: 'DropCvCtrl',
                controllerAs: 'dropCv',
                reload: false,
                config: angular.extend(widgetConfig, {})

            }))
            .widget('ads', angular.extend(widget, {
                title: 'Advertisements',
                description: 'Widget that shows advertisements.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html',
                controller: 'AdsCtrl',
                controllerAs: 'ads',
                config: angular.extend(widgetConfig, {})

            }))
            .widget('timeline', angular.extend(widget, {
                title: 'Timeline',
                description: 'Widget that shows company timeline/activities.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html',
                controller: 'TimelineCtrl',
                controllerAs: 'timeline',
                config: angular.extend(widgetConfig, {})
            }));
    }]);

angular.module("jb-zconnect-widget-company").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html","<div class=ads style=\"height: {{ads.config.height}}px !important\"><slick slides-to-show=1 slides-to-scroll=1 autoplay=true autoplayspeed=2 arrows=true centermode=true dots=true><div data-ng-repeat=\"ad in ads.list\" class=\"text-center container\"><img data-ng-src={{ad.imageUrl}} alt={{ad.title}}> <span class=ad-message>{{ad.message}}</span></div></slick></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html","<div class=drop-cv style=\"height: {{dropCv.config.height}}px !important;\"><form class=dropzone method=post enctype=multipart/form-data ng-dropzone dropzone=dropCv.dropzone dropzone-config=dropCv.dropzoneConfig event-handlers=\"{ \'addedfile\': dropCv.dzAddedFile, \'error\': dropCv.dzError }\" style=\"min-height: {{dropCv.config.height}}px\"><div class=dz-message>Drop CV here or click to upload</div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html","<div class=general-stats style=\"height: {{generalStats.config.height}}px !important;overflow: auto\"><nvd3 options=generalStats.options data=generalStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<div class=top-jobs style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><table class=\"table table-striped table-responsive\"><tr><th>Position</th><th>Applicants</th></tr><tr data-ng-repeat=\"job in topJobs.data\"><td data-ng-bind=\"job.job_title | limitTo: 20\"></td><td class=text-center data-ng-bind=job.total></td></tr></table></div>");}]);


angular.module('jb-zconnect-widget-company').service('topJobsService', ['$http', '$q', 'jbWidget', function apiService($http, $q, jbWidget) {
    var self = this;
    var apiRoot = jbWidget.apiRoot;
    self.mostApplied = function(userId, companyId, $limit, $from, $to) {
        var deferred = $q.defer();
        var url = apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/listWithApplicants?callback=JSON_CALLBACK';
        if ($limit)
            url += '&limit=' + $limit;
        $http.jsonp(url).then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);



angular.module('jb-zconnect-widget-company').provider('jbWidget', function() {
    var self = this;
    var apiRoot = '//jobsglobal.dev/api/v1';
    self.setApiRoot = function(value) {
        apiRoot = value;
    }
    self.$get = [function() {
        return {
            apiRoot: apiRoot
        }
    }];
});

angular.module('jb-zconnect-widget-company').service('generalStatsService', ['$http', '$q', 'jbWidget', function($http, $q, jbWidget) {
    var self = this;
    var apiRoot = jbWidget.apiRoot;
    self.job = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/stats?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    self.applicant = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/stats?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
}])

angular.module('jb-zconnect-widget-company').service('dropCvService', ['$http', '$q', 'jbWidget', function($http, $q, jbWidget) {
    var self = this;
}])

angular.module('jb-zconnect-widget-company').service('adsService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    console.log(dashboard.widgets);
    var self = this;
    self.getAll = function() {

        var data = [{
            title: 'Sample Ad1',
            imageUrl: '/src/assets/img/BuyNowButtonBlue.jpg',
            message: 'This is sample ad1'
        }, {
            title: 'Sample Ad2',
            imageUrl: '/src/assets/img/BuyNowButtonBlue.jpg',
            message: 'This is sample ad2'

        }, {
            title: 'Sample Ad3',
            imageUrl: '/src/assets/img/BuyNowButtonBlue.jpg',
            message: 'This is sample ad3'

        }];
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;
    };

}])



angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', function TopJobsCtrl(config, topJobsService) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    topJobsService.mostApplied(config.user.user_id, config.company.id, config.limit).then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    })
}]);



angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['generalStatsService', 'config',
    function GeneralStatsCtrl(generalStatsService, config) {
        var generalStats = this;
        generalStats.config = config;
        generalStats.options = {
            "chart": {
                "type": "lineChart",
                "height": config.height,
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 40,
                    "left": 55
                },
                "useInteractiveGuideline": true,
                "dispatch": {},
                "xAxis": {
                    "axisLabel": "Date (MM-DD-YYYY)",
                    showMaxMin: false,
                    staggerLabels: true,
                    tickFormat: function(d) {
                        return moment.unix(d).format("MM-DD-YYYY");
                    }
                },
                "yAxis": {
                    "axisLabel": "Count",
                    "axisLabelDistance": -10
                },
                "x": function(data) {
                    return moment(data.date).unix();
                },
                "y": function(data) {
                    return parseInt(data.count);
                },

            }
        }
        generalStats.data = [];
        generalStatsService.applicant(config.user.user_id, config.company.id).then(function(resp) {
            if (config._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Applicants',
                values: resp.data
            });
        }, function(error) {
            if (config._DEBUG)
                console.log(error);
        });
        generalStatsService.job(config.user.user_id, config.company.id).then(function(resp) {
            if (config._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Jobs',
                values: resp.data
            });
        }, function(error) {
            if (config._DEBUG)
                console.log(error);
        });
    }
]);



angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', ['config', 'dropCvService', '$log', function DropCvCtrl(config, dropCvService, $log) {
    var dropCv = this;
    dropCv.config = config;
    dropCv.dzAddedFile = function(file) {
        $log.log(file);
    };

    dropCv.dzError = function(file, errorMessage) {
        $log.log(errorMessage);
    };

    dropCv.dropzoneConfig = {
        init: function() {},
        parallelUploads: 1,
        maxFileSize: 5,
        url: config.apiRoot + '',
        method: 'post',
        filesizeBase: 1024,
        paramName: 'cv',
        uploadMultiple: false,
        addRemoveLinks: true,
        clickable: true,
        createImageThumbnails: true,
        maxThumbnailFilesize: .5,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        dictDefaultMessage: null,
        dictFallbackMessage: null,
        dictFallbackText: null,
        dictInvalidFileType: null,
        dictFileTooBig: null,
        dictResponseError: null,
        dictCancelUpload: "Cancel",
        dictCancelUploadConfirmation: "Are you sure you want to cancel upload?",
        dictRemoveFile: "Remove",
        dictMaxFilesExceeded: null

    };
}]);



angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'adsService', function AdsCtrl(config, adsService) {
    var ads = this;
    ads.config = config;
    adsService.getAll().then(function(resp) {
        if (config._DEBUG)
            console.log(resp);
        ads.list = resp;
    }, function(error) {
        if (config._DEBUG)
            console.log(error);
    });
}]);
})(window);