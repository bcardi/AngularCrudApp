///<reference path='references.ts' />

/**
 * Created by Bob on 5/6/2014.
 */

//import BaseController = require('./base-controller');

class BaseEditController extends BaseController {

    getData() {
        "use strict";
        this.getItem(this.context.$routeParams.id);
    }

    doSubmit(isValid){
        "use strict";
        this.updateItem(this.viewModel);
    }
}