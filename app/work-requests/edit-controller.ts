///<reference path='../references.ts' />
/**
 * Created by e1009811 on 5/1/2014.
 */

class WorkRequestEditController extends BaseEditController {

    onGetItemSuccess(result) {
        "use strict";
        super.onGetItemSuccess(result);
        this.showEditable = !this.viewModel.isReadonly;
        this.isReadonly = this.viewModel.isReadonly;
    }

    validateForm(thisForm) {
        "use strict";
        return super.validateForm(thisForm);
    }

    updateItem(item) {
        "use strict";
        /***** Special processing for couchdb sample app *****/
        item.metadata.form.tabs.functionality.isDisabled = false;
        /***** Special processing for couchdb sample app *****/
        super.updateItem(item);
    }
}

angular.module('app.workRequests')
    .controller('WorkRequestEditController', ['$routeParams', '$location', '$scope', 'ResourceService', 'MetadataService',
        ($routeParams, $location, $scope, ResourceService, MetadataService) => new WorkRequestEditController(
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
