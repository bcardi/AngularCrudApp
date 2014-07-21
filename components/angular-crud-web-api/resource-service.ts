///<reference path='references.ts' />

/**
 * Created by Bob on 5/4/2014.
 */

class ResourceService implements IResourceService {

    public name:string;
    public type: string;
    public resource: any;
    public items: any[];
    public currentItem: any;
    public currentItemIndex: number;
    public searchModel: any;
    public getListTime: any;
    public metadata: any[] = [];

    constructor($resource) {
        "use strict";
        this.name = "web-api";
        this.type = "service"
        this.resource =
            $resource('http://localhost:59263/api/:resourceName/:id',
                { id: '@id' },
                {
                    update: { method: 'PUT' }
                }
            );
    }

    public getList(params):ng.IPromise<any> {
        "use strict";
        var queryParams = { resourceName: params.resourceName }
        _.merge(queryParams, params.searchModel);
        return this.resource.query(queryParams).$promise;
    }

    public createItem(params, item):ng.IPromise<any> {
        "use strict";
        return this.resource.create({resourceName: params.resourceName}, item).$promise;
    }

    public getItem(params):ng.IPromise<any> {
        "use strict";
        return this.resource.get({resourceName: params.resourceName}, { id: params.id }).$promise;
    }

    public updateItem(params, item):ng.IPromise<any> {
        "use strict";
        return this.resource.update({resourceName: params.resourceName}, item).$promise;
    }

    public deleteItem(params, item):ng.IPromise<any> {
        "use strict";
        return this.resource.delete({resourceName: params.resourceName}, item).$promise;
    }
}

angular.module('angularCrud').factory('ResourceService', ['$resource', ($resource) => new ResourceService($resource)]);