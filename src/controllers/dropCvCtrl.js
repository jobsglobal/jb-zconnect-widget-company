'use strict';

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
