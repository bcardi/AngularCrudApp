'use strict';

/* Directive */

sampleApp.directive('fisUiRwdDocumentClick', ['$document', '$parse',
	function($document, $parse) {
		var linkFunction = function($scope, $element, $attributes) {
			var expr = $attributes.fisUiRwdDocumentClick;
			var invoker = $parse(expr);
			$document.on(
					'click',
					function(event) {
						$scope.$apply(
								function(){
									invoker($scope, {$event: event});
								});
					});
		};
		return (linkFunction);
	}]);
sampleApp.controller(
	'ClickController', ['$scope', 'SideNavData',
	function($scope, SideNavData){
		$scope.sideNavData = SideNavData;
		$scope.handleClick = function(event) {
			if(event.target.className != 'navbar-toggle') {
				// Note: this action does not include clicks on the menu;
				// Menu items should close the menu themselves as needed
				if($scope.sideNavData.open && $('.navbar').has(event.target).length===0) {
					// Close the off-canvas menu
					$scope.sideNavData.open = false;
				}
			}
		};
	}]);
