(function(window, undefined) {'use strict';


angular.module('jb-zconnect-widget-company', ['adf.provider', 'nvd3', 'ngDropzone', 'slick', 'ngSanitize', 'angular-timeline', 'angularMoment', 'ngAnimate', 'ngFileUpload', 'ngResource', 'angular-underscore'])
    .config(["dashboardProvider", function(dashboardProvider) {
        Dropzone.autoDiscover = false;
        var widgetConfig = {
            height: 225,
            _DEBUG: false
        };
        var widget = {
            collapse: false,
            frameless: false,
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
            }))
            .widget('job-post-form', angular.extend(widget, {
                title: 'Job Post',
                description: 'Widget that shows a form for job posting.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html',
                controller: 'JobPostCtrl',
                controllerAs: 'jobPost',
                config: angular.extend(widgetConfig, {})
            }))
            .widget('job-post-form', angular.extend(widget, {
                title: 'Joomla Module',
                description: 'Widget that shows a module from specific list of modules.',
                templateUrl: '{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module.html',
                controller: 'JoomlaModuleCtrl',
                controllerAs: 'joomlaModule',
                edit: {
                    controller: "JoomlaModuleEditCtrl",
                    controllerAs: "joomlaModuleEdit",
                    templateUrl: "{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module-edit.html",
                    resolve: {

                        "joomlaModuleList": ['joomlaModuleService', function(joomlaModuleService) {
                            return joomlaModuleService.getModules();
                        }]
                    },
                    reload: true,
                    immediate: true
                },
                resolve: {},
                config: angular.extend(widgetConfig, {})
            }));
    }]);

