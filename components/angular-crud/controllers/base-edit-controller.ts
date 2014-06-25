///<reference path='references.ts' />

/**
 * Created by Bob on 5/6/2014.
 */

//import BaseController = require('./base-controller');

class BaseEditController extends BaseController {

    constructor($injector, context){
        "use strict";
        BaseController.addNgRef(context,'$routeParams');
        super($injector, context);
    }

    getData() {
        "use strict";
        this.getItem(this.ng.$routeParams.id);
    }

    doSubmit(isValid){
        "use strict";
        this.updateItem(this.viewModel);
    }
}