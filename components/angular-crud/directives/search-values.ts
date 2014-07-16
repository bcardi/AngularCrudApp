/**
 * Created by Bob on 7/14/2014.
 */
angular.module('angularCrud')
    .directive('crudSearchValues', [function () {
        "use strict";
        return {
            restrict: 'E',
            template: '{{searchText}}',
            scope: {searchModel: '='},
            link: function (scope, element, attrs) {
                scope.$watch('searchModel', function (searchModel) {
                    if (searchModel) {
                        scope.searchText = "";
                        var delim = "(";
                        for (var prop in searchModel) {
                            if (searchModel[prop]) {
                                var label = $("label[for='"+prop+"']").text() || prop;
                                scope.searchText += delim + label + ":" + searchModel[prop];
                                delim = ", "
                            }
                        }
                        if (scope.searchText) {
                            scope.searchText += ")";
                        }
                    }
                }, true);
            }
        };
    }]);