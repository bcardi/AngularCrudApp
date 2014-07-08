///<reference path='references.ts' />

/**
 * Created by e1009811 on 5/1/2014.
 */

class ResourceService implements IResourceService {

    public name: string;
    public type: string;
    public resource: any;

    constructor($resource) {
        "use strict";
        this.name = "couchdb";
        this.type = "nosql"
        this.resource =
            //http://127.0.0.1:5984/work-requests/_design/api/_list/all/default
            $resource(
                '',
                { protocol: 'http:', server: 'localhost:5984' },
                {
                    create: {
                        url: ':protocol//:server/:resourceName/_design/api/_update/save/:docId',
                        method: 'POST',
                        params: { docId: '@id' }
                    },
                    update: {
                        url: ':protocol//:server/:resourceName/_design/api/_update/save/:docId',
                        method: 'PUT',
                        params: { docId: '@id' }
                    },
                    delete: {
                        url: ':protocol//:server/:resourceName/:docId',
                        method: 'DELETE',
                        params: { docId: '@id', rev: '@_rev' }
                    },
                    query: {
                        url: ':protocol//:server/:resourceName/_design/api/_list/all/default',
                        method: 'GET',
                        isArray: true
                    },
                    get: {
                        url: ':protocol//:server/:resourceName/_design/api/_show/detail/:docId',
                        method: 'GET',
                        params: { docId: '@id' }
                    },
                    counter: {
                        url: ':protocol//:server/counters/_design/api/_update/counter/:resourceName',
                        method: 'POST',
                        params: { resourceName: '@resourceName' }
                    }
                }
            );
    }

    public getList(params):ng.IPromise<any> {
        "use strict";
        return this.resource.query({resourceName: params.resourceName}).$promise;
    }

    public createItem(params, item):ng.IPromise<any> {
        "use strict";
        var _this = this;
        if (item.id){
            return this.resource.create({resourceName: params.resourceName}, item).$promise;
        } else {
            return this.resource
                .counter({}, {resourceName: params.resourceName}).$promise
                .then(function (data) {
                    item.id = '' + data.counter;
                    return _this.resource.create({resourceName: params.resourceName}, item).$promise;
                });
        }
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

/*
 Create "_design/api" document in database

 curl -X PUT http://127.0.0.1:5984/work-requests
 curl -X PUT http://127.0.0.1:5984/work-requests/_design/api --data-binary @mydesign.json

 {
 "_id": "_design/api",
 "lists": {
 "all": "function(head, req) { var values = []; while (row = getRow()) { values.push(row.value); } return JSON.stringify(values); }"
 },
 "shows": {
 "detail": "function(doc, req) { var myDoc = JSON.parse(JSON.stringify( doc )); delete myDoc['_revisions']; myDoc.id = myDoc._id; return { 'json': myDoc }; }"
 },
 "views": {
 "default": {
 "map": "function (doc){ var myDoc = JSON.parse(JSON.stringify( doc )); myDoc.id = myDoc._id; emit(myDoc._id, myDoc); }"
 }
 }
 }
 */
