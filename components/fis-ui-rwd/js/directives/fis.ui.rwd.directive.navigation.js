'use strict';

/* Directive */

sampleApp.directive('fisUiRwdNavbar', ['NavigationService', 'SideNavData', 
                                                   function(NavigationService, SideNavData) {
	return {
		restrict: 'AE',
		replace : 'true',
		scope : {},
		templateUrl : 'partials/navigation.html',
		controller : [ '$scope', '$location', '$http', function($scope, $location, $http) {

			//$scope.navbar = {"links": [{ "name": "Home", "href": "Home", "isActive": true, "linkType": "image", "class": "imageClass", "src": "images/Home_white.png"}, { "name": "Accounts", "href": "Accounts", "linkType": "link"},{ "name": "Transfers", "linkType": "menu", menuItems: [{"name": "Transfer 1", "href": "Transfer1"},{"name": "Transfer 2", "href": "Transfer2"}]},{ "name": "Offers", "href": "Offers", "linkType": "link"},{ "name": "Accordion", "href": "AccordionEx", "linkType": "link"},{ "name": "Responsive Grid", "href": "ResponsiveGrid", "linkType": "link"}]};
			NavigationService.getNavigationContent().then(function(navbar) {
				$scope.navbar = navbar;
			});
			
			$scope.menuCollapsed = true;	// Start in collapsed state
		    $scope.navClass = function (link) {

		    	var rc = '';
		        var currentRoute = $location.path().substring(1) || 'Home';

		        
		        /* Compare for top nav link */
		        if (link.href === currentRoute) 
		        {
		        	rc = 'active';
		        }
		        	
		        /* Compare for top nav menu  */
		        if (link.linkType === 'responsiveLink')
		        {
		        	rc += ' bannerID'; 
	        	}


		        /* Compare for top nav menu  */
		        if (link.linkType === 'menu' || link.linkType === 'responsiveMenu')
		        {
		        	$.each(link.menuItems, function(i, menuItem){
				        if (menuItem.href === currentRoute) 
				        	rc = 'active'; 
		             });		        	
	        	}

		        /* Compare for top nav menu  */
		        if (link.linkType === 'responsiveMenu')
		        {
		        	rc += ' bannerID'; 
	        	}

		        return rc;

		    }; 
		    
			// Data for side nav
			$scope.sideNavData = SideNavData;
			// Side nav control functions
		    $scope.menuOpen = function() {
		    	return $scope.sideNavData.open? 'menu-out': 'menu-in';
		    };
		    $scope.collapsedClass = function() {
		    	return $scope.sideNavData.open? '': 'collapse';
		    };
		    
		    $scope.toggleNavigation = function() {
				// Toggle the navigation class 
		    	return $scope.sideNavData.open? 'navigation-out': 'navigation-in';
		    }
			

		    
		} ]
	};
}]);

