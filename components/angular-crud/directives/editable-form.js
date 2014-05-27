///<reference path='references.ts' />
/**
* Created by Bob on 5/15/2014.
*/
/**
* @area api
* @module angularCrud
* @ngdoc directive
* @name crudEditableForm
* @restrict E
* @param {string} form-id Form ID.
* @param {expression} crud-show-editable If the expression is truthy, then the form will show in edit mode by default.
* @param {expression} readonly If the expression is truthy, then the form will display in read only mode and the user will not be allowed to make changes.
* @description
* FIS extension of the x-editable form. Provides standard layout and actions.
*/
angular.module('angularCrud').directive('crudEditableForm', function () {
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
            var toggleEditableForm = function (value) {
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
            };
            scope.$watch(scope.fisShowEditable, function (value) {
                if (value) {
                    toggleEditableForm(value);
                }
            }, true);
        }
    };
});
//# sourceMappingURL=editable-form.js.map
