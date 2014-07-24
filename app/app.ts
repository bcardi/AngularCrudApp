///<reference path='index.ts' />
///<reference path='references.ts' />

/**
 * Created by e1009811 on 5/1/2014.
 */

var app = angular.module('crudApp',['ui.bootstrap', 'xeditable', 'ngRoute', 'ngGrid', 'angularCrud', 'app.workRequests', 'AngularRefImpl'])
    .config(["$routeProvider", "$locationProvider",
        function ($routeProvider, $locationProvider) {

            //commenting out this line (switching to hashbang mode) breaks the app
            //-- unless # is added to the templates
            //$locationProvider.html5Mode(true);

            $routeProvider
                .when('/work-requests/new', {
                    templateUrl: 'app/work-requests/detail.html',
                    controller: 'WorkRequestsNewController',
                    controllerAs: "dc"
                })
                .when('/work-requests/:id', {
                    templateUrl: 'app/work-requests/detail.html',
                    controller: 'WorkRequestsEditController',
                    controllerAs: "dc"
                })
                .when('/work-requests', {
                    templateUrl: 'app/work-requests/list.html',
                    controller: 'WorkRequestsListController',
                    controllerAs: "dc"
                })
                .when('/docs', {
                    templateUrl: 'api/angularCrud/index.html'
                })
                .when('/api', {
                    templateUrl: 'api/angularCrud/index.html'
                })
                .when('/', {
                    templateUrl: 'app/home.html'
                })
        }]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});