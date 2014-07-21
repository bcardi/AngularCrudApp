///<reference path='../references.ts' />
/**
 * Created by Bob on 5/5/2014.
 */
angular.module('angularCrud')
    .directive('crudShowEditableForm', ['$timeout', function ($timeout) {
        "use strict";
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.crudShowEditableForm, function (value, element) {
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