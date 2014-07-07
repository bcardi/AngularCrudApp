///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestNewController extends BaseNewController {

    constructor($injector, context) {
        "use strict";
        super($injector, context);
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
        if (this.context.resourceService.type === "nosql") {
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
    .controller('WorkRequestNewController', ['$injector', 'ResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new WorkRequestNewController(
            $injector,
            {
                resourceName: "work-requests",
                formTag: "detail",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);
