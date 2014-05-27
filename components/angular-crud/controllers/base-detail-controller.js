///<reference path='references.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by Bob on 5/6/2014.
*/
//import BaseController = require('./base-controller');
var BaseDetailController = (function (_super) {
    __extends(BaseDetailController, _super);
    function BaseDetailController(context) {
        "use strict";
        _super.call(this, context);
        this.getItem(context.$routeParams.id);
    }
    BaseDetailController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseDetailController;
})(BaseController);
//# sourceMappingURL=base-detail-controller.js.map
