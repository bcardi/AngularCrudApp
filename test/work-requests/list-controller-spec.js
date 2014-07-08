/**
 * Created by Bob on 7/7/2014.
 */
describe('WorkRequestListController', function() {

    var workRequestListController;

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

        workRequestListController = $controller('WorkRequestListController');

        httpBackend.flush();
    }))

    it('should initialize properly', function(){
        expect(workRequestListController.context.resourceName).toBe("work-requests");
        expect(workRequestListController.context.formTag).toBe("list");
        expect(workRequestListController.context.ngRefs).toEqual([]);
        expect(workRequestListController.resetFocus).toBe(true);
        expect(workRequestListController.isModelLoaded).toBe(false);
        expect(workRequestListController.showEditable).toBe(false);
        expect(workRequestListController.isReadonly).toBe(true);
        expect(workRequestListController.searchModel).toEqual({});
        //expect(workRequestListController.messages).toBe("");
        //expect(workRequestListController.primaryGridOptions).toEqual({});

        expect(workRequestListController.metadata.form.sections.search.isOpen).toBe(true);
        expect(workRequestListController.viewModel.length).toBe(4);
    });

    describe('search by institution', function(workRequestListController){

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

            workRequestListController = $controller('WorkRequestListController');
            httpBackend.flush();
        }))

        it('should find 2 rows', function() {
            workRequestListController.searchModel = {"institution": "111"};
            workRequestListController.getList();
            httpBackend.flush();
            expect(workRequestListController.viewModel.length).toBe(2);
        })
    });

})