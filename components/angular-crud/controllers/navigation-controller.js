///<reference path='references.ts' />
/**
* Created by Bob on 5/13/2014.
*/
var NavigationController = (function () {
    function NavigationController($location) {
        this.$location = $location;
    }
    NavigationController.prototype.isActive = function (viewLocation) {
        return viewLocation === this.$location.path();
    };
    return NavigationController;
})();

angular.module('angularCrud').controller('NavigationController', ['$location', function ($location) {
        return new NavigationController($location);
    }]);
//# sourceMappingURL=navigation-controller.js.map
