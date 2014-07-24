'use strict';

sampleApp.service('BannerService', function($http) {
	
    this.getBannerContent = function() {
    	return $http.post('Rest/banner').then(function(response){return response.data;});
    };   
});

