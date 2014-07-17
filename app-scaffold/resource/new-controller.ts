///<reference path='../references.ts' />

/*
 Todo: Change name of this class
 Todo: Define default metadata
 Todo: Edit list-metadata.json
 Todo: Set all @@ values
 */

class ResourceNameSingularNewController extends BaseNewController {

    constructor($injector, context) {
        "use strict";
        super($injector, context);
        this.viewModel.tabStatus = "";
        this.viewModel.isReadonly = false;
    }

    createItem(item) {
        "use strict";
        super.createItem(item);
    }
}

angular.module('app.@@ResourceNamePlural@@')
    .controller('@@ResourceNameSingular@@NewController', ['$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new ResourceNameSingularNewController(
            $injector,
            {
                resourceName: "@@resource-name-plural@@",
                formTag: "detail",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);
