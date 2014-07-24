'use strict';

sampleApp.service('BannerService', function($http) {
	
    this.getBannerContent = function() {
    	return $http.get('app/banner.json').then(function(response){return response.data;});
    };   
});

