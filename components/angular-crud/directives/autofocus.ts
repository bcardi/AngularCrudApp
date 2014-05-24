///<reference path='references.ts' />
/**
 * Created by Bob on 5/5/2014.
 */
angular.module('angularCrud')
    .directive('fisAutofocus', ['$timeout', function ($timeout) {
        "use strict";
        /* hello world from milwaukee */
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.fisAutofocus, function (value) {
                    if (angular.isDefined(value) && value) {
                        element[0].focus();
                        element[0].select();
                    }
                }, true);
            }
        };
    }]);