'use strict';

angular.module('jb-zconnect-widget-company').controller('DropCvCtrl', ['config', 'dropCvService', 'jbWidget', function DropCvCtrl(config, dropCvService, jbWidget) {
    var dropCv = this;
    dropCv.config = config;
    var apiRoot = jbWidget.apiRoot;
    dropCv.dzAddedFile = function(file) {
        if (jbWidget._DEBUG)
            console.log(file);
    };

    dropCv.dzError = function(file, error) {
        if (jbWidget._DEBUG) {
            console.log(error);
            console.log(file);
        }
        var $file = angular.element(file.previewElement);
        $file.find('.dz-error-message').html(error.message);
    };


    dropCv.dzSuccess = function() {
        console.log(argument);
    };
    dropCv.dropzoneConfig = {
        init: function() {
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

    var init = function(argument) {
        /* body... */
    }
}]);
