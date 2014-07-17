///<reference path='index.ts' />
///<reference path='references.ts' />

/*
 Todo: Set all @@ values
 */

var app = angular.module('angularApplicationName',['ui.bootstrap', 'xeditable', 'ngRoute', 'ngGrid', 'angularCrud', 'app.@@ResourceNamePlural@@'])
    .config(["$routeProvider", "$locationProvider",
        function ($routeProvider, $locationProvider) {

            //commenting out this line (switching to hashbang mode) breaks the app
            //-- unless # is added to the templates
            //$locationProvider.html5Mode(true);

            $routeProvider
                .when('/@@resource-name-plural@@/new', {
                    templateUrl: 'app/@@resource-name-plural@@/detail.html',
                    controller: '@@ResourceNameSingular@@NewController',
                    controllerAs: "dc"
                })
                .when('/@@resource-name-plural@@/:id', {
                    templateUrl: 'app/@@resource-name-plural@@/detail.html',
                    controller: '@@ResourceNameSingular@@EditController',
                    controllerAs: "dc"
                })
                .when('/@@resource-name-plural@@', {
                    templateUrl: 'app/@@resource-name-plural@@/list.html',
                    controller: '@@ResourceNameSingular@@ListController',
                    controllerAs: "dc"
                })
                .when('/', {
                    templateUrl: 'app/home.html'
                })
        }]);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});