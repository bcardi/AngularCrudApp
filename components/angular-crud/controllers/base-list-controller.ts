///<reference path='references.ts' />

/**
 * Created by Bob on 5/6/2014.
 */

//import BaseController = require('base-controller');

class BaseListController extends BaseController {

    getData(){
        "use strict";
        if (this.context.resourceService.getListTime) {
            this.searchModel = this.context.resourceService.searchModel;
            this.viewModel = this.context.resourceService.items;
            try {this.metadata.form.sections.search.isOpen = false;} catch(e) {}
            //this.getList();
        }
    }
}