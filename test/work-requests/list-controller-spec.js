/**
 * Created by Bob on 7/7/2014.
 */
describe('WorkRequestsListController', function() {

    var workRequestsListController;

    beforeEach(module("crudApp"));
    beforeEach(inject(function ($controller, $httpBackend) {

        httpBackend = $httpBackend;

        httpBackend.when("GET", "app/work-requests/list-metadata.json").respond(
            {
                "form":{"sections": {"search": {"isOpen": true}}}
            }
        );

        httpBackend.when("GET", "http://localhost:9200/angularjs-crud/work-requests/_search").respond(
            {
                "took" : 1,
                "timed_out" : false,
                "_shards" : {
                    "total" : 5,
                    "successful" : 5,
                    "failed" : 0
                },
                "hits" : {
                    "total" : 4,
                    "max_score" : 1.0,
                    "hits" : [ {
                        "_index" : "angularjs-crud",
                        "_type" : "work-requests",
                        "_id" : "41",
                        "_score" : 1.0,
                        "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"222","institution":"444","deviceId":"222","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":false},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"41"}
                    }, {
                        "_index" : "angularjs-crud",
                        "_type" : "work-requests",
                        "_id" : "40",
                        "_score" : 1.0,
                        "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"111","institution":"111","deviceId":"111","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":true},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"40"}
                    }, {
                        "_index" : "angularjs-crud",
                        "_type" : "work-requests",
                        "_id" : "42",
                        "_score" : 1.0,
                        "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"777","institution":"777","deviceId":"777","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":true},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"42"}
                    }, {
                        "_index" : "angularjs-crud",
                        "_type" : "work-requests",
                        "_id" : "43",
                        "_score" : 1.0,
                        "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"123","institution":"111","deviceId":"123","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":true},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"43"}
                    } ]
                }
            }
        );

        workRequestsListController = $controller('WorkRequestsListController');

        //httpBackend.flush();
    }))

    it('should initialize properly', function(){
        expect(workRequestsListController.context.resourceName).toBe("work-requests");
        expect(workRequestsListController.context.formTag).toBe("list");
        expect(workRequestsListController.context.ngRefs).toEqual([]);
        expect(workRequestsListController.resetFocus).toBe(true);
        expect(workRequestsListController.isModelLoaded).toBe(false);
        expect(workRequestsListController.showEditable).toBe(false);
        expect(workRequestsListController.isReadonly).toBe(true);
        expect(workRequestsListController.searchModel).toEqual({});
        //expect(workRequestsListController.messages).toBe("");
        //expect(workRequestsListController.primaryGridOptions).toEqual({});

        expect(workRequestsListController.metadata.form.sections.search.isOpen).toBe(true);
        //expect(workRequestsListController.viewModel.length).toBe(4);
    });

    describe('search by institution', function(workRequestsListController){

        beforeEach(inject(function ($controller, $httpBackend) {

            httpBackend = $httpBackend;

            httpBackend.when("GET", "http://localhost:9200/angularjs-crud/work-requests/_search?q=%2Binstitution:111+").respond(
                {
                    "took" : 1,
                    "timed_out" : false,
                    "_shards" : {
                        "total" : 5,
                        "successful" : 5,
                        "failed" : 0
                    },
                    "hits" : {
                        "total" : 2,
                        "max_score" : 0.30685282,
                        "hits" : [ {
                            "_index" : "angularjs-crud",
                            "_type" : "work-requests",
                            "_id" : "40",
                            "_score" : 0.30685282,
                            "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"111","institution":"111","deviceId":"111","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":true},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"40"}
                        }, {
                            "_index" : "angularjs-crud",
                            "_type" : "work-requests",
                            "_id" : "43",
                            "_score" : 0.30685282,
                            "_source":{"requestTypeId":"ADDATM","stateId":"DRAFT","expedited":false,"tabStatus":"","isReadonly":false,"custRequestNo":"123","institution":"111","deviceId":"123","installDate":"2014-07-31","metadata":{"form":{"tabs":{"request":{"isDisabled":false},"location":{"isDisabled":false},"functionality":{"isDisabled":true},"telecom":{"isDisabled":true},"surcharging":{"isDisabled":true},"monitoring":{"isDisabled":true},"contacts":{"isDisabled":true},"comments":{"isDisabled":true},"staging":{"isDisabled":true}}}},"id":"43"}
                        } ]
                    }
                }
            );

            workRequestsListController = $controller('WorkRequestsListController');
            httpBackend.flush();
        }))

        it('should find 2 rows', function() {
            workRequestsListController.searchModel = {"institution": "111"};
            workRequestsListController.getList();
            httpBackend.flush();
            expect(workRequestsListController.viewModel.length).toBe(2);
        })
    });

})