angular.module("jb-zconnect-widget-company").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html","<div class=ads style=\"height: {{ads.config.height}}px !important\"><slick slides-to-show=1 data=ads.list slides-to-scroll=1 autoplay=false autoplayspeed=2 arrows=true centermode=true dots=true init-onload=true><div data-ng-repeat=\"ad in ads.list\" class=\"text-center container\"><a data-ng-href={{ad.link}}><img class=img-responsive data-ng-src={{ad.image}} alt={{ad.title}}> <span class=ad-message>{{ad.message}}</span></a></div></slick></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html","<div class=drop-cv style=\"height: {{dropCv.config.height}}px !important;\"><form class=dropzone method=post enctype=multipart/form-data ng-dropzone dropzone=dropCv.dropzone dropzone-config=dropCv.dropzoneConfig event-handlers=\"{ \'addedfile\': dropCv.dzAddedFile, \'error\': dropCv.dzError }\" style=\"min-height: {{dropCv.config.height}}px\"><div class=dz-message>Drop CV here or click to upload</div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html","<div class=general-stats style=\"height: {{generalStats.config.height}}px !important;overflow: auto\"><nvd3 options=generalStats.options data=generalStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html","<div class=job-post-form><form class=form-horizontal name=jobPostForm data-ng-init=jobPost.addPosition() novalidate data-ng-submit=jobPost.saveJobPosts(jobPostForm)><div class=modal-body-save1><div class=\"col-lg-12 col-sm-12 col-xs-12 profile-tabs\"><div class=\"col-lg-12 col-sm-12 col-xs-12\"><h4 class=\"default_heading no-margin\"><span>Work Information</span></h4></div><div class=addPosition data-ng-repeat=\"job in jobPost.newJobs\"><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Position<span class=require_star>*</span></h6><input id=title name=title{{$index}} type=text class=\"default_input_text title\" data-ng-model=job.job_title data-ng-required=true data-ng-maxlength=125 maxlength=125> <span class=error-message data-ng-show=\"jobPostForm.title{{$index}}.$error.required && jobPostForm.title{{$index}}.$touched\">Please specify position</span></div><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Experience<span class=require_star>*</span></h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=experience{{$index}} class=\"default_input_select yearsofexp\" data-ng-model=job.experience data-ng-options=\"i as i for i in jobPost.expRange\" data-ng-required=true><option disabled selected>Select Experience</option></select><span class=arrow aria-hidden=true></span></div></div><span class=error-message data-ng-show=\"jobPostForm.experience{{$index}}.$error.required && jobPostForm.experience{{$index}}.$touched\">Please specify experience.</span></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><div class=\"col-lg-3 col-sm-3 col-xs-12\"><h6 class=default_label>Currency</h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=currency{{$index}} class=default_input_select data-ng-model=job.currency data-ng-required=\"(job.salary > 0)\" data-ng-options=\"currency.currency_code as currency.currency_code for currency in jobPost.currencies\"><option disabled selected>Select currency</option></select><span class=arrow aria-hidden=true></span></div></div><span class=error-message data-ng-show=\"jobPostForm.currency{{$index}}.$error.required && jobPostForm.currency{{$index}}.$touched\">Please specify currency.</span></div><div class=\"col-lg-3 col-sm-3 col-xs-12\"><h6 class=default_label>Salary</h6><input name=salary{{$index}} type=number value=0 class=\"default_input_text salary\" data-ng-model=job.salary></div><div class=\"col-lg-4 col-sm-3 col-xs-6\"><h6 class=default_label>Upload Photo</h6><div class=\"button company_reg_btn_set\" data-ng-model=job.image data-name=image{{$index}} data-ngf-pattern=\"\'image/*\'\" data-ngf-accept=\"\'image/*\'\" data-ngf-max-size=5MB data-ngf-min-height=100 data-ngf-min-width=100 data-ngf-max-height=2160 data-ngf-max-width=2160 data-ngf-fix-orientation=true data-ngf-resize=jobPost.resizeOptions($file) data-ngf-resize-if=\"$width > 1024 || $height > 1024\" data-ngf-select><button type=button class=company_file_select>Select Cover Photo</button></div></div><div class=\"col-lg-2 col-sm-3 col-xs-6\"><img data-ngf-thumbnail=job.image class=job_post_img></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Job Details<span class=require_star>*</span></h6><textarea class=\"default_input_textarea details\" name=details{{$index}} data-ng-model=job.job_description maxlength=5000 data-ng-required=true></textarea> <span class=error-message data-ng-show=\"jobPostForm.details{{$index}}.$error.required && jobPostForm.details{{$index}}.$touched\">Please specify details.</span></div><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Url</h6><p title=\"Generated url\" data-ng-bind=job.fullUrl class=job-url></p></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><a data-ng-click=jobPost.addPosition(jobPostForm)>Add Position</a></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><h4 class=\"default_heading modal_jobpost_head\"><span>Location</span></h4></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Industry<span class=require_star>*</span></h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=industry class=default_input_select data-ng-options=\"industry.description for industry in jobPost.industries\" data-ng-model=jobPost.jobsLocation.industry data-ng-required=true><option disabled selected>Select Industry</option></select><span class=arrow aria-hidden=true></span></div></div><span class=error-message data-ng-show=\"jobPostForm.industry.$error.required && jobPostForm.industry.$touched\">Please specify industry.</span></div><div class=\"col-lg-6 col-sm-6 col-xs-12\"><h6 class=default_label>Country<span class=require_star>*</span></h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=country data-ng-model=jobPost.jobsLocation.country class=default_input_select data-ng-options=\"country as country.nicename for country in jobPost.countries\" data-ng-change=jobPost.getStates(jobPost.jobsLocation.country) data-ng-required=true><option disabled selected>Select Country</option></select><span class=arrow aria-hidden=true></span></div></div><span class=error-message data-ng-show=\"jobPostForm.country.$error.required && jobPostForm.country.$touched\">Please specify country.</span></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><div class=\"col-lg-6 col-sm-6 col-xs-12 state\" data-ng-show=\"jobPost.jobsLocation.country && jobPost.states.length > 0\"><h6 class=default_label>State<span class=require_star>*</span></h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=state class=default_input_select data-ng-model=jobPost.jobsLocation.state data-ng-change=jobPost.getCities(jobPost.jobsLocation.state) data-ng-required=\"jobPost.states && jobPost.states.length\" data-ng-options=\"state as state.name for state in jobPost.states\"><option disabled selected>Select State</option></select><span class=arrow aria-hidden=true></span></div></div></div><div class=\"col-lg-6 col-sm-6 col-xs-12 cityDv\" data-ng-show=\"jobPost.jobsLocation.state && jobPost.cities.length > 0\"><h6 class=default_label>City</h6><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=city class=default_input_select data-ng-model=jobPost.jobsLocation.city data-ng-required=\"jobPost.cities && jobPost.cities.length\" data-ng-options=\"city as city.name for city in jobPost.cities\"><option disabled selected>Select City</option></select></div></div><span class=arrow aria-hidden=true></span> <span class=error-message data-ng-show=\"jobPostForm.city.$error.required && jobPostForm.city.$touched\">Please specify city.</span></div></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><button type=submit class=modal_job_post_submit>Post</button> <button type=button id=closeSaveBtn class=modal_job_post_cancel data-dismiss=modal data-ng-click=jobPost.cancelJobPost()>Cancel</button></div><div class=zloader data-ng-show=jobPost.loader><div class=sk-circle><div class=\"sk-circle1 sk-child\"></div><div class=\"sk-circle2 sk-child\"></div><div class=\"sk-circle3 sk-child\"></div><div class=\"sk-circle4 sk-child\"></div><div class=\"sk-circle5 sk-child\"></div><div class=\"sk-circle6 sk-child\"></div><div class=\"sk-circle7 sk-child\"></div><div class=\"sk-circle8 sk-child\"></div><div class=\"sk-circle9 sk-child\"></div><div class=\"sk-circle10 sk-child\"></div><div class=\"sk-circle11 sk-child\"></div><div class=\"sk-circle12 sk-child\"></div></div></div></div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module-edit.html","<form role=form name=joomlaModuleEditForm><div class=form-group><label for=module>Joomla Module</label><select name=module data-ng-model=config.module data-ng-options=\"module as module for module in joomlaModuleEdit.modules\"><option disabled selected data-ng-required=true>Select Module</option></select></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/joomla-module.html","<div class=joomla-module><div class=\"alert alert-info\" ng-if=!config.module>Please select a module in the widget configuration</div><div class=joomla-module data-ng-bind-html=joomlaModule.renderedHtml data-ng-if=config.module></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html","<div class=timeline style=\"height: {{timeline.config.height}}px !important\"><timeline><timeline-event ng-repeat=\"event in timeline.events\"><timeline-badge class=actor-avatar><img class=img-responsive data-ng-src={{event.actor.avatar}} alt={{event.actor.first_name}}></timeline-badge><timeline-panel class={{event.badgeClass}}><timeline-heading data-ng-switch data-on=event.app><span class=pull-right am-time-ago=\"event.created | amUtc\"></span> <span class=title-header data-ng-switch-when=groups.wall>{{(event.actor.user_id==timeline.currentUser.user_id) ? \"You\" : event.actor.first_name}} posted a status.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.jobpost>{{event.actor.first_name}} posted a job.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.join><ng-pluralize count=event.actors.length when=\"{ \'0\': \'\', \'1\': \'{{event.actors[0].first_name}} has joined the company.\', \'2\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} have joined the company.\', \'one\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and one other have joined the company.\', \'other\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and {} other have joined the company.\' }\" offset=2></ng-pluralize></span> <span class=title-header data-ng-switch-when=videos>{{event.actor.first_name}} posted a video.<br><h5><a data-ng-href={{event.params.video_url}}>Link</a> to video.</h5></span> <span class=title-header data-ng-switch-when=photos>{{event.actor.first_name}} posted a photo.<br><h5><a data-ng-href={{event.params.photo_url}}>Link</a> to photo.</h5></span> <span class=title-header data-ng-switch-when=events>{{event.actor.first_name}} posted an event.<br><h5><a data-ng-href={{event.params.event_url}}>Link</a> to event.</h5></span></timeline-heading><p data-ng-bind-html=event.content></p></timeline-panel></timeline-event></timeline></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<div class=top-jobs style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><table class=\"table table-striped table-responsive\"><tr><th>Position</th><th class=text-center>Applicants</th></tr><tr data-ng-repeat=\"job in topJobs.data\"><td data-ng-bind=job.job_title></td><td class=text-center data-ng-bind=job.total></td></tr></table></div>");}]);


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

