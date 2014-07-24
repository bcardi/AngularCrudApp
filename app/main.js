'use strict';

var sampleApp = angular.module('AngularRefImpl',[]);

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularResource: '../bower_components/angular-resource/angular-resource',
        uiBootstrapTpls: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        ngGrid: '../bower_components/ng-grid/ng-grid-2.0.11.debug',
        xeditable: '../bower_components/angular-xeditable/dist/js/xeditable',
        lodash: '../bower_components/lodash/dist/lodash',
        angularCrud: '../components/angular-crud/angular-crud',
        resourceService: '../components/angular-crud-elasticsearch/resource-service',
        fisUiRwdServiceBanner: '../components/fis-ui-rwd/js/services/fis.ui.rwd.service.banner',
        fisUiRwdServiceNavigation: '../components/fis-ui-rwd/js/services/fis.ui.rwd.service.navigation',
        fisUiRwdDirectiveBanner: '../components/fis-ui-rwd/js/directives/fis.ui.rwd.directive.banner',
        fisUiRwdDirectiveNavigation: '../components/fis-ui-rwd/js/directives/fis.ui.rwd.directive.navigation',
        fisUiRwdDirectiveDocumentclick: '../components/fis-ui-rwd/js/directives/fis.ui.rwd.directive.documentclick',
        fisUiRwdDirectiveWorkspaceResize: '../components/fis-ui-rwd/js/directives/fis.ui.rwd.directive.workspace.resize'
    },
    priority: [
        "angular"
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'angular',
    'app'
], function(angular, app, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app['crudApp']]);
    });
});

/*
 https://github.com/tnajdek/angular-requirejs-seed/blob/master/app/js/main.js
 http://marcoslin.github.io/angularAMD/#/home
 <script data-main="app/main" src="node_modules/requirejs/require.js"></script>
 */