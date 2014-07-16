/**
 * Created by Bob on 7/15/2014.
 */
class WorkRequestResourceService extends ResourceService implements IResourceService {
}

angular.module('app.workRequests')
    .factory('WorkRequestResourceService', ['$resource', ($resource) => new WorkRequestResourceService($resource)]);