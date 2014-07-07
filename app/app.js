///<reference path='typings/angularjs/angular.d.ts' />
///<reference path='references.ts' />
/**
* Created by Bob on 5/23/2014.
*/
/**
* @ngdoc module
* @name angularCrud
* @description
*
* # angularCrud (core module)
* The angularCrud module ????
*
* <div doc-module-components="angularCrud"></div>
*/
angular.module('angularCrud', ['ngResource']);
/**
* Created by Bob on 5/17/2014.
*/
var filters = angular.module('angularCrud', []);

filters.filter('booleanAsYesNo', function () {
    return function (input) {
        return input ? 'Yes' : 'No';
    };
});
///<reference path='filters.ts' />
///<reference path='../typings/angularjs/angular.d.ts' />
///<reference path='references.ts' />
/**
* Created by Bob on 5/5/2014.
*/
/**
* @area api
* @module angularCrud
* @ngdoc directive
* @name crudAutofocus
* @element input
* @restrict A
* @param {expression} crudAutofocus If the expression is truthy, then the control will gain focus when the view is ready.
* @description
* Helper directive to place focus on the first form field. If multiple fields are marked with this attribute, then focus
* will be placed on the first field.
*/
angular.module('angularCrud').directive('crudAutofocus', [
    '$timeout', function ($timeout) {
        "use strict";

        /* hello world from milwaukee */
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.crudAutofocus, function (value) {
                    if (angular.isDefined(value) && value) {
                        element[0].focus();
                        element[0].select();
                    }
                }, true);
            }
        };
    }]);
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
* Extends the x-editable form. Provides standard layout and actions.
*/
angular.module('angularCrud').directive('crudEditableForm', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'components/angular-crud/directives/editable-form.html',
        scope: {
            crudShowEditable: '&',
            formId: '@'
        },
        link: function (scope, element, attrs) {
            if (scope.formId && scope.formId != 'thisForm') {
                scope.thisForm = scope[scope.formId];
            }
            var toggleEditableForm = function (value) {
                "use strict";
                var formId = scope.formId || 'thisForm';
                var editableForm = scope[formId];
                if (editableForm) {
                    if (angular.isDefined(value) && value) {
                        editableForm.$show();
                    } else {
                        editableForm.$cancel();
                    }
                }
            };
            scope.$watch(scope.crudShowEditable, function (value) {
                if (value) {
                    toggleEditableForm(value);
                }
            }, true);
        }
    };
});
///<reference path='references.ts' />
/**
* Created by Bob on 5/5/2014.
*/
angular.module('angularCrud').directive('crudShowEditableForm', [
    '$timeout', function ($timeout) {
        "use strict";
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.crudShowEditableForm, function (value, element) {
                    if (angular.isDefined(value) && value) {
                        var editableForm = scope.$eval(attrs.crudEditableForm);
                        editableForm.$show();
                    } else {
                        editableForm.$cancel();
                    }
                }, true);
            }
        };
    }]);
///<reference path='autofocus.ts' />
///<reference path='editable-form.ts' />
///<reference path='show-editable-form.ts' />
///<reference path='../typings/angularjs/angular.d.ts' />
///<reference path='i-metadata-service.ts' />
///<reference path='references.ts' />
/**
* Created by Bob on 5/4/2014.
*/
var MetadataService = (function () {
    function MetadataService($resource) {
        "use strict";
        this.resource = $resource('app/:resourceName/:formTag-metadata.json', {}, {});
    }
    MetadataService.prototype.get = function (params) {
        "use strict";
        return this.resource.get({ resourceName: params.resourceName, formTag: params.formTag }).$promise;
    };
    return MetadataService;
})();

angular.module('angularCrud').factory('MetadataService', ['$resource', function ($resource) {
        return new MetadataService($resource);
    }]);
