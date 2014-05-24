///<reference path='references.ts' />
/**
 * Created by Bob on 5/15/2014.
 */
angular.module('angularCrud')
    .directive('fisEditableForm', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/angular-crud/directives/editable-form.html',
            scope: {
                fisShowEditable: '&',
                fisId: '@'
            },
            link: function (scope, element, attrs) {
                if (scope.fisId && scope.fisId != 'thisForm') {
                    scope.thisForm = scope[scope.fisId];
                }
                var toggleEditableForm = function(value) {
                    "use strict";
                    var formId = scope.fisId || 'thisForm';
                    var editableForm = scope[formId];
                    if (editableForm) {
                        if (angular.isDefined(value) && value) {
                            editableForm.$show();
                        } else {
                            editableForm.$cancel();
                        }
                    }
                }
                scope.$watch(scope.fisShowEditable, function (value) {
                    if (value) {
                        toggleEditableForm(value);
                    }
                }, true);
            }
        };
    });
