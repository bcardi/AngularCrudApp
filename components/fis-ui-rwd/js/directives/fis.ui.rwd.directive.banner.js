'use strict';

/* Banner directive */

sampleApp.directive('fisUiRwdBanner', ['BannerService', 'SideNavData',
                                       function(BannerService, SideNavData) {
	return {
		restrict : 'AE',
		replace : 'true',
		scope : {},
		templateUrl : 'components/fis-ui-rwd/partials/banner.html',
		link: function(scope, elem, attrs) {
			elem.bind('click', function() {
			});
		},
		controller : [ '$scope', function($scope) {

			BannerService.getBannerContent().then(function(banner) {
				$scope.banner = banner;
			});

			
			$scope.bannerProductNameClass = function() {
				
				var classValue = "banner-product-name";
				
				if ($scope.banner.fi_image) {
					classValue += ' banner-product-name-border';
				}
				
				return classValue;
			};
			
			
			$scope.bannerListItemClass = function(last, link) {
				var classValue = "";
				
				if (!last) {
					classValue = 'banner-list-item';
				}
				else {
					classValue = 'banner-list-item-last';
				}
				
				if (link.linkType === "responsiveLink" || link.linkType === "responsiveMenu") classValue += " responsiveBannerItem";

				if (link.linkType === "menu" || link.linkType === "responsiveMenu") classValue += " dropdown";
				

				return classValue;
			};

			$scope.bannerLinkOnClick = function(link) {
				var expre = link.action;
				var tmpFunc = new Function(expre);
				tmpFunc();
			};
			
			$scope.bannerMenuItemsOnClick = function(menuItem) {
				var expre = menuItem.action;
				var tmpFunc = new Function(expre);
				tmpFunc();
			};
			
			$scope.sideNavData = SideNavData;
			$scope.onHamburger = function() {
				// Toggle the state
				$scope.sideNavData.toggle();
			};
			
			// Adjust the banner class for min-width
			$scope.adjustMinWidth = function() {
				return $scope.sideNavData.open? "banner-adjust-min-width": "";
			};
		}]
	};
}]);