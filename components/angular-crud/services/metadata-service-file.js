///<reference path='references.ts' />
/**
* Created by Bob on 5/4/2014.
*/
var MetadataService = (function () {
    function MetadataService($resource) {
        "use strict";
        this.resource = $resource('app/:resourceName/:formTag-metadata.json', {}, {});
    }
    MetadataService.prototype.get = function (params) {
        "use strict";
        return this.resource.get({ resourceName: params.resourceName, formTag: params.formTag }).$promise;
    };
    return MetadataService;
})();

angular.module('angularCrud').factory('MetadataService', ['$resource', function ($resource) {
        return new MetadataService($resource);
    }]);
//# sourceMappingURL=metadata-service-file.js.map
