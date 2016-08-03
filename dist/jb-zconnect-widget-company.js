(function(window, undefined) {'use strict';


angular.module('jb-zconnect-widget-company', [
        'adf.provider',
        'nvd3',
        'ngDropzone',
        'ngSanitize',
        'angular-timeline',
        'angularMoment',
        'ngAnimate',
        'ngFileUpload',
        'ngResource',
        'angular-underscore',
        'ngZconnected',
        'ui.bootstrap',
        'ngMap'
    ])
    .config(["dashboardProvider", function(dashboardProvider) {
        Dropzone.autoDiscover = false;
        var widgetTemplatesPath = '{widgetsPath}/jb-zconnect-widget-company/src/templates/';
        var widgetConfig = {
            height: 225,
            _DEBUG: false
        };
        var widget = {
            collapse: false,
            frameless: false,
            styleClass: "",
            reload: true,
            resolve: {
                currentUser: ['userService', function(userService) {
                    return userService.getCurrentUser();
                }]
            }
        };
        dashboardProvider
            .widget('general-stats', angular.extend(angular.copy(widget), {
                title: 'Company General Stats',
                description: 'Widget for showing general information for company.',
                templateUrl: widgetTemplatesPath + 'general-stats.html',
                controller: 'GeneralStatsCtrl',
                controllerAs: 'generalStats',
                styleClass: 'general-stats',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('top-jobs', angular.extend(angular.copy(widget), {
                title: 'Company Top Jobs',
                description: 'Widget for showing most applied jobs from company.',
                templateUrl: widgetTemplatesPath + 'top-jobs.html',
                controller: 'TopJobsCtrl',
                controllerAs: 'topJobs',
                styleClass: 'top-jobs',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('drop-cv', angular.extend(angular.copy(widget), {
                title: 'Company CV Dropzone',
                description: 'Widget that provides a dropzone area for uploading applicants cv.',
                templateUrl: widgetTemplatesPath + 'drop-cv.html',
                controller: 'DropCvCtrl',
                controllerAs: 'dropCv',
                styleClass: 'drop-cv',
                reload: false,
                config: angular.extend(angular.copy(widgetConfig), {})

            }))
            .widget('ads', angular.extend(angular.copy(widget), {
                title: 'Advertisements',
                description: 'Widget that shows advertisements.',
                templateUrl: widgetTemplatesPath + 'ads.html',
                controller: 'AdsCtrl',
                controllerAs: 'ads',
                styleClass: 'ads',
                config: angular.extend(angular.copy(widgetConfig), {})

            }))
            .widget('timeline', angular.extend(angular.copy(widget), {
                title: 'Timeline',
                description: 'Widget that shows company timeline/activities.',
                templateUrl: widgetTemplatesPath + 'timeline.html',
                controller: 'TimelineCtrl',
                controllerAs: 'timeline',
                styleClass: 'timeline',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('job-post-form', angular.extend(angular.copy(widget), {
                title: 'Job Post',
                description: 'Widget that shows a form for job posting.',
                templateUrl: widgetTemplatesPath + 'job-post.html',
                controller: 'JobPostCtrl',
                controllerAs: 'jobPost',
                styleClass: 'job-post-form',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('applicant-stats', angular.extend(angular.copy(widget), {
                title: 'Applicant Stats',
                description: 'Widget that shows visual statistics for total applicants of company.',
                templateUrl: widgetTemplatesPath + 'applicant-stats.html',
                controller: 'ApplicantStatsCtrl',
                controllerAs: 'applicantStats',
                styleClass: 'applicant-stats',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('notifications', angular.extend(angular.copy(widget), {
                title: 'Notifications',
                description: 'Widget that shows notifications of the company.',
                templateUrl: widgetTemplatesPath + 'notifications.html',
                controller: 'NotificationsCtrl',
                controllerAs: 'notifications',
                styleClass: 'notifications',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('messages', angular.extend(angular.copy(widget), {
                title: 'Messages',
                description: 'Widget that shows messages of the company.',
                templateUrl: widgetTemplatesPath + 'messages.html',
                controller: 'NotificationsCtrl',
                controllerAs: 'notifications',
                styleClass: 'notifications',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('followers', angular.extend(angular.copy(widget), {
                title: 'Recent Followers',
                description: 'Widget that shows followers of the company.',
                templateUrl: widgetTemplatesPath + 'followers.html',
                controller: 'FollowersCtrl',
                controllerAs: 'followers',
                styleClass: 'followers',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('status', angular.extend(angular.copy(widget), {
                title: 'Status',
                description: 'Widget that shows status of the company.',
                templateUrl: widgetTemplatesPath + 'status.html',
                controller: 'StatusCtrl',
                controllerAs: 'status',
                styleClass: 'status',
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('insights', angular.extend(angular.copy(widget), {
                title: 'Insights',
                description: 'Widget that shows insights of the company.',
                templateUrl: widgetTemplatesPath + 'insights.html',
                controller: 'InsightsCtrl',
                controllerAs: 'insights',
                styleClass: 'insights',
                config: angular.extend(angular.copy(widgetConfig), {
                    linkSref: "",
                    linkText: "See all insights"
                })
            }))
            .widget('link', angular.extend(angular.copy(widget), {
                title: 'Link',
                description: 'Widget that shows link of the company.',
                templateUrl: widgetTemplatesPath + 'link.html',
                controller: 'LinkCtrl',
                controllerAs: 'link',
                styleClass: 'link',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {
                    imageType: "image", //or icon
                    sref: "/",
                    imageSource: "", //for icon use glyph or fa classess
                    text: "Home",


                })
            }))
            .widget('company-map', angular.extend(angular.copy(widget), {
                title: 'Company Map',
                description: 'Widget that shows a location of the company in a map.',
                templateUrl: widgetTemplatesPath + 'company-map.html',
                controller: 'CompanyMapCtrl',
                controllerAs: 'map',
                styleClass: 'company-map',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {
                    apiKey: '',
                    longhitude: '',
                    latitude: '',
                    zoom: ''
                })
            }))
            .widget('company-details', angular.extend(angular.copy(widget), {
                title: 'Company Details',
                description: 'Widget that shows the company in a details.',
                templateUrl: widgetTemplatesPath + 'company-details.html',
                controller: 'CompanyDetailsCtrl',
                controllerAs: 'details',
                styleClass: 'company-details',
                frameless: true,
                config: angular.extend(angular.copy(widgetConfig), {})
            }))
            .widget('email', angular.extend(angular.copy(widget), {
                title: 'Email',
                description: 'Widget that shows the list.',
                templateUrl: widgetTemplatesPath + 'email.html',
                controller: 'EmailCtrl',
                controllerAs: 'email',
                styleClass: 'email',
                config: angular.extend(angular.copy(widgetConfig), {})
            }));
    }])
    .provider('jbWidget', function() {
        var self = this;
        var apiRoot = '//jobsglobal.dev/api/v1';
        var company = {};
        var siteName = 'jobsglobal.dev';
        self.setSiteName = function(_siteName) {
            siteName = _siteName;
            return self;
        };
        self.setCompany = function(_company) {
            company = _company;
            return self;
        };
        self.setApiRoot = function(_apiRoot) {
            apiRoot = _apiRoot;
            return self;
        };
        self.$get = function() {
            return {
                apiRoot: apiRoot,
                company: company,
                siteName: siteName
            }
        };
        return self;
    });

angular.module("jb-zconnect-widget-company").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/ads.html","<div style=\"height: {{ads.config.height}}px !important\"><uib-carousel active=active interval=2000><uib-slide ng-repeat=\"ad in ads.list\" index=ad.id><img ng-src={{ad.image}} style=margin:auto;><div class=carousel-caption><h4 data-ng-bind=ad.title></h4><p data-ng-bind=ad.message></p></div></uib-slide></uib-carousel></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/applicant-stats.html","<div style=\"height: {{applicantStats.config.height}}px !important;overflow: auto\"><nvd3 options=applicantStats.options data=applicantStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/company-details.html","<div style=\"height: {{details.config.height}}px !important;\"><ul class=company_details_dashboard><li><h1>Arabian Centers Human Resources</h1></li><li><p><span>Industry :</span>Recruitment Company</p></li><li><p><span>Location :</span>Garhoud, Dubai, United Arab Emirates</p></li><li><p><span>Phone :</span>055 525 23322</p></li><li><p><span>Email :</span>test@jobsglobal.com</p></li></ul></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/company-map.html","<div style=\"height: {{map.config.height}}px !important;\"><div map-lazy-load=https://maps.google.com/maps/api/js map-lazy-load-params=\"https://maps.googleapis.com/maps/api/js?key={{map.config.apiKey}}\"><ng-map center={{map.config.longhitude}},{{map.config.latitude}} zoom={{map.config.zoom}}><marker label={{map.company.name}} place={{map.company.name}} centered=true position=\"{{map.config.longhitude}}, {{map.config.latitude}}\"></marker></ng-map></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/drop-cv.html","<div><form class=dropzone method=post enctype=multipart/form-data ng-dropzone dropzone=dropCv.dropzone data-dropzone-config=dropCv.dropzoneConfig data-event-handlers=\"{ \'addedfile\': dropCv.dzAddedFile, \'error\': dropCv.dzError, success: dropCv.dzSuccess }\" style=\"min-height: {{dropCv.config.height}}px\"><div class=dz-message>Drop CV here or click to upload</div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/email.html","<div style=\"height: {{applicantStats.config.height}}px !important;overflow: auto\"><p class=email_dashboard_p>test@jobsgloabal.com</p></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/followers.html","<div style=\"height: {{followers.config.height}}px !important; text-align:center\"><ul class=recent_followers_ul><li data-ng-repeat=\"user in followers.array\"><a data-ng-href={{user.profile_url}}><img ng-src={{user.avatar}} err-src=/components/com_community/templates/zconjobs/images/user-Male.png class=profile-img></a></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><button type=button class=c_all_cpanel><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i>See all Notifications</button></div></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/general-stats.html","<div style=\"height: {{generalStats.config.height}}px !important;overflow: auto\"><nvd3 options=generalStats.options data=generalStats.data></nvd3></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/insights.html","<div class={{insights.config.class}} style=\"height: {{insights.config.height}}px !important;\"><nvd3 options=insights.options data=insights.data></nvd3><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><button type=button class=c_all_insight_cpanel data-ui-sref={{insights.config.linkSref}}><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i>{{insights.config.linkText}}</button></div></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/job-post.html","<div style=\"height: {{jobPost.config.height}}px !important;float: left;overflow: auto;width:100%\"><form class=job_horizontal name=jobPostForm novalidate data-ng-submit=jobPost.saveJobPosts(jobPostForm)><div class=modal-body><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><ul class=job_post_modal_ul><li><p>Vacancy title</p><input type=text data-ng-model=jobPost.jobGroup.name name=groupName data-ng-required=true><div class=registration_error data-ng-show=\"jobPostForm.groupName.$error.required && (jobPostForm.groupName.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancy title.</h6></div></li><li><ul class=job_post_inner_ul><li><p>Start date</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><p class=input-group><input type=text class=form-control name=dateStart data-uib-datepicker-popup=MM/dd/yyyy data-ng-model=jobPost.jobGroup.date_start data-is-open=dateStart.opened data-datepicker-options=jobPost.dateStartOptions data-ng-required=true data-close-text=Close data-alt-input-formats=altInputFormats> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"dateStart.opened = true\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p><div class=registration_error data-ng-show=\"jobPostForm.dateStart.$error.required && (jobPostForm.dateStart.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancies starting date.</h6></div></div></div></li><li><p>End date</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><p class=input-group><input type=text class=form-control name=dateEnd data-uib-datepicker-popup=MM/dd/yyyy data-ng-model=jobPost.jobGroup.date_end data-is-open=dateEnd.opened data-datepicker-options=jobPost.dateEndOptions data-ng-required=true data-close-text=Close data-min-date=jobPost.jobGroup.start_date data-alt-input-formats=altInputFormats> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"dateEnd.opened = true\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p><div class=registration_error data-ng-show=\"jobPostForm.dateEnd.$error.required && (jobPostForm.dateEnd.$touched || jobPostForm.$submitted)\"><h6>Please specify vacancies ending date.</h6></div></div></div></li></ul></li><li style=width:100%><p>Description</p><textarea name=jobGroupDescription data-ng-model=jobPost.jobGroup.description></textarea></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><h4 class=company_job_edit_head><i class=\"fa fa-globe\" aria-hidden=true></i>Location</h4></div></div><ul class=job_post_modal_ul><li><p>Industry<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=industry data-ng-options=\"industry.description as industry.description for industry in jobPost.industries\" data-ng-model=jobPost.jobGroup.industry data-ng-required=true><option disabled selected>Select Industry</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.industry.$error.required && (jobPostForm.industry.$touched || jobPostForm.$submitted)\"><h6>Please specify industry</h6></div></div></div></li><li><p>Country<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=country data-ng-model=jobPost.jobGroup.country data-ng-options=\"country as country.nicename for country in jobPost.countries\" data-ng-change=jobPost.getStates(jobPost.jobGroup.country) data-ng-required=true><option disabled selected>Select Country</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.country.$error.required && (jobPostForm.country.$touched || jobPostForm.$submitted)\"><h6>Please specify country</h6></div></div></div></li><li class=state data-ng-show=\"jobPost.jobGroup.country && jobPost.states.length > 0\"><p>State<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=state class=default_input_select data-ng-model=jobPost.jobGroup.state data-ng-change=jobPost.getCities(jobPost.jobGroup.state) data-ng-required=\"jobPost.states && jobPost.states.length\" data-ng-options=\"state as state.name for state in jobPost.states\"><option disabled selected>Select State</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.state.$error.required && (jobPostForm.state.$touched || jobPostForm.$submitted)\"><h6>Please specify state</h6></div></div></div></li><li class=cityDv data-ng-show=\"jobPost.jobGroup.state && jobPost.cities.length > 0\"><p>City</p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=city class=default_input_select data-ng-model=jobPost.jobGroup.city data-ng-required=\"jobPost.cities && jobPost.cities.length\" data-ng-options=\"city as city.name for city in jobPost.cities\"><option disabled selected>Select City</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.city.$error.required && (jobPostForm.city.$touched || jobPostForm.$submitted)\"><h6>Please specify city</h6></div></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><h4 class=company_job_edit_head><i class=\"fa fa-suitcase\" aria-hidden=true></i>Work Information</h4></div></div><ul class=\"job_post_modal_ul addPosition\" data-ng-repeat=\"job in jobPost.newJobs\"><li><p>Position<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><input id=title name=title{{$index}} type=text class=title data-ng-model=job.job_title data-ng-required=true data-ng-maxlength=125 maxlength=125><div class=registration_error data-ng-show=\"jobPostForm.title{{$index}}.$error.required && (jobPostForm.title{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify position</h6></div></div></div></li><li><p>Experience<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=experience{{$index}} class=yearsofexp data-ng-model=job.experience data-ng-options=\"i as i for i in jobPost.expYears\" data-ng-required=true><option disabled selected>Select Experience</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.experience{{$index}}.$error.required && (jobPostForm.experience{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify experience</h6></div></div></div></li><li><p>Currency<span class=require_star data-ng-show=\"(job.salary > 0)\">*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=\"row select-container\"><select name=currency{{$index}} data-ng-model=job.currency data-ng-required=\"(job.salary > 0)\" data-ng-options=\"currency.currency_code as currency.currency_code for currency in jobPost.currencies\"><option disabled selected>Select currency</option></select><span class=arrow aria-hidden=true></span><div class=registration_error data-ng-show=\"jobPostForm.currency{{$index}}.$error.required && (jobPostForm.currency{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify currency</h6></div></div></div></li><li><p>Salary</p><input name=salary{{$index}} type=number value=0 class=salary data-ng-model=job.salary></li><li><p>Upload Photo</p><img data-ngf-thumbnail=job.image class=job_post_img><div class=job_post_upload_photo data-ng-model=job.image data-name=image{{$index}} data-ngf-pattern=\"\'image/*\'\" data-ngf-accept=\"\'image/*\'\" data-ngf-max-size=5MB data-ngf-min-height=100 data-ngf-min-width=100 data-ngf-max-height=2160 data-ngf-max-width=2160 data-ngf-fix-orientation=true data-ngf-resize=jobPost.resizeOptions($file) data-ngf-resize-if=\"$width > 1024 || $height > 1024\" data-ngf-select><button type=button class=job_post_photo_browse>Select job Photo</button></div></li><li><p>Job Details<span class=require_star>*</span></p><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><textarea class=details name=details{{$index}} data-ng-model=job.job_description maxlength=5000 data-ng-required=true></textarea><div class=registration_error data-ng-show=\"jobPostForm.details{{$index}}.$error.required && (jobPostForm.details{{$index}}.$touched || jobPostForm.$submitted)\"><h6>Please specify details</h6></div></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><a class=add_btn_edit data-ng-click=jobPost.addPosition(jobPostForm)><i class=\"fa fa-plus-circle\"></i>Add Position</a></div></div></div></div><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><ul class=\"apply_modal_buttonset button_set_margin\"><li><button type=submit><i class=\"fa fa-envelope\" aria-hidden=true></i>Post</button></li></ul></div></div><zloader data-ng-show=jobPost.loader></zloader></div></form></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/link.html","<a class=dashboard_cv_search_link href=javascript: data-ui-sref={{link.config.sref}}><img data-ng-src={{link.config.imageSource}} data-ng-if=\"link.config.imageType==\'image\'\"><i data-ng-if=\"link.config.imageType==\'icon\'\" class={{link.config.imageSource}}></i><span>{{link.config.text}}</span></a>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/messages.html","<div style=\"height: {{notifications.config.height}}px !important;\"><ul class=notification_ul><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=message_date>Sat 6</span></p><h5 class=message_h5>Hello,</h5></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=message_date>Sat 6</span></p><h5 class=message_h5>Hello,</h5></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=message_date>Sat 6</span></p><h5 class=message_h5>Hello,</h5></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=message_date>Sat 6</span></p><h5 class=message_h5>Hello,</h5></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><button class=c_all_cpanel type=button><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i> See all Messages</button></div></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/notifications.html","<div style=\"height: {{notifications.config.height}}px !important;\"><ul class=notification_ul><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><button type=button class=c_all_cpanel><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i>See all Notifications</button></div></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/status.html","<div style=\"height: {{notifications.config.height}}px !important;\"><ul class=notification_ul><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li><li><div class=\"col-lg-1 col-sm-1 col-xs-1\"><div class=row><img src=http://zblogged.com/wp-content/uploads/2015/11/5.png></div></div><div class=\"col-lg-11 col-sm-11 col-xs-11\"><div class=row><p><span class=name>Mapi mendoza</span><span class=action>liked</span><span class=object>your photo</span></p><h6>2 days ago</h6></div></div></li></ul><div class=\"col-lg-12 col-sm-12 col-xs-12\"><div class=row><button type=button class=c_all_cpanel><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i>See all Notifications</button></div></div></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/timeline.html","<div class=timeline-container style=\"max-height: {{timeline.config.height}}px !important;\"><timeline><timeline-event ng-repeat=\"event in timeline.events\"><timeline-badge class=\"actor-avatar timeline-hidden\" when-visible=timeline.animateElementIn when-not-visible=timeline.animateElementOut bind-scroll-to=.timeline-container><img class=img-responsive data-ng-src={{event.actor.avatar}} alt={{event.actor.first_name}}></timeline-badge><timeline-panel class=\"{{event.badgeClass}} timline-hidden\" when-visible=timeline.animateElementIn when-not-visible=timeline.animateElementOut bind-scroll-to=.timeline-container><timeline-heading data-ng-switch data-on=event.app><span class=pull-right am-time-ago=\"event.created | amUtc\"></span> <span class=title-header data-ng-switch-when=groups.wall>{{(event.actor.user_id==timeline.currentUser.user_id) ? \"You\" : event.actor.first_name}} posted a status.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.jobpost>{{event.actor.first_name}} posted a job.<h4 data-ng-bind-html=event.title></h4></span> <span class=title-header data-ng-switch-when=groups.join><ng-pluralize count=event.actors.length when=\"{ \'0\': \'\', \'1\': \'{{event.actors[0].first_name}} has joined the company.\', \'2\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} have joined the company.\', \'one\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and one other have joined the company.\', \'other\': \'{{event.actors[0].first_name}} and {{event.actors[1].first_name}} and {} other have joined the company.\' }\" offset=2></ng-pluralize></span> <span class=title-header data-ng-switch-when=videos>{{event.actor.first_name}} posted a video.<br><h5><a data-ng-href={{event.params.video_url}}>Link</a> to video.</h5></span> <span class=title-header data-ng-switch-when=photos>{{event.actor.first_name}} posted a photo.<br><h5><a data-ng-href={{event.params.photo_url}}>Link</a> to photo.</h5></span> <span class=title-header data-ng-switch-when=events>{{event.actor.first_name}} posted an event.<br><h5><a data-ng-href={{event.params.event_url}}>Link</a> to event.</h5></span></timeline-heading><p data-ng-bind-html=event.content></p></timeline-panel></timeline-event></timeline></div>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/top-jobs.html","<ol class=dashbord_top_jobs><li><ul class=dashbord_top_jobs_ul-1><li class=\"col-lg-8 col-sm-8 col-xs-8\"><h4>Position</h4></li><li class=\"col-lg-4 col-sm-4 col-xs-4\"><h4>Applicants</h4></li></ul></li><li style=\"height: {{topJobs.config.height}}px !important;overflow: auto\"><ul class=dashbord_top_jobs_ul-2 data-ng-repeat=\"job in topJobs.data\"><li class=\"col-lg-8 col-sm-8 col-xs-8\"><p data-ng-bind=job.job_title></p></li><li class=\"col-lg-4 col-sm-4 col-xs-4\"><p class=text-center data-ng-bind=job.total></p></li></ul></li><div class=\"col-lg-12 col-sm-12 col-xs-12 top_jobs_dashboard_mrgn\"><div class=row><button class=view_all_button type=button><i class=\"fa fa-suitcase\" aria-hidden=true></i>Post new job</button> <button class=c_all_cpanel><i class=\"fa fa-chevron-circle-right\" aria-hidden=true></i>See all Jobs</button></div></div></ol>");
$templateCache.put("{widgetsPath}/jb-zconnect-widget-company/src/templates/widget.html","<div adf-id={{definition.wid}} adf-widget-type={{definition.type}} ng-class=\"widgetClasses(widget, definition)\" class=widget><div class=\"panel-heading clearfix\" ng-if=\"!widget.frameless || editMode\"><h3 class=panel-title>see {{definition.title}} <span class=pull-right><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_REFRESH\') }}\" ng-if=widget.reload ng-click=reload()><i class=\"glyphicon glyphicon-refresh\"></i></a><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_MOVE\') }}\" class=adf-move ng-if=editMode><i class=\"glyphicon glyphicon-move\"></i></a><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_COLLAPSE\') }}\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-minus\"></i></a><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_EXPAND\') }}\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-plus\"></i></a><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_EDIT\') }}\" ng-click=edit() ng-if=editMode><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_FULLSCREEN\') }}\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"glyphicon glyphicon-fullscreen\"></i></a><a title=\"{{ translate(\'ADF_WIDGET_TOOLTIP_REMOVE\') }}\" ng-click=remove() ng-if=editMode><i class=\"glyphicon glyphicon-remove\"></i></a></span></h3></div><div ng-class=\"{\'panel-body\':!widget.frameless || editMode}\" uib-collapse=widgetState.isCollapsed><adf-widget-content model=definition content=widget></adf-widget-content></div></div>");}]);


angular.module('jb-zconnect-widget-company').controller('TopJobsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function(config, jobService, jbWidget, ngZconnected, currentUser) {
    var topJobs = this;
    topJobs.data = [];
    topJobs.config = config;
    jobService.getMostApplied(currentUser.user_id, jbWidget.company.id, jbWidget.limit).then(function(resp) {
        if (ngZconnected._DEBUG)
            console.log(resp);
        topJobs.data = resp.data;
    }, function(error) {
        if (ngZconnected._DEBUG)
            console.log(error);
    })
}]);



angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', [
  'config',
  'companyService',
  'jbWidget',
  'ngZconnected',
  'currentUser',
  function (config, companyService, jbWidget, ngZconnected, currentUser) {
    var vm = this;
    vm.config = config;
    vm.currentUser = currentUser;

    vm.animateElementIn = function ($el) {
      $el.removeClass('timeline-hidden');
      $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
    };

    vm.animateElementOut = function ($el) {
      $el.addClass('timeline-hidden');
      $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
    };
    companyService.company.getTimelineHtml(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      vm.events = resp.data;
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    })
  }]);

angular
    .module('jb-zconnect-widget-company')
    .controller('FollowersCtrl', [function() {
        var vm = this;
        vm.test = 'Rafeeq';
    }])

angular
    .module('jb-zconnect-widget-company')
    .controller('NotificationsCtrl', [function() {
        var vm = this;
        vm.test = 'Rafeeq';
    }])



angular.module('jb-zconnect-widget-company').controller('TimelineCtrl', [
    'config',
    'companyService',
    'jbWidget',
    'ngZconnected',
    'currentUser',
    function(config, companyService, jbWidget, ngZconnected, currentUser) {
        var vm = this;
    }
]);

angular
    .module('jb-zconnect-widget-company')
    .controller('LinkCtrl', ['config', function(config) {
        var vm = this;
        vm.test = 'Rafeeq';
        vm.config = config;
    }])



angular.module('jb-zconnect-widget-company')
    .controller('JobPostCtrl', ['resourceService', 'currentUser', 'jobService', '$q', 'ngZconnected', 'jbWidget', 'companyService', 'employerService',
      function JobPostCtrl(resourceService, currentUser, jobService, $q, ngZconnected, jbWidget, companyService, employerService) {
        var vm = this;
        var defaultImage = "/components/com_media/img/job-default-img.png";
        vm.loader = true;
        vm.jobImages = [];
        vm.baseUrl = ngZconnected.baseUrl;
        vm.companyId = jbWidget.company.id;
        vm.newJobs = [];
        vm.expYears = _.range(0, 51);
        vm.currentUser = currentUser;
        vm.jobGroup = {
          start_date: new Date()
        };
        vm.dateStartOptions = {
          maxDate: new Date(2020, 5, 22),
          minDate: new Date()
        };

        vm.dateEndOptions = {
          maxDate: new Date(2020, 5, 22),
        };
        $q.when(companyService.company.get(vm.currentUser.user_id, vm.companyId))
          .then(function (company) {
          if (ngZconnected._DEBUG)
            console.log(company);
          vm.company = company;
          vm.addPosition();
          vm.loader = false;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error)
          }
        });
        resourceService.currencyList.get().then(function (resp) {
          vm.currencies = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }

        });
        resourceService.industryList.get().then(function (resp) {
          vm.industries = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }
        });
        resourceService.countryList.get().then(function (resp) {
          vm.countries = resp;
        }, function (error) {
          if (ngZconnected._DEBUG) {
            console.log(error);
          }
        });
        vm.uploadJobPhoto = function (file, job) {
          var deferred = $q.defer();
          jobService.uploadPhoto(vm.currentUser.user_id, vm.companyId, job.id, job.image)
            .then(function (resp) {
              job.image = resp.data.data;
              deferred.resolve(resp);
            }, function (error) {
              if (ngZconnected._DEBUG) {
                console.log(error);
              }
              deferred.reject(error);
            });
          return deferred.promise;
        };
        vm.resizeOptions = function (file) {
          console.log(file);
        };
        vm.saveJobPosts = function (form) {
          if (form.$valid) {
            vm.loader = true;
            $q.when(employerService.jobGroup.save(vm.currentUser.user_id, vm.companyId, vm.jobGroup))
              .then(function (resp) {
                vm.jobGroup.id = resp.data;
                var promises = [];
                console.log(vm.newJobs);
                vm.newJobs.forEach(function (job) {
                  job.job_group_id = vm.jobGroup.id;
                  promises.push(jobService.save(vm.currentUser.user_id, vm.companyId, job));
                });
                $q.all(promises).then(function (resps) {
                    console.log(resps);
                    var proms = [];
                    for (var x = 0; x < resps.length; x++) {
                      var job = vm.newJobs[x];
                      var resp = resps[x];
                      job.id = resp.data;
                      var file = job.image;
                      if (file)
                        proms.push(vm.uploadJobPhoto(file, job));
                    }
                    return $q.all(proms);
                  })
                  .then(function (resp) {
                    if (ngZconnected._DEBUG)
                      console.log(resp);
                    ngZconnected.helpers.showSystemMessage('Succesfully posted job/s.', 'message');
                    vm.newJobs = [];
                    vm.addPosition();
                    vm.loader = false;
                    angular.element('#jobPostModal').modal('hide');
                    location.reload();

                  }, function (errors) {
                    if (ngZconnected._DEBUG) {
                      console.log(errors);
                    }
                  });
              });


          } else {
            if (ngZconnected._DEBUG) {
              console.log(form.$error);
            }
          }
        };
        vm.getStates = function (country) {

          resourceService.stateList.get(country.id).then(function (resp) {
            vm.states = resp;
          }, function (error) {
            if (ngZconnected._DEBUG) {
              console.log(error);
            }
          });
        };
        vm.getCities = function (state) {

          resourceService.cityList.get(vm.jobGroup.country.id, state.id).then(function (resp) {
            vm.cities = resp;
          }, function (error) {
            if (ngZconnected._DEBUG) {
              console.log(error);
            }
          });
        };
        vm.addPosition = function (form) {
          var newPosition = {};
          if (form && form.$valid) {
            vm.newJobs.push(newPosition);
          } else {
            vm.newJobs.push(newPosition);
          }
        };
        vm.cancelJobPost = function () {
          vm.newJobs = [];
          vm.addPosition();
        };
        vm.dateStartChanged = function () {
          vm.dateEndOptions.minDate = vm.jobGroup.start_date;
        };
      }
    ]);

angular
    .module('jb-zconnect-widget-company')
    .controller('InsightsCtrl', ['config', function(config) {
        var vm = this;
        vm.config = config;
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
                    "height": 60,
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



angular.module('jb-zconnect-widget-company').controller('GeneralStatsCtrl', ['companyService', 'config', 'jbWidget', 'ngZconnected', 'currentUser',
  function (companyService, config, jbWidget, ngZconnected, currentUser) {
    var vm = this;
    vm.currentUser = currentUser;
    vm.config = config;
    vm.options = {
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
          tickFormat: function (d) {
            return moment.unix(d).format("MM-DD-YYYY");
          }
        },
        "yAxis": {
          "axisLabel": "Count",
          "axisLabelDistance": -10
        },
        "x": function (data) {
          return moment(data.date).unix();
        },
        "y": function (data) {
          return parseInt(data.count);
        }

      }
    };
    vm.data = [];
    companyService.job.getApplicantGeneralStats(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      vm.data.push({
        key: 'Applicants',
        values: resp.data
      });
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
    companyService.job.getJobGeneralStats(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
      if (ngZconnected._DEBUG)
        console.log(resp);
      vm.data.push({
        key: 'Jobs',
        values: resp.data
      });
    }, function (error) {
      if (ngZconnected._DEBUG)
        console.log(error);
    });
  }
]);

angular.module('jb-zconnect-widget-company').controller('FollowersCtrl', ['config', 'jbWidget', 'ngZconnected', 'currentUser', 'statsService', 'profileService',
    function(config, jbWidget, ngZconnected, currentUser, statsService, profileService) {
        var vm = this;
        vm.currentUser = currentUser;
        vm.company = jbWidget.company;
        vm.followers = {};
        vm.array = [];
        statsService.followers.get(vm.currentUser.user_id, vm.company.id).then(function(follower) {
            if (ngZconnected._DEBUG) console.log(follower);
            vm.getUserInfo(follower.data);
        }, function(error) {
            if (ngZconnected._DEBUG) {
                console.log(error)
            }
        });
        vm.getUserInfo = function(user) {
            for (var id in user) {
                profileService.userInfo.get(user[id]).then(function(user) {
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


angular.module('jb-zconnect-widget-company')
    .controller('EmailCtrl', ['config', function(config) {
        var ads = this;
    }]);



angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', [
  'config',
  'employerService',
  'jbWidget',
  'ngZconnected',
  'currentUser',
  'registrationService',
  'resourceService',
  '$q',
  function (config, employerService, jbWidget, ngZconnected, currentUser, registrationService, resourceService, $q) {
    var vm = this;
    vm.config = config;
    vm.currentUser = currentUser;
    vm.company = jbWidget.company;
    var apiRoot = jbWidget.apiRoot;
    vm.dzAddedFile = function (file) {
      if (ngZconnected._DEBUG)
        console.log(file);
    };

    vm.dzError = function (file, error) {
      if (ngZconnected._DEBUG) {
        console.log(error);
        console.log(file);
      }
      var $file = angular.element(file.previewElement);
      $file.find('.dz-error-message').html(error.message);
    };


    vm.dzSuccess = function (file, resp, progress) {
      if (resp.success) {
        if (ngZconnected._DEBUG)
        var parsedCv = {};
        parsedCv = preprocessPersonalInfo(angular.fromJson(resp.data.personal), resp.uploadId, resp.path);
        parsedCv.skill = preProcessSkills(angular.fromJson(resp.data.addinfo));
        parsedCv.language = preProcessLanguage(angular.fromJson(resp.data.addinfo));
        parsedCv.education = preprocessEducationInfo(angular.fromJson(resp.data.education));
        parsedCv.experience = preprocessExperience(angular.fromJson(resp.data.workexperience));

        registrationService.parsedCvSignup(parsedCv)
          .then(function(response) {
              if (ngZconnected._DEBUG)
              console.log(response);
          }, function(error) {
              console.log(error);
        });

      } else {
        switch (resp.error) {
          case 4:
          {
            employerService.cv.saveToCompany(vm.currentUser.user_id, vm.company.id, resp.data.id)
              .then(function (resp) {
                if (ngZconnected._DEBUG)
                  console.log(resp);

              }, function (error) {
                if (ngZconnected._DEBUG)
                  console.log(error);
              });
            break;
          }
          default:

        }
      }
    };
    vm.dropzoneConfig = {
      init: function () {
        console.log('init');
      },
      parallelUploads: 1,
      maxFileSize: 5,
      url: apiRoot + '/signup/upload/cv',
      method: 'post',
      filesizeBase: 1024,
      paramName: 'fileToUpload',
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
      dictMaxFilesExceeded: null,
      acceptedFiles: "application/pdf,application/msword,"
    };

    var init = function (argument) {
      /* body... */
    };
    var preprocessPersonalInfo = function (pesonalInfoJson, uploadId, path) {
      var processedData = {};
      processedData.jsfirstname = pesonalInfoJson.firstname;
      processedData.jslastname = pesonalInfoJson.lastname;
      if (_.isArray(pesonalInfoJson.email)) {
        var email = pesonalInfoJson.email;
        processedData.jsemail=email[0];
      } else {
        processedData.jsemail=pesonalInfoJson.email;
      }
      if (typeof pesonalInfoJson.phoneNumber != 'undefined') {
        if (_.isArray(pesonalInfoJson.phoneNumber)) {
          processedData.jsmobile=pesonalInfoJson.phoneNumber[0].replace(/\D/g, '');
        } else {
          processedData.jsmobile=pesonalInfoJson.phoneNumber.replace(/\D/g, '');
        }
      }

      if (typeof pesonalInfoJson.address != 'undefined') {
        if (typeof pesonalInfoJson.address.country != 'undefined')
          processedData.country = pesonalInfoJson.address.country.name;
        if (typeof pesonalInfoJson.address.state != 'undefined')
          processedData.state = pesonalInfoJson.address.state;
        if (typeof pesonalInfoJson.address.city != 'undefined')
          processedData.city = pesonalInfoJson.address.city;
      }

      if (typeof pesonalInfoJson.nationality != 'undefined') {
        if (typeof pesonalInfoJson.nationality.name != 'undefined')
          processedData.nationality = pesonalInfoJson.nationality.name;
      }

      processedData.uploadId = uploadId;
      processedData.uploadPath = path;
      
      return processedData;
    }

    var preprocessExperience = function(experienceInfoJson) {
        var position = "";
        var company = "";
        var locationExp = "";
        var experience = [];
        var description = "";
        var expe = {};
        if (_.isArray(experienceInfoJson.phase)) {
            experienceInfoJson.phase.forEach(function (exp, key) {
                if (_.isString(exp.function)) {
                    position = exp.function;
                } else if (_.isArray(exp.function)) {
                    position = exp.function[0];
                } else {
                    position = exp.position.name;
                }
                if (_.isString(exp.company)) {
                    company = exp.company;
                } else if (_.isArray(exp.company)) {
                    if (typeof exp.company[1] == "object") {
                        company = exp.company[0];
                    } else {
                        company = exp.company[1];
                    }
                }
                if (_.isArray(exp.location)) {
                    if (typeof exp.location[1] == "object") {
                        locationExp = exp.location[1].country.name;
                    } else {
                        locationExp = exp.location[0].country.name;
                    }
                } else {
                    if (typeof exp.location !== 'undefined') {
                        locationExp = exp.location.country.name;
                    } else {
                        locationExp = "";
                    }
                }
                if (typeof exp.comments.length != 'undefined') {
                    description = exp.comments.replace(/[.]/g, ".\n");
                }

                expe = {
                    job_company: company,
                    job_title: position,
                    job_start: exp.dateFromFuzzy,
                    job_end: exp.dateToFuzzy,
                    job_detail: description,
                    job_location: locationExp,
                }

                experience.push(expe);

            });
        } else {
            if (typeof experienceInfoJson.phase != 'undefined') {
                if (_.isString(experienceInfoJson.phase.function)) {
                    position = experienceInfoJson.phase.function;
                } else if (_.isArray(experienceInfoJson.phase.function)) {
                    position = experienceInfoJson.phase.function[0];
                } else {
                    position = experienceInfoJson.phase.position.name;
                }

                if (_.isString(experienceInfoJson.phase.company)) {
                    company = experienceInfoJson.phase.company;
                } else if (_.isArray(experienceInfoJson.phase.company)) {
                    if (typeof experienceInfoJson.phase.company[1] == "object") {
                        company = experienceInfoJson.phase.company[0];
                    } else {
                        company = experienceInfoJson.phase.company[1];
                    }
                }

                if (_.isArray(experienceInfoJson.phase.location)) {
                    if (typeof experienceInfoJson.phase.location[1] == "object") {
                        locationExp = experienceInfoJson.phase.location[1].country.name;
                        locationVal = locationExp;
                    } else {
                        locationExp = experienceInfoJson.phase.location[0].country.name;
                        locationVal = locationExp;
                    }
                } else {
                    if (typeof experienceInfoJson.phase.location !== 'undefined') {
                        locationExp = experienceInfoJson.phase.location.country.name;
                        locationVal = locationExp;
                    } else {
                        locationExp = "";
                        locationVal = "";
                    }
                }

                if (typeof experienceInfoJson.phase.comments.length != 'undefined') {
                    description = experienceInfoJson.phase.comments.replace(/[.]/g, ".\n");
                }

                expe = {
                    job_company: company,
                    job_title: position,
                    job_start: wexp.phase.dateFromFuzzy,
                    job_end: wexp.phase.dateToFuzzy,
                    job_detail: description,
                    job_location: locationExp,
                }

                experience.push(expe);

            }
        }

        return JSON.stringify(experience);
    }

    var preprocessEducationInfo = function(educationInfoJson) {
        var tdate = "";
        var fdate = "";
        var education = [];
        var objectTemp = "";
         if (typeof educationInfoJson.phase.length == 'undefined') {
              if (typeof educationInfoJson.phase.dateFromFuzzy != 'undefined') {
                  var efphase = new Date(educationInfoJson.phase.dateFromFuzzy);
                  fdate = efphase.getFullYear();
              }
              if (typeof educationInfoJson.phase.dateToFuzzy != 'undefined') {
                  var etphase = new Date(educationInfoJson.phase.dateToFuzzy);
                  tdate = etphase.getFullYear();
              }

              objectTemp = {
                  school_name: educationInfoJson.phase.schoolname,
                  year_started: fdate,
                  year_ended: tdate,
                  industry: educationInfoJson.phase.graduation,
                  description: educationInfoJson.phase.comments
              }

              education.push(objectTemp);

          } else {
              educationInfoJson.phase.forEach(function (edu, key) {
              if (typeof edu.dateFromFuzzy != 'undefined') {
                  var efphase = new Date(edu.dateFromFuzzy);
                  fdate = efphase.getFullYear();
              }
              if (typeof edu.dateToFuzzy != 'undefined') {
                  var etphase = new Date(edu.dateToFuzzy);
                  tdate = etphase.getFullYear();
              }
              
              objectTemp = {
                  school_name: edu.schoolname,
                  year_started: fdate,
                  year_ended: tdate,
                  industry: edu.graduation,
                  description: edu.comments
              };
              education.push(objectTemp);
          });
        }

        return JSON.stringify(education);
    }

    var preProcessSkills = function(skillInfoJson){
        var i = 1;
        var skill = [];
        var ski = "";
        if (_.isArray(skillInfoJson.undatedSkill)) {
            skillInfoJson.undatedSkill.forEach(function (add, key) {
                ski = {
                  skill : add.name
                }
                skill.push(ski);
            });
        } else {
            if (skillInfoJson.undatedSkill != null) {
                skillInfoJson.undatedSkill.name
            } else {
                if (_.isArray(skillInfoJson.undatedOperationArea)) {
                    skillInfoJson.undatedOperationArea.forEach(function (add, key) {
                        ski = {
                          skill : add.name
                        }
                        skill.push(ski);
                    });
                } else {
                    if (skillInfoJson.undatedOperationArea != null) {
                        ski = {
                          skill : skillInfoJson.undatedOperationArea.name
                        }
                        skill.push(ski);
                    }
                }
            }
        }
        return JSON.stringify(skill);
    }

    var preProcessLanguage = function(langInfoJson){
      var language = [];
      var lang = "";
      if (_.isArray(langInfoJson.language)) {
          langInfoJson.language.forEach(function (lng, key) {
            if (typeof lng.name.length != 'undefined') {
                lang = {
                  language: lng.name
                }
                language.push(lang);
            }
          });
      } else {
        if (typeof langInfoJson.language != 'undefined') {
          lang = {
              language: langInfoJson.language.name
          }
          language.push(lang);
        }
      }
       return JSON.stringify(language);
    }

}]);

angular
    .module('jb-zconnect-widget-company')
    .controller('CompanyMapCtrl', ['config', 'jbWidget', function(config, jbWidget) {
        var vm = this;
        vm.test = 'Rafeeq';
        vm.config = config;
        vm.company = jbWidget.company;
    }])

angular
    .module('jb-zconnect-widget-company')
    .controller('CompanyDetailsCtrl', ['config', function(config) {
        var vm = this;
        vm.test = 'Rafeeq';
        vm.config = config;
    }])



angular.module('jb-zconnect-widget-company').controller('ApplicantStatsCtrl', ['config', 'jobService', 'jbWidget', 'ngZconnected', 'currentUser', function (config, jobService, jbWidget, ngZconnected, currentUser) {
  var vm = this;
  vm.config = config;
  vm.options = {
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
      "duration": 1000,
      "clipEdge": true,
      "stacked": false,
      "dispatch": {},
      "xAxis": {
        "axisLabel": "Date (MM-DD-YYYY)",
        showMaxMin: false,
        staggerLabels: true,
        tickFormat: function (d) {
          return moment.unix(d).format("MM-DD-YYYY");
        }
      },
      "yAxis": {
        "axisLabel": "Count",
        "axisLabelDistance": -10
      },
      "x": function (data) {
        return moment(data.date).unix();
      },
      "y": function (data) {
        return parseInt(data.count);
      },

    }
  };
  vm.data = [];
  vm.currentUser = currentUser;
  jobService.applicants.getStats(vm.currentUser.user_id, jbWidget.company.id).then(function (resp) {
    vm.data.push({
      key: 'Applicants',
      values: resp.data
    });
    if (ngZconnected._DEBUG)
      console.log(resp);
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);



angular.module('jb-zconnect-widget-company').controller('AdsCtrl', ['config', 'resourceService', 'ngZconnected', function (config, resourceService, ngZconnected) {
  var ads = this;
  ads.config = config;
  resourceService.adList().then(function (resp) {
    if (ngZconnected._DEBUG)
      console.log(resp);
    ads.list = resp;
  }, function (error) {
    if (ngZconnected._DEBUG)
      console.log(error);
  });
}]);
})(window);