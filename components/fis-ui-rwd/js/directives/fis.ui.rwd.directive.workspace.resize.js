'use strict';

/* Directive */

sampleApp.directive('resizable', function($window, $timeout) {
	return function($scope) {

		// On window resize => resize the app
		$scope.calculateWorkspaceHeight = function() {
			var win = angular.element($window)
			$scope.workspaceHeight = (win.height() - $(".workspace").offset().top) + "px";
		};

		angular.element($window).bind('resize', function() {
			$scope.calculateWorkspaceHeight();
			$scope.$apply();
		});
		
		// Trigger an initial resize
		$timeout(function () { $scope.calculateWorkspaceHeight();}, 100);
	};
});
