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
class BaseController {
    public ng: any;

    public context: IControllerContext;
    public resetFocus: boolean;
    public isModelLoaded: boolean;
    public showEditable: boolean;
    public isReadonly: boolean;
    public viewModel: any;
    public metadataBase: any;
    public metadata: any;
    public messages: string;

    static addNgRef(context, item){
        if (!context.ngRefs){
            context.ngRefs = [];
        }
        context.ngRefs.push(item);
    }

    constructor($injector, context: IControllerContext) {
        "use strict";
        var _this = this;

        this.context = context;

        // Load required angular references
        var ngRefs = _.union(['$location', '$routeParams'], this.context.ngRefs);
        this.ng = {};
        for (var i=0,len=ngRefs.length;i<len;i++){
            _this.ng[ngRefs[i]] = $injector.get(ngRefs[i]);
        }

        this.resetFocus = true;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.viewModel = {};
        this.metadataBase = {"form":{"tabs":{},"sections":{}}};
        this.metadata = {};
        this.refreshMetadata({});
        this.init();
    }

    init(){
        "use strict";
        this.getFormMetadata();
    }

    getFormMetadata(){
        "use strict";
        this.context.metadataService
            .get({resourceName: this.context.resourceName, formTag: this.context.formTag})
            .then((result) => this.onGetFormMetadataSuccess(result))
            .catch((result) => this.onGetFormMetadataError(result));
    }

    onGetFormMetadataSuccess(result) {
        "use strict";
        console.log('onGetFormMetadataSuccess');
        this.metadataBase = {"form":{"tabs":{},"sections":{}}};
        _.merge(this.metadataBase, result);
        this.metadata = {};
        this.refreshMetadata({});
        this.getData();
    }

    isTrue(value, defaultValue){
        "use strict";
        return (value == undefined) ? defaultValue : value;
    }

    collapseAll(){
        "use strict";
        var _this = this;
        Object.keys(this.metadata.form.sections).forEach(function(sectionKey) {
            var section = _this.metadata.form.sections[sectionKey];
            section.isOpen = false;
        });
    }

    expandAll(){
        "use strict";
        var _this = this;
        Object.keys(this.metadata.form.sections).forEach(function(sectionKey) {
            var section = _this.metadata.form.sections[sectionKey];
            section.isOpen = true;
        });
    }

    onGetFormMetadataError(result) {
        "use strict";
        console.log('onGetFormMetadataError');
        this.getData();
    }

    getData(){
        "use strict";
    }
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
    getList() {
        "use strict";
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.context.resourceService
            .getList({resourceName: this.context.resourceName})
            .then((result) => this.onGetListSuccess(result))
            .catch((result) => this.onGetListError(result));
    }

    onGetListSuccess(result) {
        "use strict";
        this.messages = 'Success'
        this.viewModel = result;
        this.resetFocus = true;
        this.isModelLoaded = false;
    }

    onGetListError(result) {
        "use strict";
        this.messages = 'Error'
    }

    createItem(item) {
        "use strict";
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.context.resourceService
            .createItem({resourceName: this.context.resourceName}, item)
            .then((item) => this.onCreateSuccess(item))
            .catch((item) => this.onCreateError(item));
    }

    onCreateSuccess(result) {
        "use strict";
        this.messages = 'Success'
        this.isModelLoaded = false;
        this.showEditable = true;
        this.isReadonly = false;
        //this.context.$location.path(this.context.resourceName);
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
    }

    onCreateError(result) {
        "use strict";
        this.messages = 'Error'
        this.resetFocus = true;
    }

    getItem(id) {
        "use strict";
        this.resetFocus = false;
        this.isModelLoaded = false;
        this.showEditable = false;
        this.isReadonly = true;
        this.context.resourceService
            .getItem({resourceName: this.context.resourceName, id: id})
            .then((result) => this.onGetItemSuccess(result))
            .catch((result) => this.onGetItemError(result));
    }

    onGetItemSuccess(result) {
        "use strict";
        this.viewModel = result;
        this.resetFocus = true;
        this.isModelLoaded = true;
        this.showEditable = true;
        this.isReadonly = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
    }

    refreshMetadata(metadata){
        "use strict";
        if (metadata != undefined) {
            this.metadata = {};
            _.merge(this.metadata, this.metadataBase, metadata);
        }
    }

    onGetItemError(result) {
        "use strict";
        this.messages = 'Error'
    }

    updateItem(item) {
        "use strict";
        this.isModelLoaded = false;
        this.context.resourceService
            .updateItem({resourceName: this.context.resourceName}, item)
            .then((result) => this.onUpdateItemSuccess(result))
            .catch((result) => this.onUpdateItemError(result));
    }

    onUpdateItemSuccess(result) {
        "use strict";
        this.messages = 'Success';
        this.isModelLoaded = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
        var newPath = this.context.resourceName + "/" + result.id;
        this.ng.$location.path(newPath);
    }

    onUpdateItemError(result) {
        "use strict";
        this.messages = 'Error'
    }

    deleteItem(item) {
        "use strict";
        this.isModelLoaded = false;
        this.context.resourceService
            .deleteItem({resourceName: this.context.resourceName}, item)
            .then( (result) => this.onDeleteItemSuccess(result))
            .catch((result) => this.onDeleteItemError(result));
    }

    onDeleteItemSuccess(result) {
        "use strict";
        this.messages = 'Success'
        this.isModelLoaded = false;
        if (result.metadata != undefined) {
            this.refreshMetadata(result.metadata);
        }
        this.getList();
    }

    onDeleteItemError(result) {
        "use strict";
        this.messages = 'Error'
    }

    doSubmit(isValid){
        "use strict";
    }

    validateForm(thisForm){
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
    }
}