///<reference path='metadata-service-file.ts' />
///<reference path='../typings/lodash/lodash.d.ts' />
///<reference path='references.ts' />
/**
* Created by Bob on 5/5/2014.
*/
/**
* @area api
* @module angularCrud
* @ngdoc type
* @name BaseController
* @param {object} context ????.
* @description
* ????
*/
var BaseController = (function () {
    function BaseController($injector, context) {
        "use strict";
        var _this = this;

        this.context = context;

        // Load required angular references
        var ngRefs = _.union(['$location', '$routeParams'], this.context.ngRefs);
        this.ng = {};
        for (var i = 0, len = ngRefs.length; i < len; i++) {
            _this.ng[ngRefs[i]] = $injector.get(ngRefs[i]);
        }

        this.resetFocus = true;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.viewModel = {};
        this.metadataBase = { "form": { "tabs": {}, "sections": {} } };
        this.metadata = {};
        this.refreshMetadata({});
        this.init();
    }
    BaseController.addNgRef = function (context, item) {
        if (!context.ngRefs) {
            context.ngRefs = [];
        }
        context.ngRefs.push(item);
    };

    BaseController.prototype.init = function () {
        "use strict";
        this.getFormMetadata();
    };

    BaseController.prototype.getFormMetadata = function () {
        var _this = this;
        "use strict";
        this.context.metadataService.get({ resourceName: this.context.resourceName, formTag: this.context.formTag }).then(function (result) {
            return _this.onGetFormMetadataSuccess(result);
        }).catch(function (result) {
            return _this.onGetFormMetadataError(result);
        });
    };

    BaseController.prototype.onGetFormMetadataSuccess = function (result) {
        "use strict";
        console.log('onGetFormMetadataSuccess');
        this.metadataBase = { "form": { "tabs": {}, "sections": {} } };
        _.merge(this.metadataBase, result);
        this.metadata = {};
        this.refreshMetadata({});
        this.getData();
    };

    BaseController.prototype.isTrue = function (value, defaultValue) {
        "use strict";
        return (value == undefined) ? defaultValue : value;
    };

    BaseController.prototype.collapseAll = function () {
        "use strict";
        var _this = this;
        Object.keys(this.metadata.form.sections).forEach(function (sectionKey) {
            var section = _this.metadata.form.sections[sectionKey];
            section.isOpen = false;
        });
    };

    BaseController.prototype.expandAll = function () {
        "use strict";
        var _this = this;
        Object.keys(this.metadata.form.sections).forEach(function (sectionKey) {
            var section = _this.metadata.form.sections[sectionKey];
            section.isOpen = true;
        });
    };

    BaseController.prototype.onGetFormMetadataError = function (result) {
        "use strict";
        console.log('onGetFormMetadataError');
        this.getData();
    };

    BaseController.prototype.getData = function () {
        "use strict";
    };

    /*
    getChoiceGroups(){
    "use strict";
    this.context.resourceService
    .getList({resourceName: 'choice-groups'})
    .then((result) => this.onGetChoiceGroupsSuccess(result))
    .catch((result) => this.onGetChoiceGroupsError(result));
    }
    
    onGetChoiceGroupsSuccess(result) {
    "use strict";
    this.choiceGroups = {};
    for(var i=0,len=result.length;i<len;i++){
    this.choiceGroups[result[i].key] = result[i].value;
    }
    }
    
    onGetChoiceGroupsError(result) {
    "use strict";
    this.messages = 'Error'
    }
    */
    BaseController.prototype.getList = function () {
        var _this = this;
        "use strict";
        this.viewModel = [];
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.context.resourceService.getList({ resourceName: this.context.resourceName }).then(function (result) {
            return _this.onGetListSuccess(result);
        }).catch(function (result) {
            return _this.onGetListError(result);
        });
    };

    BaseController.prototype.onGetListSuccess = function (result) {
        "use strict";
        this.messages = 'Success';
        this.viewModel = result;
        this.resetFocus = true;
        this.isModelLoaded = false;
    };

    BaseController.prototype.onGetListError = function (result) {
        "use strict";
        this.messages = 'Error';
    };

    BaseController.prototype.createItem = function (item) {
        var _this = this;
        "use strict";
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.context.resourceService.createItem({ resourceName: this.context.resourceName }, item).then(function (item) {
            return _this.onCreateSuccess(item);
        }).catch(function (item) {
            return _this.onCreateError(item);
        });
    };

    BaseController.prototype.onCreateSuccess = function (result) {
        "use strict";
        this.messages = 'Success';
        this.isModelLoaded = false;
        this.showEditable = true;
        this.isReadonly = false;

        //this.context.$location.path(this.context.resourceName);
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
    };

    BaseController.prototype.onCreateError = function (result) {
        "use strict";
        this.messages = 'Error';
        this.resetFocus = true;
    };

    BaseController.prototype.getItem = function (id) {
        var _this = this;
        "use strict";
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.context.resourceService.getItem({ resourceName: this.context.resourceName, id: id }).then(function (result) {
            return _this.onGetItemSuccess(result);
        }).catch(function (result) {
            return _this.onGetItemError(result);
        });
    };

    BaseController.prototype.onGetItemSuccess = function (result) {
        "use strict";
        this.viewModel = result;
        this.resetFocus = true;
        this.isModelLoaded = true;
        this.showEditable = true;
        this.isReadonly = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
    };

    BaseController.prototype.refreshMetadata = function (metadata) {
        "use strict";
        if (metadata != undefined) {
            this.metadata = {};
            _.merge(this.metadata, this.metadataBase, metadata);
        }
    };

    BaseController.prototype.onGetItemError = function (result) {
        "use strict";
        this.messages = 'Error';
    };

    BaseController.prototype.updateItem = function (item) {
        var _this = this;
        "use strict";
        this.isModelLoaded = false;
        this.context.resourceService.updateItem({ resourceName: this.context.resourceName }, item).then(function (result) {
            return _this.onUpdateItemSuccess(result);
        }).catch(function (result) {
            return _this.onUpdateItemError(result);
        });
    };

    BaseController.prototype.onUpdateItemSuccess = function (result) {
        "use strict";
        this.messages = 'Success';
        this.isModelLoaded = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
        var newPath = this.context.resourceName + "/" + result.id;
        this.ng.$location.path(newPath);
    };

    BaseController.prototype.onUpdateItemError = function (result) {
        "use strict";
        this.messages = 'Error';
    };

    BaseController.prototype.deleteItem = function (item) {
        var _this = this;
        "use strict";
        this.isModelLoaded = false;
        this.context.resourceService.deleteItem({ resourceName: this.context.resourceName }, item).then(function (result) {
            return _this.onDeleteItemSuccess(result);
        }).catch(function (result) {
            return _this.onDeleteItemError(result);
        });
    };

    BaseController.prototype.onDeleteItemSuccess = function (result) {
        "use strict";
        this.messages = 'Success';
        this.isModelLoaded = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
        var removed = _.remove(this.viewModel, function (item) {
            return (item.id === result.id);
        });
    };

    BaseController.prototype.onDeleteItemError = function (result) {
        "use strict";
        this.messages = 'Error';
    };

    BaseController.prototype.doSubmit = function (isValid) {
        "use strict";
    };

    BaseController.prototype.validateForm = function (thisForm) {
        "use strict";
        var haveError = false;
        if (thisForm && thisForm.$error && thisForm.$error.required) {
            for (var i = 0, len = thisForm.$error.required.length; i < len; i++) {
                var requiredItem = thisForm.$error.required[i];
                if (requiredItem.$invalid) {
                    haveError = true;
                    thisForm.$setError(requiredItem.$name, 'Required');
                }
            }
        }
        return thisForm.$invalid ? 'error' : null;
    };
    return BaseController;
})();
///<reference path='references.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('./base-controller');
var BaseDetailController = (function (_super) {
    __extends(BaseDetailController, _super);
    function BaseDetailController($injector, context) {
        "use strict";
        BaseController.addNgRef(context, '$routeParams');
        _super.call(this, $injector, context);
        this.getItem(this.ng.$routeParams.id);
    }
    BaseDetailController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseDetailController;
})(BaseController);
///<reference path='references.ts' />
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('./base-controller');
var BaseEditController = (function (_super) {
    __extends(BaseEditController, _super);
    function BaseEditController($injector, context) {
        "use strict";
        BaseController.addNgRef(context, '$routeParams');
        _super.call(this, $injector, context);
    }
    BaseEditController.prototype.getData = function () {
        "use strict";
        this.getItem(this.ng.$routeParams.id);
    };

    BaseEditController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseEditController;
})(BaseController);
///<reference path='references.ts' />
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('base-controller');
var BaseListController = (function (_super) {
    __extends(BaseListController, _super);
    function BaseListController() {
        _super.apply(this, arguments);
    }
    BaseListController.prototype.getData = function () {
        "use strict";
        this.getList();
    };
    return BaseListController;
})(BaseController);
///<reference path='references.ts' />
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('./base-controller');
var BaseNewController = (function (_super) {
    __extends(BaseNewController, _super);
    function BaseNewController() {
        _super.apply(this, arguments);
    }
    BaseNewController.prototype.init = function () {
        "use strict";
        this.showEditable = true;
        this.isReadonly = false;
        _super.prototype.init.call(this);
    };

    BaseNewController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.createItem(this.viewModel);
    };
    return BaseNewController;
})(BaseController);
///<reference path='references.ts' />
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('./base-controller');
var BaseShowController = (function (_super) {
    __extends(BaseShowController, _super);
    function BaseShowController($injector, context) {
        "use strict";
        BaseController.addNgRef(context, '$routeParams');
        _super.call(this, $injector, context);
    }
    BaseShowController.prototype.getData = function () {
        "use strict";
        this.getItem(this.ng.$routeParams.id);
    };

    BaseShowController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseShowController;
})(BaseController);
///<reference path='references.ts' />
/**
* Created by Bob on 5/13/2014.
*/
var NavigationController = (function () {
    function NavigationController($location) {
        this.$location = $location;
    }
    NavigationController.prototype.isActive = function (viewLocation) {
        return viewLocation === this.$location.path();
    };
    return NavigationController;
})();

