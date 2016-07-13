'use strict';

angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', [
  'config',
  'employerService',
  'jbWidget',
  'ngZconnected',
  'currentUser',
  'registrationService',
  'resourceService',
  function (config, employerService, jbWidget, ngZconnected, currentUser, registrationService, resourceService) {
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
          console.log(resp);
        var parsedCv = {};
        parsedCv.addinfo = angular.fromJson(resp.data.addinfo);
        parsedCv.education = angular.fromJson(resp.data.education).phase;
        parsedCv.image = angular.fromJson(resp.data.image);
        parsedCv.personal = preprocessPersonalInfo(angular.fromJson(resp.data.personal));
        parsedCv.experience = angular.fromJson(resp.data.workexperience).phase;
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
    var preprocessPersonalInfo = function (pesonalInfoJson) {
      var personalInfo = JSON.parse(pesonalInfoJson);
      var processedData = {};
      processedData.jsfirstname = personalInfo.firstname;
      processedData.jslastname = personalInfo.lastname;
      if (_.isArray(personalInfo.email)) {
        var email = personalInfo.email;
        processedData.jsemail=email[0];
      } else {
        processedData.jsemail=personalInfo.email;
      }
      if (typeof personalInfo.phoneNumber != 'undefined') {
        if (_.isArray(personalInfo.phoneNumber)) {
          processedData.jsmobile=personalInfo.phoneNumber[0].replace(/\D/g, '');
        } else {
          processedData.jsmobile=personalInfo.phoneNumber.replace(/\D/g, '');
        }
      }
    }


  }]);
