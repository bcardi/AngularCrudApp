///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestsListController extends BaseListController {
}

angular.module('app.workRequests')
    .controller('WorkRequestsListController', ['$injector', 'WorkRequestResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new WorkRequestsListController(
            $injector,
            {
                resourceName: "work-requests",
                formTag: "list",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);