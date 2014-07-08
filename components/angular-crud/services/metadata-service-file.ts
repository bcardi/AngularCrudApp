///<reference path='references.ts' />

/**
 * Created by Bob on 5/4/2014.
 */

class MetadataService implements IMetadataService {

    public resource:any;

    constructor($resource) {
        "use strict";
        this.resource = $resource('app/:resourceName/:formTag-metadata.json',{ },{ } );
    }

    public get(params):ng.IPromise<any> {
        "use strict";
        return this.resource.get({resourceName: params.resourceName, formTag: params.formTag}).$promise;
    }
}

angular.module('angularCrud').factory('MetadataService', ['$resource', ($resource) => new MetadataService($resource)]);