angular.module('angularCrud').controller('NavigationController', ['$location', function ($location) {
        return new NavigationController($location);
    }]);
///<reference path='i-controller-context.ts' />
///<reference path='base-controller.ts' />
///<reference path='base-detail-controller.ts' />
///<reference path='base-edit-controller.ts' />
///<reference path='base-list-controller.ts' />
///<reference path='base-new-controller.ts' />
///<reference path='base-show-controller.ts' />
///<reference path='navigation-controller.ts' />
///<reference path='module.ts' />
///<reference path='filters/index.ts' />
///<reference path='directives/index.ts' />
///<reference path='services/index.ts' />
///<reference path='controllers/index.ts' />
///<reference path='references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var ResourceService = (function () {
    function ResourceService($resource, $q) {
        "use strict";
        this.name = "elastic";
        this.type = "nosql";
        this.$q = $q;
        this.resource = $resource('', { protocol: 'http:', server: 'localhost:9200', index: 'angularjs-crud' }, {
            create: {
                url: ':protocol//:server/:index/:resourceName/:docId',
                method: 'POST',
                params: { docId: '@id' }
            },
            update: {
                url: ':protocol//:server/:index/:resourceName/:docId',
                method: 'PUT',
                params: { docId: '@id' },
                transformResponse: function (data) {
                    var response = angular.fromJson(data);
                    console.log(response);
                }
            },
            delete: {
                url: ':protocol//:server/:index/:resourceName/:docId',
                method: 'DELETE',
                params: { docId: '@id' },
                transformResponse: function (data) {
                    var response = angular.fromJson(data);
                    response.id = response._id;
                    return response;
                }
            },
            query: {
                url: ':protocol//:server/:index/:resourceName/_search',
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    var response = angular.fromJson(data);
                    var result = [];
                    for (var i = 0, max = response.hits.total; i < max; i++) {
                        var item = response.hits.hits[i];
                        var source = item._source;
                        source["id"] = item._id;
                        result.push(source);
                    }
                    return result;
                }
            },
            get: {
                url: ':protocol//:server/:index/:resourceName/:docId',
                method: 'GET',
                params: { docId: '@id' },
                transformResponse: function (data) {
                    var response = angular.fromJson(data);
                    var result = response._source;
                    result["id"] = response._id;
                    console.log(result);
                    return result;
                }
            },
            counter: {
                url: ':protocol//:server/:index/counters/:resourceName',
                method: 'PUT',
                params: { resourceName: '@resourceName' }
            }
        });
    }
    ResourceService.prototype.getList = function (params) {
        "use strict";
        return this.resource.query({ resourceName: params.resourceName }).$promise;
    };

    ResourceService.prototype.createItem = function (params, item) {
        "use strict";
        var _this = this;
        if (item.id) {
            return this.resource.create({ resourceName: params.resourceName }, item).$promise;
        } else {
            return this.resource.counter({}, { resourceName: params.resourceName }).$promise.then(function (data) {
                item.id = '' + data._version;
                return _this.resource.create({ resourceName: params.resourceName }, item).$promise;
            });
        }
    };

    ResourceService.prototype.getItem = function (params) {
        "use strict";
        return this.resource.get({ resourceName: params.resourceName }, { id: params.id }).$promise;
    };

    ResourceService.prototype.updateItem = function (params, item) {
        "use strict";
        return this.resource.update({ resourceName: params.resourceName }, item).$promise;
    };

    ResourceService.prototype.deleteItem = function (params, item) {
        "use strict";
        return this.resource.delete({ resourceName: params.resourceName }, item).$promise;
    };
    return ResourceService;
})();

