///<reference path='references.ts' />
/**
 * Created by Bob on 5/5/2014.
 */
angular.module('angularCrud')
    .directive('fisShowEditableForm', ['$timeout', function ($timeout) {
        "use strict";
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.fisShowEditableForm, function (value, element) {
                    if (angular.isDefined(value) && value) {
                        var editableForm = scope.$eval(attrs.crudEditableForm);
                        editableForm.$show();
                    } else {
                        editableForm.$cancel();
                    }
                }, true);
            }
        };
    }]);