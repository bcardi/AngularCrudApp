/// <reference path="../components/angular-crud/angular-crud.d.ts" />
/// <reference path="../components/angular-crud/resource-service.d.ts" />
/**
* Created by Bob on 7/15/2014.
*/
declare class WorkRequestResourceService extends ResourceService implements IResourceService {
}
/**
* Created by e1009811 on 5/1/2014.
*/
declare class WorkRequestsListController extends BaseListController {
}
/**
* Created by e1009811 on 5/1/2014.
*/
declare class WorkRequestsNewController extends BaseNewController {
    constructor($injector: any, context: any);
    public createItem(item: any): void;
}
/**
* Created by e1009811 on 5/1/2014.
*/
declare class WorkRequestsEditController extends BaseEditController {
    public init(): void;
    public onGetItemSuccess(result: any): void;
    public validateForm(thisForm: any): string;
    public updateItem(item: any): void;
}
/**
* Created by e1009811 on 5/1/2014.
*/
declare var app: ng.IModule;
