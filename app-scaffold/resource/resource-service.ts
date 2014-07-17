/*
 Todo: Change name of this class
 Todo: Define default metadata
 Todo: Edit list-metadata.json
 Todo: Set all @@ values
 */

class ResourceNameSingularResourceService extends ResourceService implements IResourceService {
}

angular.module('app.@@ResourceNamePlural@@')
    .factory('@@ResourceNameSingular@@ResourceService', ['$resource', ($resource) => new ResourceNameSingularResourceService($resource)]);