///<reference path='references.ts' />

/**
 * Created by Bob on 5/6/2014.
 */

//import BaseController = require('./base-controller');

class BaseDetailController extends BaseController {

    constructor(context) {
        "use strict";
        super(context);
        this.getItem(context.$routeParams.id);
    }

    doSubmit(isValid){
        "use strict";
        this.updateItem(this.viewModel);

    }
}