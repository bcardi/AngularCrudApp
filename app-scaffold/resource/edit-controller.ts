///<reference path='../references.ts' />

/*
    Todo: Change name of this class
    Todo: Define default metadata
    Todo: Edit detail-metadata.json
    Todo: Set all @@ values
 */

class ResourceNameSingularEditController extends BaseEditController {

    public init(): void {
        /* @@Default metadata@@ */
        this.metadataBase = {
            "form": {
                "tabs": {
                },
                "sections": {
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

angular.module('app.@@ResourceNamePlural@@')
    .controller('@@ResourceNameSingular@@EditController', ['$injector', '@@ResourceNameSingular@@ResourceService', 'MetadataService',
        ($injector, ResourceService, MetadataService) => new ResourceNameSingularEditController(
            $injector,
            {
                resourceName: "@@resource-name-plural@@",
                formTag: "detail",
                ngRefs: [],
                resourceService: ResourceService,
                metadataService: MetadataService
            }
        )]);