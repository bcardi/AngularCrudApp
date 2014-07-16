///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestEditController extends BaseEditController {

    public init(): void {
        this.metadataBase = {
            "form": {
                "tabs": {
                    "request": {
                        "isDisabled": false
                    },
                    "location": {
                        "isDisabled": true
                    }
                },
                "sections": {
                    "address": {
                        "isOpen": true
                    },
                    "description": {
                        "isOpen": true
                    }
                }
            }
        }
        super.init();
    }

    public onGetItemSuccess(result): void {
        "use strict";
        super.onGetItemSuccess(result);
        this.showEditable = !this.viewModel.isReadonly;
        this.isReadonly = this.viewModel.isReadonly;
    }

    public validateForm(thisForm): string {
        "use strict";
        return super.validateForm(thisForm);
    }

    public updateItem(item): void {
        "use strict";
        /***** Special processing for couchdb sample app *****/
        item.metadata.form.tabs.functionality.isDisabled = false;
        /***** Special processing for couchdb sample app *****/
        super.updateItem(item);
    }
}

angular.module('app.workRequests')
    .controller('WorkRequestEditController', ['$injector', 'WorkRequestResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new WorkRequestEditController(
            $injector,
            {
                resourceName: "work-requests",
                formTag: "detail",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);