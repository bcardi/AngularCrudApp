///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestListController extends BaseListController {

    public orderProp: string;

    constructor($injector, context) {
        "use strict";
        super($injector, context);
        this.orderProp = 'id';
    }
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