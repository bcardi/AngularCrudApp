///<reference path='../references.ts' />

/*
 Todo: Change name of this class
 Todo: Define default metadata
 Todo: Edit list-metadata.json
 Todo: Set all @@ values
 */

class ResourceNameSingularListController extends BaseListController {
}

angular.module('app.@@ResourceNamePlural@@')
    .controller('@@ResourceNameSingular@@ListController', ['$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new ResourceNameSingularListController(
            $injector,
            {
                resourceName: "@@resource-name-plural@@",
                formTag: "list",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);