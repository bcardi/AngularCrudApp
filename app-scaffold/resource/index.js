///<reference path='../components/angular-crud/angular-crud.d.ts' />
///<reference path='../components/angular-crud-elasticsearch/resource-service.d.ts' />
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
angular.module('angularApplicationModuleName', ['ngResource']);
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Bob on 7/15/2014.
*/
var ResourceNameSingularResourceService = (function (_super) {
    __extends(ResourceNameSingularResourceService, _super);
    function ResourceNameSingularResourceService() {
        _super.apply(this, arguments);
    }
    return ResourceNameSingularResourceService;
})(ResourceService);

angular.module('angularApplicationModuleName').factory('ResourceNameSingularResourceService', ['$resource', function ($resource) {
        return new ResourceNameSingularResourceService($resource);
    }]);
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var ResourceNameSingularListController = (function (_super) {
    __extends(ResourceNameSingularListController, _super);
    function ResourceNameSingularListController() {
        _super.apply(this, arguments);
    }
    return ResourceNameSingularListController;
})(BaseListController);

angular.module('angularApplicationModuleName').controller('ResourceNameSingularListController', [
    '$injector', 'ResourceNameSingularResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularListController($injector, {
            resourceName: "resource-name-plural",
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

angular.module('angularApplicationModuleName').controller('ResourceNameSingularNewController', [
    '$injector', 'ResourceNameSingularResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularNewController($injector, {
            resourceName: "resource-name-plural",
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
var ResourceNameSingularEditController = (function (_super) {
    __extends(ResourceNameSingularEditController, _super);
    function ResourceNameSingularEditController() {
        _super.apply(this, arguments);
    }
    ResourceNameSingularEditController.prototype.init = function () {
        /* Todo: Define default metadata
        Todo: Edit detail-metadata.json
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
        }
        */
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

angular.module('angularApplicationModuleName').controller('ResourceNameSingularEditController', [
    '$injector', 'ResourceNameSingularResourceService', 'MetadataService',
    function ($injector, ResourceService, MetadataService) {
        return new ResourceNameSingularEditController($injector, {
            resourceName: "resource-name-plural",
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
//# sourceMappingURL=index.js.map