angular.module('jb-zconnect-widget-company').service('timelineService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getTimelineHtml = function(userId, companyId) {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/employer/' + userId + '/company/' + companyId + '/activities?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);

angular.module('jb-zconnect-widget-company').service('joomlaModuleService', ['$http', '$q', 'dashboard', 'jbWidget', function($http, $q, dashboard, jbWidget) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getModules = function() {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/module?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    self.getModule = function(moduleName) {

        var deferred = $q.defer();
        $http.get(apiRoot + '/module?name=' + moduleName, {
            headers: {
                "Content-Type": 'text/html'
            }
        }).then(function(resp) {
            deferred.resolve(resp.data.data);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
}]);


angular.module('jb-zconnect-widget-company').service('jobPostService', ['$http', '$q', 'dashboard', 'jbWidget', 'Upload', '$resource', function($http, $q, dashboard, jbWidget, Upload, $resource) {
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.api = $resource(apiRoot + "/employer/:id/company/:companyid/job?social=1");
    self.save = function(id, companyid, job) {
        return this.api.save({ id: id, companyid: companyid }, job).$promise;
    };
    self.uploadPhoto = function(id, companyid, jobid, file) {
        var data = {};
        data['photo'] = file;
        return Upload.upload({
            url: Zconnected.apiUrl + '/employer/' + id + '/company/' + companyid + '/job/' + jobid + '/upload',
            data: data,
        });
    };
}]);



angular.module('jb-zconnect-widget-company').service('jbWidget', function() {
    var self = this;
    self.apiRoot = '//jobsglobal.dev/api/v1';
    self.user = {};
    self.company = {};
    self._DEBUG = false;
    self.siteName = 'jobsglobal.dev';
    self.setSiteName = function(siteName) {
        self.siteName = siteName;
        return self;
    };
    self.setDebugMode = function(debugMode) {
        self._DEBUG = debugMode;
        return self;
    };
    self.setUser = function(user) {
        self.user = user;
        return self;
    };
    self.setCompany = function(company) {
        self.company = company;
        return self;
    };
    self.setApiRoot = function(apiRoot) {
        self.apiRoot = apiRoot;
        return self;
    };

    return self;
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
    var apiRoot = jbWidget.apiRoot;
    var self = this;
    self.getAll = function() {
        var deferred = $q.defer();
        $http.jsonp(apiRoot + '/ads?callback=JSON_CALLBACK').then(function(resp) {
            deferred.resolve(resp.data);
        }, function(error) {
            deferred.reject(error);
        })
        return deferred.promise;
    };

}]);



angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'topJobsService', 'jbWidget', function TopJobsCtrl(config, topJobsService, jbWidget) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    topJobsService.mostApplied(jbWidget.user.user_id, jbWidget.company.id, jbWidget.limit).then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    })
}]);



angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', ['config', 'timelineService', 'jbWidget', function TimelineCtrl(config, timelineService, jbWidget) {
    var timeline = this;
    timeline.config = config;
    timeline.currentUser = jbWidget.user;

    timeline.animateElementIn = function($el) {
        $el.removeClass('hidden');
        $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
    };

    timeline.animateElementOut = function($el) {
        $el.addClass('hidden');
        $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
    };
    timelineService.getTimelineHtml(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        timeline.events = resp.data;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    })
}]);



angular.module('jb-zconnect-widget-company').controller('JoomlaModuleCtrl', ['config', 'joomlaModuleService', 'jbWidget', function JoomlaModuleCtrl(config, joomlaModuleService, jbWidget) {
    var joomlaModule = this;
    if (config.module) {
        joomlaModuleService.getModule(config.module).then(function(resp) {
            if (jbWidget._DEBUG)
                console.log(resp);
            joomlaModule.renderedHtml = resp;
        }, function(error) {
            if (jbWidget._DEBUG)
                console.log(error);
        });
    }
}]).controller('JoomlaModuleEditCtrl', ['joomlaModuleList', function(joomlaModuleList) {
    console.log(joomlaModuleList);
    var joomlaModuleEdit = this;
    joomlaModuleEdit.modules = joomlaModuleList;
}]);



