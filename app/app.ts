///<reference path='index.ts' />
///<reference path='references.ts' />

/**
 * Created by e1009811 on 5/1/2014.
 */

var app = angular.module('todoApp',['ui.bootstrap', 'xeditable', 'ngRoute', 'ngGrid', 'angularCrud', 'app.workRequests'])
    .config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when('/todos/new', {
                    templateUrl: 'app/todos/detail.html',
                    controller: 'TodoNewController',
                    controllerAs: "dc"
                })
                .when('/todos/:id', {
                    templateUrl: 'app/todos/detail.html',
                    controller: 'TodoShowController',
                    controllerAs: "dc"
                })
                .when('/todos', {
                    templateUrl: 'app/todos/list.html',
                    controller: 'TodoListController',
                    controllerAs: "dc"
                })
                .when('/work-requests/new', {
                    templateUrl: 'app/work-requests/detail.html',
                    controller: 'WorkRequestNewController',
                    controllerAs: "dc"
                })
                .when('/work-requests/:id', {
                    templateUrl: 'app/work-requests/detail.html',
                    controller: 'WorkRequestEditController',
                    controllerAs: "dc"
                })
                .when('/work-requests', {
                    templateUrl: 'app/work-requests/list.html',
                    controller: 'WorkRequestListController',
                    controllerAs: "dc"
                })
                .when('/', {
                    templateUrl: 'app/home.html'
                })
        }]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});