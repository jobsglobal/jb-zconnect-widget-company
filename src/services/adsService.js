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
