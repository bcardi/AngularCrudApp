///<reference path='references.ts' />

/**
 * Created by e1009811 on 5/1/2014.
 */

class ResourceService {

    public name: string;
    public type: string;
    public $q: any;
    public resource: any;

    constructor($resource, $q) {
        "use strict";
        this.name = "elastic";
        this.type = "nosql"
        this.$q = $q;
        this.resource =
            //http://127.0.0.1:5984/work-requests/_design/api/_list/all/default
            $resource(
                '',
                { protocol: 'http:', server: 'localhost:9200', index: 'angularjs-crud' },
                {
                    create: {
                        url: ':protocol//:server/:index/:resourceName/:docId',
                        method: 'POST',
                        params: { docId: '@id' }
                    },
                    update: {
                        url: ':protocol//:server/:index/:resourceName/:docId',
                        method: 'PUT',
                        params: { docId: '@id' },
                        transformResponse: function(data){
                            var response = angular.fromJson(data);
                            console.log(response);
                        }
                    },
                    delete: {
                        url: ':protocol//:server/:index/:resourceName/:docId',
                        method: 'DELETE',
                        params: { docId: '@id' },
                        transformResponse: function(data){
                            var response = angular.fromJson(data);
                            response.id = response._id;
                            return response;
                        }
                    },
                    query: {
                        url: ':protocol//:server/:index/:resourceName/_search',
                        method: 'GET',
                        isArray: true,
                        transformResponse: function(data){
                            var response = angular.fromJson(data);
                            var result = [];
                            for(var i=0,max=response.hits.total;i<max;i++){
                                var item = response.hits.hits[i];
                                var source = item._source;
                                source["id"] = item._id;
                                result.push(source);
                            }
                            return result;
                        }
                    },
                    get: {
                        url: ':protocol//:server/:index/:resourceName/:docId',
                        method: 'GET',
                        params: { docId: '@id' },
                        transformResponse: function(data){
                            var response = angular.fromJson(data);
                            var result = response._source;
                            result["id"] = response._id;
                            console.log(result);
                            return result;
                        }
                    },
                    counter: {
                        url: ':protocol//:server/:index/counters/:resourceName',
                        method: 'PUT',
                        params: { resourceName: '@resourceName' }
                    }
                }
            );
    }

    getList(params) {
        "use strict";
        return this.resource.query({resourceName: params.resourceName}).$promise;
    }

    createItem(params, item) {
        "use strict";
        var _this = this;
        if (item.id){
            return this.resource.create({resourceName: params.resourceName}, item).$promise;
        } else {
            return this.resource
                .counter({}, {resourceName: params.resourceName}).$promise
                .then(function (data) {
                    item.id = '' + data._version;
                    return _this.resource.create({resourceName: params.resourceName}, item).$promise;
                });
        }
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

angular.module('angularCrud').factory('ResourceService', ['$resource','$q', ($resource,$q) => new ResourceService($resource, $q)]);

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
