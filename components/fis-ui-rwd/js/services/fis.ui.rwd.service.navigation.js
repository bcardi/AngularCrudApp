'use strict';

sampleApp.service('NavigationService', function($http) {
	
    this.getNavigationContent = function() {
    	return $http.get('app/navigation.json').then(function(response){return response.data;});
    };
 
    
});

// Shared data service for the navigation control
sampleApp.factory('SideNavData', function() {
	var data = {};
	data.width = '100px';
	data.open = false;
	data.close = function() {
		this.open = false;
	};
	data.toggle = function() {
		this.open = this.open? false: true;
	}
	
	return data;
});