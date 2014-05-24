///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestNewController extends BaseNewController {

    constructor(context) {
        "use strict";
        super(context);
        this.viewModel.requestTypeId = "ADDATM";
        this.viewModel.stateId = "DRAFT";
        this.viewModel.expedited = false;
        //this.viewModel.institution = "";
        //this.viewModel.deviceId = "";;
        //this.viewModel.installDate = "";
        this.viewModel.tabStatus = "";
        this.viewModel.isReadonly = false;
    }

    createItem(item) {
        "use strict";
        /***** Special processing for couchdb sample app *****/
        if (this.context.resourceService.name == "couchdb") {
            item.metadata = {
                "form": {
                    "tabs": {
                        "request": {"isDisabled": false},
                        "location": {"isDisabled": false},
                        "functionality": {"isDisabled": true},
                        "telecom": {"isDisabled": true},
                        "surcharging": {"isDisabled": true},
                        "monitoring": {"isDisabled": true},
                        "contacts": {"isDisabled": true},
                        "comments": {"isDisabled": true},
                        "staging": {"isDisabled": true}
                    }
                }
            };
        }
        /***** Special processing for couchdb sample app *****/
        super.createItem(item);
    }
}

angular.module('app.workRequests')
    .controller('WorkRequestNewController', ['$routeParams', '$location', '$scope', 'ResourceService', 'MetadataService',
        ($routeParams, $location, $scope, ResourceService, MetadataService) => new WorkRequestNewController(
            {
                resourceName: "work-requests",
                formTag: "detail",
                $routeParams: $routeParams,
                $location: $location,
                $scope: $scope,
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);
