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
    function BaseController(context) {
        "use strict";
        this.context = context;

        //this.resourceName = params.resourceName;
        //this.formTag = params.formTag;
        //this.$routeParams = $routeParams;
        //this.$location = $location;
        //this.service = ResourceService;
        //this.metadataService = MetadataService;
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
        this.context.$location.path(newPath);
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
        this.getList();
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
//# sourceMappingURL=base-controller.js.map