angular.module('angularCrud').factory('ResourceService', ['$resource', '$q', function ($resource, $q) {
        return new ResourceService($resource, $q);
    }]);
/*
Create "_design/api" document in database
curl -X PUT http://127.0.0.1:5984/work-requests
curl -X PUT http://127.0.0.1:5984/work-requests/_design/api --data-binary @mydesign.json
{
"_id": "_design/api",
"lists": {
"all": "function(head, req) { var values = []; while (row = getRow()) { values.push(row.value); } return JSON.stringify(values); }"
},
"shows": {
"detail": "function(doc, req) { var myDoc = JSON.parse(JSON.stringify( doc )); delete myDoc['_revisions']; myDoc.id = myDoc._id; return { 'json': myDoc }; }"
},
"views": {
"default": {
"map": "function (doc){ var myDoc = JSON.parse(JSON.stringify( doc )); myDoc.id = myDoc._id; emit(myDoc._id, myDoc); }"
}
}
}
*/
///<reference path='../components/angular-crud/angular-crud.ts' />
///<reference path='../components/angular-crud/services/resource-service-elasticsearch.ts' />
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
angular.module('app.workRequests', ['ngResource']);
///<reference path='../references.ts' />
/**
* Created by e1009811 on 5/1/2014.
*/
var WorkRequestListController = (function (_super) {
    __extends(WorkRequestListController, _super);
    function WorkRequestListController($injector, context) {
        "use strict";
        _super.call(this, $injector, context);
        this.orderProp = 'id';
    }
    return WorkRequestListController;
})(BaseListController);

angular.module('app.workRequests').controller('WorkRequestListController', [
    '$injector', 'ResourceService', 'MetadataService',
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
    '$injector', 'ResourceService', 'MetadataService',
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
    '$injector', 'ResourceService', 'MetadataService',
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
