///<reference path='../components/angular-crud/angular-crud.d.ts' />
///<reference path='../components/angular-crud-elasticsearch/resource-service.d.ts' />
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
angular.module('app.workRequests', ['ngResource']);
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Bob on 7/15/2014.
*/
var WorkRequestResourceService = (function (_super) {
    __extends(WorkRequestResourceService, _super);
    function WorkRequestResourceService() {
        _super.apply(this, arguments);
    }
    return WorkRequestResourceService;
})(ResourceService);

angular.module('app.workRequests').factory('WorkRequestResourceService', ['$resource', function ($resource) {
        return new WorkRequestResourceService($resource);
    }]);
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var WorkRequestListController = (function (_super) {
    __extends(WorkRequestListController, _super);
    function WorkRequestListController() {
        _super.apply(this, arguments);
    }
    return WorkRequestListController;
})(BaseListController);

angular.module('app.workRequests').controller('WorkRequestListController', [
    '$injector', 'WorkRequestResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new WorkRequestListController($injector, {
            resourceName: "work-requests",
            formTag: "list",
            ngRefs: [],
            resourceService: ResourceService,
            metadataService: MetadataService
        });
    }]);
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var WorkRequestNewController = (function (_super) {
    __extends(WorkRequestNewController, _super);
    function WorkRequestNewController($injector, context) {
        "use strict";
        _super.call(this, $injector, context);
        this.viewModel.requestTypeId = "ADDATM";
        this.viewModel.stateId = "DRAFT";
        this.viewModel.expedited = false;

        //this.viewModel.institution = "";
        //this.viewModel.deviceId = "";;
        //this.viewModel.installDate = "";
        this.viewModel.tabStatus = "";
        this.viewModel.isReadonly = false;
    }
    WorkRequestNewController.prototype.createItem = function (item) {
        "use strict";

        /***** Special processing for couchdb sample app *****/
        if (this.context.resourceService.type === "nosql") {
            item.metadata = {
                "form": {
                    "tabs": {
                        "request": { "isDisabled": false },
                        "location": { "isDisabled": false },
                        "functionality": { "isDisabled": true },
                        "telecom": { "isDisabled": true },
                        "surcharging": { "isDisabled": true },
                        "monitoring": { "isDisabled": true },
                        "contacts": { "isDisabled": true },
                        "comments": { "isDisabled": true },
                        "staging": { "isDisabled": true }
                    }
                }
            };
        }

        /***** Special processing for couchdb sample app *****/
        _super.prototype.createItem.call(this, item);
    };
    return WorkRequestNewController;
})(BaseNewController);

angular.module('app.workRequests').controller('WorkRequestNewController', [
    '$injector', 'WorkRequestResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new WorkRequestNewController($injector, {
            resourceName: "work-requests",
            formTag: "detail",
            ngRefs: [],
            resourceService: ResourceService,
            metadataService: MetadataService
        });
    }]);
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var WorkRequestEditController = (function (_super) {
    __extends(WorkRequestEditController, _super);
    function WorkRequestEditController() {
        _super.apply(this, arguments);
    }
    WorkRequestEditController.prototype.init = function () {
        this.metadataBase = {
            "form": {
                "tabs": {
                    "request": {
                        "isDisabled": false
                    },
                    "location": {
                        "isDisabled": true
                    }
                },
                "sections": {
                    "address": {
                        "isOpen": true
                    },
                    "description": {
                        "isOpen": true
                    }
                }
            }
        };
        _super.prototype.init.call(this);
    };

    WorkRequestEditController.prototype.onGetItemSuccess = function (result) {
        "use strict";
        _super.prototype.onGetItemSuccess.call(this, result);
        this.showEditable = !this.viewModel.isReadonly;
        this.isReadonly = this.viewModel.isReadonly;
    };

    WorkRequestEditController.prototype.validateForm = function (thisForm) {
        "use strict";
        return _super.prototype.validateForm.call(this, thisForm);
    };

    WorkRequestEditController.prototype.updateItem = function (item) {
        "use strict";

        /***** Special processing for couchdb sample app *****/
        item.metadata.form.tabs.functionality.isDisabled = false;

        /***** Special processing for couchdb sample app *****/
        _super.prototype.updateItem.call(this, item);
    };
    return WorkRequestEditController;
})(BaseEditController);

angular.module('app.workRequests').controller('WorkRequestEditController', [
    '$injector', 'WorkRequestResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new WorkRequestEditController($injector, {
            resourceName: "work-requests",
            formTag: "detail",
            ngRefs: [],
            resourceService: ResourceService,
            metadataService: MetadataService
        });
    }]);
///<reference path='module.ts' />
///<reference path='resource-service.ts' />
///<reference path='list-controller.ts' />
///<reference path='new-controller.ts' />
///<reference path='edit-controller.ts' />
///<reference path='work-requests/index.ts' />
///<reference path='index.ts' />
///<reference path='references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var app = angular.module('crudApp', ['ui.bootstrap', 'xeditable', 'ngRoute', 'ngGrid', 'angularCrud', 'app.workRequests']).config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        //commenting out this line (switching to hashbang mode) breaks the app
        //-- unless # is added to the templates
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/todos/new', {
            templateUrl: 'app/todos/detail.html',
            controller: 'TodoNewController',
            controllerAs: "dc"
        }).when('/todos/:id', {
            templateUrl: 'app/todos/detail.html',
            controller: 'TodoShowController',
            controllerAs: "dc"
        }).when('/todos', {
            templateUrl: 'app/todos/list.html',
            controller: 'TodoListController',
            controllerAs: "dc"
        }).when('/work-requests/new', {
            templateUrl: 'app/work-requests/detail.html',
            controller: 'WorkRequestNewController',
            controllerAs: "dc"
        }).when('/work-requests/:id', {
            templateUrl: 'app/work-requests/detail.html',
            controller: 'WorkRequestEditController',
            controllerAs: "dc"
        }).when('/work-requests', {
            templateUrl: 'app/work-requests/list.html',
            controller: 'WorkRequestListController',
            controllerAs: "dc"
        }).when('/docs', {
            templateUrl: 'api/angularCrud/index.html'
        }).when('/api', {
            templateUrl: 'api/angularCrud/index.html'
        }).when('/', {
            templateUrl: 'app/home.html'
        });
    }]);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
//# sourceMappingURL=app.js.map
