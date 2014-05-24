///<reference path='references.ts' />

/**
 * Created by Bob on 5/4/2014.
 */

class ResourceService {

    public name:string;
    public resource: any;

    constructor($resource) {
        "use strict";
        this.name = "web-api";
        this.resource =
            $resource('http://localhost:59263/api/:resourceName/:id',
                { id: '@id' },
                {
                    update: { method: 'PUT' }
                }
            );
    }

    getList(params) {
        "use strict";
        return this.resource.query({resourceName: params.resourceName}).$promise;
    }

    createItem(params, item) {
        "use strict";
        return this.resource.create({resourceName: params.resourceName}, item).$promise;
    }

    getItem(params) {
        "use strict";
        return this.resource.get({resourceName: params.resourceName}, { id: params.id }).$promise;
    }

    updateItem(params, item) {
        "use strict";
        return this.resource.update({resourceName: params.resourceName}, item).$promise;
    }

    deleteItem(params, item) {
        "use strict";
        return this.resource.delete({resourceName: params.resourceName}, item).$promise;
    }
}

angular.module('angularCrud').factory('ResourceService', ['$resource', ($resource) => new ResourceService($resource)]);
