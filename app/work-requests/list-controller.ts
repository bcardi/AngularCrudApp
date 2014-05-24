///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestListController extends BaseListController {

    public orderProp: string;

    constructor(context) {
        "use strict";
        super(context);
        this.orderProp = 'id';
    }
}

angular.module('app.workRequests')
    .controller('WorkRequestListController', ['$routeParams', '$location', '$scope', 'ResourceService', 'MetadataService',
        ($routeParams, $location, $scope, ResourceService, MetadataService) => new WorkRequestListController(
            {
                resourceName: "work-requests",
                formTag: "list",
                $routeParams: $routeParams,
                $location: $location,
                $scope: $scope,
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);