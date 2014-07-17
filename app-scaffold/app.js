///<reference path='../components/angular-crud/angular-crud.d.ts' />
///<reference path='../components/angular-crud/resource-service.d.ts' />
///<reference path='../references.ts' />
/*
Todo: Set all @@ values
*/
angular.module('app.@@ResourceName@@', ['ngResource']);
/*
Todo: Change name of this class
Todo: Define default metadata
Todo: Edit list-metadata.json
Todo: Set all @@ values
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResourceNameSingularResourceService = (function (_super) {
    __extends(ResourceNameSingularResourceService, _super);
    function ResourceNameSingularResourceService() {
        _super.apply(this, arguments);
    }
    return ResourceNameSingularResourceService;
})(ResourceService);

angular.module('app.@@ResourceNamePlural@@').factory('@@ResourceNameSingular@@ResourceService', ['$resource', function ($resource) {
        return new ResourceNameSingularResourceService($resource);
    }]);
///<reference path='../references.ts' />
/*
Todo: Change name of this class
Todo: Define default metadata
Todo: Edit list-metadata.json
Todo: Set all @@ values
*/
var ResourceNameSingularListController = (function (_super) {
    __extends(ResourceNameSingularListController, _super);
    function ResourceNameSingularListController() {
        _super.apply(this, arguments);
    }
    return ResourceNameSingularListController;
})(BaseListController);

angular.module('app.@@ResourceNamePlural@@').controller('@@ResourceNameSingular@@ListController', [
    '$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularListController($injector, {
            resourceName: "@@resource-name-plural@@",
            formTag: "list",
            ngRefs: [],
            resourceService: ResourceService,
            metadataService: MetadataService
        });
    }]);
///<reference path='../references.ts' />
/*
Todo: Change name of this class
Todo: Define default metadata
Todo: Edit list-metadata.json
Todo: Set all @@ values
*/
var ResourceNameSingularNewController = (function (_super) {
    __extends(ResourceNameSingularNewController, _super);
    function ResourceNameSingularNewController($injector, context) {
        "use strict";
        _super.call(this, $injector, context);
        this.viewModel.tabStatus = "";
        this.viewModel.isReadonly = false;
    }
    ResourceNameSingularNewController.prototype.createItem = function (item) {
        "use strict";
        _super.prototype.createItem.call(this, item);
    };
    return ResourceNameSingularNewController;
})(BaseNewController);

angular.module('app.@@ResourceNamePlural@@').controller('@@ResourceNameSingular@@NewController', [
    '$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularNewController($injector, {
            resourceName: "@@resource-name-plural@@",
            formTag: "detail",
            ngRefs: [],
            resourceService: ResourceService,
            metadataService: MetadataService
        });
    }]);
///<reference path='../references.ts' />
/*
Todo: Change name of this class
Todo: Define default metadata
Todo: Edit detail-metadata.json
Todo: Set all @@ values
*/
var ResourceNameSingularEditController = (function (_super) {
    __extends(ResourceNameSingularEditController, _super);
    function ResourceNameSingularEditController() {
        _super.apply(this, arguments);
    }
    ResourceNameSingularEditController.prototype.init = function () {
        /* @@Default metadata@@ */
        this.metadataBase = {
            "form": {
                "tabs": {},
                "sections": {}
            }
        };
        _super.prototype.init.call(this);
    };

    ResourceNameSingularEditController.prototype.onGetItemSuccess = function (result) {
        "use strict";
        _super.prototype.onGetItemSuccess.call(this, result);
        this.showEditable = !this.viewModel.isReadonly;
        this.isReadonly = this.viewModel.isReadonly;
    };

    ResourceNameSingularEditController.prototype.validateForm = function (thisForm) {
        "use strict";
        return _super.prototype.validateForm.call(this, thisForm);
    };

    ResourceNameSingularEditController.prototype.updateItem = function (item) {
        "use strict";

        /***** Special processing for couchdb sample app *****/
        item.metadata.form.tabs.functionality.isDisabled = false;

        /***** Special processing for couchdb sample app *****/
        _super.prototype.updateItem.call(this, item);
    };
    return ResourceNameSingularEditController;
})(BaseEditController);

angular.module('app.@@ResourceNamePlural@@').controller('@@ResourceNameSingular@@EditController', [
    '$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularEditController($injector, {
            resourceName: "@@resource-name-plural@@",
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
///<reference path='resource/index.ts' />
///<reference path='index.ts' />
///<reference path='references.ts' />
/*
Todo: Set all @@ values
*/
var app = angular.module('angularApplicationName', ['ui.bootstrap', 'xeditable', 'ngRoute', 'ngGrid', 'angularCrud', 'app.@@ResourceNamePlural@@']).config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        //commenting out this line (switching to hashbang mode) breaks the app
        //-- unless # is added to the templates
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/@@resource-name-plural@@/new', {
            templateUrl: 'app/@@resource-name-plural@@/detail.html',
            controller: '@@ResourceNameSingular@@NewController',
            controllerAs: "dc"
        }).when('/@@resource-name-plural@@/:id', {
            templateUrl: 'app/@@resource-name-plural@@/detail.html',
            controller: '@@ResourceNameSingular@@EditController',
            controllerAs: "dc"
        }).when('/@@resource-name-plural@@', {
            templateUrl: 'app/@@resource-name-plural@@/list.html',
            controller: '@@ResourceNameSingular@@ListController',
            controllerAs: "dc"
        }).when('/', {
            templateUrl: 'app/home.html'
        });
    }]);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
//# sourceMappingURL=app.js.map
