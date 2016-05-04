angular.module('ngZconnected.api', ['ngResource', 'ngCookies', 'ngFileUpload', 'ngZconnected'])
    .factory('resourceService', ['$resource', 'ngZconnected', '$q', '$http', function($resource, ngZconnected, $q, $http) {
        var apiBase = ngZconnected.apiUrl;
        var api = {
            countryList: {
                api: $resource(apiBase + '/country'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            stateList: {
                api: $resource(apiBase + '/country/:countryid/state'),

                get: function(countryid) {
                    return this.api.query({ countryid: countryid }).$promise;
                }
            },
            cityList: {
                api: $resource(apiBase + '/country/:countryid/state/:stateid/city'),

                get: function(countryid, stateid) {
                    return this.api.query({ countryid: countryid, stateid: stateid }).$promise;
                }
            },
            industryList: {
                api: $resource(apiBase + '/industry'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            contactTypeList: {
                api: $resource(apiBase + '/contactType'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            imTypeList: {
                api: $resource(apiBase + '/imType'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            recommendationTemplateList: {
                api: $resource(apiBase + '/testimonialRelationship'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            languageProficiencyList: {
                api: $resource(apiBase + '/language/proficiency'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            languageList: {
                api: $resource(apiBase + '/language'),

                get: function() {
                    return this.api.query().$promise;
                }
            },
            currencyList: {
                api: $resource(apiBase + '/currency'),
                get: function() {
                    return this.api.query().$promise;
                }
            },
            uniqId: {
                api: $resource(apiBase + '/uniqid'),

                get: function() {
                    return this.api.get().$promise;
                }
            },
            companyTypeList: {
                get: function() {
                    var deferred = $q.defer();
                    $http.get(Zconnected.apiUrl + '/company/type').success(function(resp) {
                        deferred.resolve(resp);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

            },
            companyStatusList: {
                get: function() {
                    var deferred = $q.defer();
                    $http.get(Zconnected.apiUrl + '/company/status').success(function(resp) {
                        deferred.resolve(resp);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            },
            companySizeList: {
                get: function() {
                    var deferred = $q.defer();
                    $http.get(Zconnected.apiUrl + '/company/size').success(function(resp) {
                        deferred.resolve(resp);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            }
        };

        return api;
    }])
    .factory('companyService', ['$resource', '$http', '$q', 'Upload', 'ngZconnected', function($resource, $http, $q, Upload, ngZconnected) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        'use strict';
        var apiRoot = ngZconnected.apiUrl;
        var store = {
            company: {
                api: $resource(apiRoot + '/employer/:id/company/:companyid', {}, { update: { method: 'PUT' } }),

                get: function(id, companyid) {
                    return this.api.get({ id: id, companyid: companyid }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                save: function(id, company) {
                    return this.api.save({ id: id }, company).$promise;
                },
                update: function(id, company) {
                    return this.api.update({ id: id, companyid: company.id }, company).$promise;
                },
                remove: function(id, company) {
                    return this.api.remove({ id: id, companyid: company.id }).$promise;
                },
                activate: function(jwt) {
                    var deferred = $q.defer();
                    $http.post(apiRoot + '/company/activate', { jwt: jwt })
                        .success(function(resp) {
                            deferred.resolve(resp);
                        })
                        .error(function(error) {
                            deferred.reject(error);
                        });
                    return deferred.promise;
                },
                uploadPhoto: function(id, companyid, file, type) {
                    var data = {};
                    data[type] = file;
                    return Upload.upload({
                        url: apiRoot + '/employer/' + id + '/company/' + companyid + '/upload/' + type,
                        data: data,
                    });
                }
            }

        };

        return store;
    }])
    .factory('profileService', ['$resource', '$q', '$http', 'ngZconnected', function($resource, $q, $http, ngZconnected) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        'use strict';
        var apiRoot = ngZconnected.apiUrl;
        var store = {
            userInfo: {
                api: $resource(apiRoot + '/user/:id', { id: '@user_id' }, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },

                update: function(userInfo) {
                    return this.api.update({ id: userInfo.user_id }, userInfo)
                        .$promise;
                },
                profileView: function(id) {
                    var deferred = $q.defer();
                    $http.post(apiRoot + '/user/' + id + '/profileView', {})
                        .success(function(resp) {
                            deferred.resolve(resp);
                        })
                        .error(function(error) {
                            deferred.reject(error);
                        });
                    return deferred.promise;
                }
            },
            profileViews: function (id, page) {
                return $resource(Zconnected.apiUrl + '/user/:id/profileView?limit=1&page=:page').get({id: id, page: page}).$promise;
            },

            jobseekerInfo: {
                api: $resource(apiRoot + '/jobseeker/:id', { id: '@id' }, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },

                update: function(id, jobseekerInfo) {
                    return this.api.update({ id: id }, jobseekerInfo)
                        .$promise;
                }
            },
            userContactNumber: {
                api: $resource(apiRoot + '/user/:id/contact/:contactid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, userContactNumber) {
                    return this.api.update({ id: id, contactid: userContactNumber.id }, userContactNumber)
                        .$promise;
                },

                save: function(id, userContactNumber) {
                    return this.api.save({ id: id }, userContactNumber)
                        .$promise;
                },
                remove: function(id, contactNumberId) {
                    return this.api.remove({ id: id, contactid: contactNumberId }).$promise;
                }
            },
            userEmail: {
                api: $resource(apiRoot + '/user/:id/email/:emailid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, userEmail) {
                    return this.api.update({ id: id, emailid: userEmail.id }, userEmail)
                        .$promise;
                },

                save: function(id, userEmail) {
                    return this.api.save({ id: id }, userEmail)
                        .$promise;
                },
                remove: function(id, emailid) {
                    return this.api.remove({ id: id, emailid: emailid }).$promise;
                }
            },
            userAddress: {
                api: $resource(apiRoot + '/user/:id/address/:addressid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, userAddress) {
                    return this.api.update({ id: id, addressid: userAddress.id }, userAddress)
                        .$promise;
                },

                save: function(id, userAddress) {
                    return this.api.save({ id: id }, userAddress)
                        .$promise;
                }
            },
            jobseekerExperience: {
                api: $resource(apiRoot + '/jobseeker/:id/experience/:expid', null, { update: { method: 'PUT' } }),

                get: function(id, expid) {
                    return this.api.get({ id: id, expid: expid }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, jobseekerExperience) {
                    return this.api.update({ id: id, expid: jobseekerExperience.id }, jobseekerExperience)
                        .$promise;
                },
                save: function(id, jobseekerExperience) {
                    return this.api.save({ id: id }, jobseekerExperience)
                        .$promise;
                },
                remove: function(id, expid) {
                    return this.api.remove({ id: id, expid: expid }).$promise;
                }
            },
            jobseekerIm: {
                api: $resource(apiRoot + '/jobseeker/:id/im/:imid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, jobseekerIm) {
                    return this.api.update({ id: id, imid: jobseekerIm.id }, jobseekerIm)
                        .$promise;
                },

                save: function(id, jobseekerIm) {
                    return this.api.save({ id: id }, jobseekerIm)
                        .$promise;
                },
                remove: function(id, imid) {
                    return this.api.remove({ id: id, imid: imid }).$promise;
                }
            },
            jobseekerSkill: {
                api: $resource(apiRoot + '/jobseeker/:id/skill/:skillid', null, { update: { method: 'PUT' } }),

                get: function(id, skillId) {
                    return this.api.get({ id: id, skillid: skillId }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, jobseekerSkill) {
                    return this.api.update({ id: id, skillid: jobseekerSkill.id }, jobseekerSkill)
                        .$promise;
                },
                save: function(id, jobseekerSkill) {
                    return this.api.save({ id: id }, jobseekerSkill)
                        .$promise;
                },
                remove: function(id, skillId) {
                    return this.api.remove({ id: id, skillid: skillId }).$promise;
                }
            },
            jobseekerSkillEndorsement: {
                api: $resource(apiRoot + '/jobseeker/:id/skill/:skillid/endorsement', null),

                query: function(id, skillid) {
                    return this.api.query({ id: id, skillid: skillid }).$promise;
                },
                toggle: function(id, skillId) {
                    return $resource(apiRoot + '/jobseeker/:id/skill/:skillid/endorsement/toggle').save({ id: id, skillid: skillId }, {}).$promise;
                }
            },
            jobseekerEducation: {
                api: $resource(apiRoot + '/jobseeker/:id/education/:educid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, jobseekerEducation) {
                    return this.api.update({ id: id, educid: jobseekerEducation.id }, jobseekerEducation)
                        .$promise;
                },
                save: function(id, jobseekerEducation) {
                    return this.api.save({ id: id }, jobseekerEducation)
                        .$promise;
                },
                remove: function(id, educid) {
                    return this.api.remove({ id: id, educid: educid }).$promise;
                }
            },
            jobseekerRecommendation: {
                api: $resource(apiRoot + '/jobseeker/:id/testimonial/:testimonialid', null, { update: { method: 'PUT' } }),

                actions: $resource(apiRoot + '/jobseeker/:id/testimonial/:testimonialid/:action', null, { update: { method: 'PUT' } }),

                get: function(id, testimonialid) {
                    return this.api.get({ id: id, testimonialid: testimonialid }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, jobseekerRecommendation) {
                    return this.api.update({ id: id, testimonialid: jobseekerRecommendation.id }, jobseekerRecommendation)
                        .$promise;
                },
                save: function(id, jobseekerRecommendation) {
                    return this.api.save({ id: id }, jobseekerRecommendation)
                        .$promise;
                },
                remove: function(id, testimonialid) {
                    return this.api.remove({ id: id, testimonialid: testimonialid }).$promise;
                },
                action: function(id, testimonialid, action) {
                    return this.actions.update({ id: id, testimonialid: testimonialid, action: action }, {}).$promise;
                }
            },
            jobseekerLanguage: {
                api: $resource(apiRoot + '/jobseeker/:id/language/:langid', null, { update: { method: 'PUT' } }),

                get: function(id) {
                    return this.api.get({ id: id }).$promise;
                },
                query: function(id) {
                    return this.api.query({ id: id }).$promise;
                },
                update: function(id, language) {
                    return this.api.update({ id: id, langid: language.id }, language)
                        .$promise;
                },
                save: function(id, language) {
                    return this.api.save({ id: id }, language)
                        .$promise;
                },
                remove: function(id, langid) {
                    return this.api.remove({ id: id, langid: langid }).$promise;
                }
            },

            profileStrength: {
                api: $resource(apiRoot + "/user/:id/profileStrength"),
                get: function($id) {
                    return this.api.get({ id: $id }).$promise;
                }

            }

        };

        return store;
    }])
    .factory('registrationService', ['$http', '$resource', function($http, $resource) {
        'use strict';
        var store = {};

        return store;
    }])
    .service('employerService', ['$resource', 'ngZconnected', function employerService($resource, ngZconnected) {
        var self = this;
        var apiRoot = ngZconnected.apiUrl;
        self.api = $resource(apiRoot + '/employer/:userId', null, { update: { method: 'PUT' } });
        self.getEmployerProfile = function(userId) {
            return self.api.get({ userId: userId }).$promise;
        };
        self.updateEmployerProfile = function(userId, employerProfile) {
            return self.api.update({ userId: userId }, employerProfile).$promise;
        };
    }])
    .factory('statsService', ['$http', '$q', 'ngZconnected', function statsService($http, $q, ngZconnected) {
        var apiRoot = ngZconnected.apiUrl;
        return {
            followers: {
                get: function(userId, companyId) {
                    var deferred = $q.defer();
                    $http.get(apiRoot + '/employer/' + userId + '/company/' + companyId + '/followers').then(function(resp) {
                        deferred.resolve(resp.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            },
            jobs: {
                count: function(userId, companyId) {
                    var deferred = $q.defer();

                    $http.get(apiRoot + '/employer/' + userId + '/company/' + companyId + '/job/count').then(function(resp) {
                        deferred.resolve(resp.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;

                }
            },
            applicants: {
                count: function(userId, companyId) {
                    var deferred = $q.defer();

                    $http.get(apiRoot + '/employer/' + userId + '/company/' + companyId + '/applicant/count').then(function(resp) {
                        deferred.resolve(resp.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;

                }
            },
            members: {
                count: function(userId, companyId) {
                    var deferred = $q.defer();

                    $http.get(apiRoot + '/employer/' + userId + '/company/' + companyId + '/member/count').then(function(resp) {
                        deferred.resolve(resp.data);
                    }, function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;

                }
            }
        };
    }])
    .factory('jobService', ['$resource', 'Upload', function ($resource, Upload) {
        return {
            api: $resource(Zconnected.apiUrl + "/employer/:id/company/:companyid/job?social=1"),
            save: function (id, companyid, job) {
                return this.api.save({id: id, companyid: companyid}, job).$promise;
            },
            uploadPhoto: function (id, companyid, jobid, file) {
                var data = {};
                data['photo'] = file;
                return Upload.upload({
                    url: Zconnected.apiUrl + '/employer/' + id + '/company/' + companyid + '/job/' + jobid + '/upload',
                    data: data,
                });
            }
        };
    }])
    .factory('userService', ['$resource', 'ngZconnected', function($resource, ngZconnected) {
        var apiRoot = ngZconnected.apiUrl;
        return {
            getCurrentUser: function() {
                return $resource(apiRoot + '/user/current').get().$promise;
            }
        };
    }])
    .factory('tokenService', ['$cookies', function($cookies) {
        return {
            getToken: function() {
                return $cookies.get('token');
            }
        };
    }])
    .factory('httpRequestInterceptor', ['tokenService', function (tokenProvider) {
        return {
            request: function (config) {
                var token = tokenProvider.getToken();
                if (!token) {
                    window.location.href = angular.element('#logoutLink').attr('href');
                } else {
                    config.headers['Authorization'] = "Bearer " + token;
                }
                return config;
            }
        };
    }]);

angular.module('ngZconnected', ['ngZconnected.api']).factory('ngZconnected', [function() {
    return Zconnected;
}]);
angular.module('ngZconnected.form.validations', []).directive('nonZero', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            nonZero: '='
        },
        link: function(scope, element, attribs, ctrl) {
            function validateNonZero(value) {
                var valid = value > 0;
                ctrl.$setValidity('nonZero', valid);
                return valid ? value : undefined;
            }
            if (scope.nonZero) {
                ctrl.$parsers.unshift(validateNonZero);
                validateNonZero(ctrl.$modelValue);
            }

        }
    };
});

var Zconnected = (function($) {
    var _DEBUG = true;
    //The following configuration is only for sublime debugging.
    var debuggerSettings = {
        ide: 1, //0 = Sublime, 1= Eclipse
        //debug configuration for sublime
        XDEBUG_SESSION_START: "XDEBUG_SESSION_START",
        //debug configuration for eclipse
        XDEBUG_SESSION_STOP_NO_EXEC: "XDEBUG_SESSION_STOP_NO_EXEC",
        XDEBUG_SESSION_KEY: "KEY"

    };
    var _baseUrl = $('base').attr('href') + 'index.php';
    //Global variables
    //Utility module
    var helpers = {
        createUrl: createUrl,
        attachParamterToUrl: attachParamterToUrl,
        isFunction: isFunction,
        showValidationError: showValidationError,
        hideValidationError: hideValidationError,
        clearAllValidationError: clearAllValidationError,
        showLoader: showLoader,
        hideLoader: hideLoader,
        animateTextChange: animateTextChange,
        hideHeader: hideHeader,
        setCustomBackground: setCustomBackground,
        removeCustomBackground: removeCustomBackground,
        toggleSidebarVisibility: toggleSidebarVisibility,
        showSystemMessage: showSystemMessage

    };
    return {
        init: init,
        helpers: helpers,
        apiUrl: "/api/v1",
        _DEBUG: _DEBUG,
        websiteName: "Zconnected"
    };

    function init() {
        if (_DEBUG) {
            var $menuProfile = $('.zconjobs-menu-profile');
            if($menuProfile.length){
                $('#menu677').on('click', function(e) {
                    e.preventDefault();
                    window.location.href = $('#logoutLink').attr('href');
                });
                $menuProfile.hide();
                $('body').on('click', 'a', function(event) {
                    var $a = $(this);
                    var url = $a.attr('href');
                    if (url && url.charAt(0) != '#') {
                        url = attachDebuggerSettingsToUrl(url);
                        $a.attr('href', url);
                    }
                    /* Act on the event */
                });
            }

            var $systemMessage = $('#system-message');
            if($systemMessage.length){
                $('#system-message').on("DOMNodeInserted", function() {
                    hideSystemMessage();
                });
                if ($('#system-message').html().length > 0) {
                    hideSystemMessage();
                }

            }
       };

    }

    function hideSystemMessage() {
        var $this = $('#system-message');
        window.setTimeout(function() {
            $this.slideUp(1000, function() {
                $this.html('');
                $this.show();
            });
        }, 2000);
    }

    function showSystemMessage(message, type) {
        var $systemMessage = $('#system-message');
        var template = '<div class="alert alert-' + type + '"><a class="close" data-dismiss="alert" href="#">×</a>' +
            '<div>' +
            '<p class="message">' + message + '</p>' +
            '</div>' +
            '</div>';
        $systemMessage.html(template);
    }

    //Utility methods
    function setCustomBackground() {
        $('body').addClass('register_bg');
        $('.jomsocial').css({
            backgroundColor: 'transparent'
        });
    }

    function removeCustomBackground() {
        $('body').removeClass('register_bg');
        $('.jomsocial').css({
            backgroundColor: '#ecf0f1'
        });
    }

    function toggleSidebarVisibility(isVisible) {
        if (isVisible == null) {
            $("#sidebar-2").toggle('show');
        } else {
            if (isVisible) {
                $("#sidebar-2").show();
            } else {
                $("#sidebar-2").hide();
            }
        }

    }

    //
    function hideHeader() {
        //$('#main').prepend('<style type="text/css">header{display:none;}#footer{display:none;}section{padding-top:20px;}</style>');

    }

    /**
     * Function to show a loader above a given element.
     *
     * @param   {String}  selector  Selector of the element.
     *
     */
    function showLoader(selector) {
        if (!selector) {
            if (_DEBUG) {
                console.error("Please specify selector of the element to put the loader.");
            }
            return false;
        }
        //get the element
        var $element = $(selector);
        if ($element.length == 0) {
            if (_DEBUG) {
                console.error("Please specify a valid selector.");
            }
            return false;
        }
        var $existingLoader = $(selector).siblings('.spinner-wrapper');
        if ($existingLoader.length === 0) { //create the loader element
            var $loader = $('<div class="spinner-wrapper">' +
                '<div class="spinner">' +
                '<div class="bounce1"></div>' +
                '<div class="bounce2"></div>' +
                '<div class="bounce3"></div>' +
                '</div>' +
                '</div>');
            //insert the loader above the element
            $loader.insertBefore($element);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Function to hide a loader near a given element.
     * if an element selector is not provided all loader will be remove
     *
     * @param   {String}  selector  Selector of the element.
     */
    function hideLoader(selector) {
        if (selector) {
            var $loader = $(selector).siblings('.spinner-wrapper');
            $loader.fadeOut('400', function() {
                $(this).remove();
            });
        } else {
            var $loaders = $('.spinner-wrapper');
            $loaders.fadeOut('400', function() {
                $(this).remove();
            });
        }
    }

    function animateTextChange(elementSelector, text) {
        var $elementSelector = $(elementSelector);
        $elementSelector.animate({ opacity: '0' }, "fast");
        $elementSelector.queue(function() {
            $elementSelector.html(text);
            $elementSelector.dequeue(); // This is necessary to continue the animation
        });
        $elementSelector.animate({ opacity: '1' }, "fast");
    }

    /**
     * Function to show a validation error below an element
     *
     * @param   {String}  elementSelector  id or class of the element
     * @param   {String}  message          The message to show.
     * @param   {Boolean}  animate         If showing the message will be animated.
     *
     * @return  {Boolean}                  If showing of validation error succeeded.
     */
    function showValidationError(elementSelector, message, animate, before, autohide) {
        if (!elementSelector) {
            if (_DEBUG) {
                console.error("Selector must not be null.");
            }
            return false;
        }
        if (!message) {
            if (_DEBUG) {
                console.error("Please provide a message to show.");
            }
            return false;
        }
        //get the element
        var $element = $(elementSelector);
        if (!$element.length) {
            if (_DEBUG) {
                console.error("Please provide a valid selector.");
            }
            return false;
        }
        //detect if element already has validation error message shown
        var $error = $element.siblings(".zconnected-error[data-error-for='" + elementSelector + "']");
        if ($error.length <= 0) {
            //create an error element
            $error = $('<p class="zconnected-error text-left has-error"></p>');
            //append the error next to the element
            if (before) {
                $error.insertBefore($element);
            } else {
                $error.insertAfter($element);
            }
            //set the data-error-for attribute of element to the elementSelector for future reference
            $error.attr('data-error-for', elementSelector);
        };
        if (animate) {
            Zconnected.helpers.animateTextChange($(".zconnected-error[data-error-for='" + elementSelector + "']"), message);
        } else {
            //set the error message to the error element
            $error.text(message);
        }
        return true;
    }

    /**
     * Function to hide a specific error message
     *
     * @param   {String}  elementSelector  The id or class of the element
     * @param   {Boolean}  animate         If showing the message will be animated.
     *
     * @return  {Boolean}                   If hiding the error message succeeded.
     */
    function hideValidationError(elementSelector, animate) {
        if (!elementSelector) {
            if (_DEBUG) {
                console.err("Selector must not be null.");
                return false;
            }
        }
        //get the element
        var $error = $(".zconnected-error[data-error-for='" + elementSelector + "']");
        //check if animated
        if (animate) {
            //hide the element
            $error.fadeOut('400', function() {
                $error.remove();
            });
        } else {
            $error.remove();
        }
    }

    function clearAllValidationError(animate) {
        //get all the validation errors
        var $validationErrors = $('.zconnected-error');
        $validationErrors.each(function(index, element) {
            hideValidationError($(element).attr('data-error-for'), animate);
        });
    }

    /**
     * Helper method to create a valid joomla url.
     * TODO: Add attachment of authentication token to url.
     *
     * @param   {String}  url  The joomla url i.e. ?option=com_profile&task=profile.testMethod
     *
     * @return  {[type]}       [description]
     */
    function createUrl(url) {
        if (url) {
            url = _baseUrl + url;
            if (_DEBUG) {
                url = attachDebuggerSettingsToUrl(url);
                console.log('Created url is :', url);
                return url;
            }
        } else {
            console.error("Please specify a valid url.");
            return;
        }
    }

    /**
     * Function to detect if a given variable is a function
     *
     * @param   {any}   functionToCheck  the variable to check
     *
     * @return  {Boolean}                true if the given variable is a function, otherwise false.
     */
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    function attachDebuggerSettingsToUrl(url) {
        var xdebugSessionStart = getUrlParameter(debuggerSettings.XDEBUG_SESSION_START);
        if (xdebugSessionStart) {
            url = attachParamterToUrl(url, debuggerSettings.XDEBUG_SESSION_START, xdebugSessionStart);
        }
        var xdebugSessionStopNoExec = getUrlParameter(debuggerSettings.XDEBUG_SESSION_STOP_NO_EXEC);
        if (xdebugSessionStopNoExec) {
            url = attachParamterToUrl(url, debuggerSettings.XDEBUG_SESSION_STOP_NO_EXEC, xdebugSessionStopNoExec);
        }
        var xdebugSessionKey = getUrlParameter(debuggerSettings.XDEBUG_SESSION_KEY);
        if (xdebugSessionKey) {
            url = attachParamterToUrl(url, debuggerSettings.XDEBUG_SESSION_KEY, xdebugSessionKey);
        }
        return url;
    }

    /**
     * Helper method to attach a parameter to url.
     *
     * @param   {String}  key    The name of the parameter
     * @param   {Any}     value  The value of the parameter
     *
     * @return  {String}         The proccessed url
     */
    function attachParamterToUrl(search, key, val) {
        var newParam = key + '=' + val,
            params = '?' + newParam;
        // If the "search" string exists, then build params from it
        if (search) {
            // Try to replace an existance instance
            params = search.replace(new RegExp('[\?&]' + key + '[^&]*'), '$1' + newParam);
            // If nothing was replaced, then add the new param to the end
            if (params === search) {
                params += '&' + newParam;
            }
        }
        return params;
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
})(jQuery);
jQuery(Zconnected.init);

jQuery.fn.extend({
    getPath: function() {
        var path, node = this;
        while (node.length) {
            var realNode = node[0],
                name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) {
                allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    }
});
