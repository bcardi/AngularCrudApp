///<reference path='index.ts' />
///<reference path='references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */
var app = angular.module('docsApp', ['ui.bootstrap', 'ngRoute']);

app.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'docs/content/api/angularCrud/index.html'
            })
            .when('/api/angularCrud', {
                redirectTo: '/'
            })
            .otherwise({
                templateUrl: function() {
                    var templateUrl = location.hash.substring(2) + ".html";
                    templateUrl = 'docs/content/' + templateUrl;
                    return templateUrl;
                }
            })
        ;
    }]);

app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.href.indexOf('api/') === 0 ) {
                //alert("hello");
                elem[0].href = '#/' + attrs.href;
            }
        }
    };
});

class DocsController {

    private context;

    constructor(context) {
        "use strict";
        //super(context);
        this.context = context;
    }
}

app.controller('docsController', ['$routeParams', '$location', '$scope',
        ($routeParams, $location, $scope) => new DocsController(
            {
                $routeParams: $routeParams,
                $location: $location,
                $scope: $scope
            }
        )]);
