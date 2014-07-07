///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestListController extends BaseListController {
}

angular.module('app.workRequests')
    .controller('WorkRequestListController', ['$injector', 'ResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new WorkRequestListController(
            $injector,
            {
                resourceName: "work-requests",
                formTag: "list",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);