angular.module('jb-zconnect-widget-company').controller('JobPostCtrl', ['config', 'jbWidget', '$q', 'jobPostService', '$rootScope',
    function JobPostCtrl(config, jbWidget, $q, jobPostService, $rootScope) {
        var jobPost = this;
        jobPost.loader = false;
        jobPost.jobImages = [];
        jobPost.siteName = jbWidget.siteName;
        jobPost.company = jbWidget.company;
        var urlTemplate = 'index.php?option=com_zconjobs&view=jobs&layout=details&company=<%= company %>&id=<%= uniqueId %>';
        var render = $rootScope._(urlTemplate).template();
        jobPost.expRange = $rootScope._(51).range();
        jobPost.expRange.shift();
        jobPost.currentUser = jbWidget.user;
        jobPost.newJobs = [{}];
        // Resource.currencyList.get().then(function(resp) {
        jobPost.currencies = jbWidget.currentcies;
        // }, function(error) {
        //     if (jbWidget._DEBUG) {
        //         console.log(error);
        //     }

        // });
        // Resource.industryList.get().then(function(resp) {
        jobPost.industries = jbWidget.industries;
        // }, function(error) {
        //     if (jbWidget._DEBUG) {
        //         console.log(error);
        //     }
        // });

        // Resource.countryList.get().then(function(resp) {
        jobPost.countries = jbWidget.countries;
        // }, function(error) {
        //     if (jbWidget._DEBUG) {
        //         console.log(error);
        //     }
        // });
        jobPost.uploadJobPhoto = function(file, job) {
            jobPostService.uploadPhoto(jobPost.currentUser.user_id, jbWidget.company.id, job.id, job.image)
                .then(function(resp) {
                    job.image = resp.data.data;
                }, function(error) {
                    if (jbWidget._DEBUG) {
                        console.log(error);
                    }
                });
        };
        jobPost.resizeOptions = function(file) {
            console.log(file);
        };
        jobPost.saveJobPosts = function(form) {
            if (form.$valid) {
                jobPost.loader = true;
                var promises = [];
                console.log(jobPost.newJobs);
                jobPost.newJobs.forEach(function(job) {
                    job.industry = jobPost.jobsLocation.industry.description;
                    job.country = jobPost.jobsLocation.country.nicename;
                    if (jobPost.jobsLocation.state) {
                        job.state = jobPost.jobsLocation.state.name || '';
                    }
                    if (jobPost.jobsLocation.city) {
                        job.city = jobPost.jobsLocation.city.name || '';
                    }
                    console.log(job);
                    promises.push(jobPostService.save(jobPost.currentUser.user_id, jbWidget.company.id, job));
                });
                $q.all(promises).then(function(resps) {
                    console.log(resps);
                    promises = [];
                    for (var x = 0; x < resps.length; x++) {
                        var job = jobPost.newJobs[x];
                        var resp = resps[x];
                        job.id = resp.data;
                        var file = jobPost.jobImages[x];
                        jobPost.uploadJobPhoto(file, job);
                    }
                    jobPost.newJobs = [];
                    jobPost.addPosition();
                    jobPost.loader = false;
                    angular.element('#jobPostModal').modal('hide');
                    //                                location.reload();
                }, function(errors) {
                    if (jbWidget._DEBUG) {
                        console.log(errors);
                    }
                });

            } else {
                if (jbWidget._DEBUG) {
                    console.log(form.$error);
                }
            }
        };
        jobPost.getStates = function(country) {

            // Resource.stateList.get(country.id).then(function(resp) {
            //     jobPost.states = resp;
            // }, function(error) {
            //     if (jbWidget._DEBUG) {
            //         console.log(error);
            //     }
            // });
        };

        jobPost.getCities = function(state) {

            // Resource.cityList.get(jobPost.jobsLocation.country.id, state.id).then(function(resp) {
            //     jobPost.cities = resp;
            // }, function(error) {
            //     if (jbWidget._DEBUG) {
            //         console.log(error);
            //     }
            // });
        };
        jobPost.addPosition = function(form) {
            // Resource.uniqId.get().then(function(resp) {
            //     if (resp.$resolved) {

            //         var uniqueId = resp.data;
            //         var url = render({ company: jobPost.companyName, uniqueId: uniqueId });
            //         var newPosition = {
            //             id: uniqueId,
            //             url: url,
            //             fullUrl: 'http://' + jobPost.siteName + '/' + url,
            //             image: "/components/com_media/img/job-default-logo.png"
            //         };
            //         if (form && form.$valid) {
            //             jobPost.newJobs.push(newPosition);
            //         } else {
            //             jobPost.newJobs.push(newPosition);
            //         }
            //     }
            // }, function(error) {
            //     if (jbWidget._DEBUG) {
            //         console.log(error);
            //     }
            // });
        };
        jobPost.cancelJobPost = function() {
            jobPost.newJobs = [];
            jobPost.addPosition();
        };

    }
]);



angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['generalStatsService', 'config', 'jbWidget',
    function GeneralStatsCtrl(generalStatsService, config, jbWidget) {
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
        generalStatsService.applicant(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
            if (jbWidget._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Applicants',
                values: resp.data
            });
        }, function(error) {
            if (jbWidget._DEBUG)
                console.log(error);
        });
        generalStatsService.job(jbWidget.user.user_id, jbWidget.company.id).then(function(resp) {
            if (jbWidget._DEBUG)
                console.log(resp);
            generalStats.data.push({
                key: 'Jobs',
                values: resp.data
            });
        }, function(error) {
            if (jbWidget._DEBUG)
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
        url: config.apiRoot + '/signup/upload/cv',
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



angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'adsService', 'jbWidget', function AdsCtrl(config, adsService, jbWidget) {
    var ads = this;
    ads.config = config;
    adsService.getAll().then(function(resp) {
        if (jbWidget._DEBUG)
            console.log(resp);
        ads.list = resp;
    }, function(error) {
        if (jbWidget._DEBUG)
            console.log(error);
    });
}]);
})(window);