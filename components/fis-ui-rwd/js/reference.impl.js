
	var sampleApp = angular.module('AngularRefImpl', ['ngRoute']);

	sampleApp.config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider.
	      when('/Home', {
		        templateUrl: 'partials/home.html',
		        controller: 'HomeController'
		     }).
	      when('/Accounts', {
		        templateUrl: 'partials/accounts.html',
			    controller: 'AccountsController'
		     }).
	      when('/Offers', {
		        templateUrl: 'partials/offers.html',
			    controller: 'OffersController'
		     }).
	      when('/Transfer1', {
		        templateUrl: 'partials/workspace.html',
			    controller: 'WorkspaceController',
			    workspaceTitle: 'Transfer 1'
		     }).
	      when('/Transfer2', {
		        templateUrl: 'partials/workspace.html',
			    controller: 'WorkspaceController',
			    workspaceTitle: 'Transfer 2'
		     }).
	      when('/PayBills1', {
		        templateUrl: 'partials/workspace.html',
			    controller: 'WorkspaceController',
			    workspaceTitle: 'Pay Bills 1'
		     }).
	      when('/PayBills2', {
		        templateUrl: 'partials/workspace.html',
			    controller: 'WorkspaceController',
			    workspaceTitle: 'Pay Bills 2'
		     }).
		  when('/AccordionEx', {
		 		templateUrl : 'partials/accordionCtrl.html',
				controller : 'AccordionController'
			}).
		  when('/ResponsiveGrid', {
		 		templateUrl : 'partials/responsiveGrid.html',
				controller1 : 'ResponsiveGrid'
			}).
	      otherwise({
		        templateUrl: 'partials/home.html',
		        controller: 'HomeController'
	      });
	  }]);

	// Controllers
	sampleApp.controller('HomeController', function($scope, $http, SideNavData) {

		$http.post('Rest/home')
			.then(function(res) {
			$scope.home = res.data;
			
			// Close the Side Nav
			$scope.sideNavData = SideNavData;
			$scope.sideNavData.close();
		});
	});
	sampleApp.controller('AccountsController', function($scope, $http, SideNavData) {

		$http.post('Rest/accounts')
			.then(function(res) {
			$scope.accounts = res.data;
			
			// Close the Side Nav
			$scope.sideNavData = SideNavData;
			$scope.sideNavData.close();
		});
	});
	sampleApp.controller('OffersController', function($scope, $http, SideNavData) {

		$http.post('Rest/offers')
			.then(function(res) {
			$scope.offers = res.data;
			
			// Close the Side Nav
			$scope.sideNavData = SideNavData;
			$scope.sideNavData.close();
		});
	});
	sampleApp.controller('WorkspaceController', function($scope, $route, SideNavData) {

		$scope.workspaceTitle = $route.current.workspaceTitle;
		
		// Close the Side Nav
		$scope.sideNavData = SideNavData;
		$scope.sideNavData.close();
	});

	sampleApp.controller('AccordionController', function($scope, $http, SideNavData) {
		$http.post('Rest/accordion').then(function(res) {
			$scope.accountsArr = res.data.accountsData;
			
			// Close the Side Nav
			$scope.sideNavData = SideNavData;
			$scope.sideNavData.close();
		});
		$scope.percentPrecision = 5;
	});
	
