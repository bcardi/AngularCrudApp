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
var BaseEditController = (function (_super) {
    __extends(BaseEditController, _super);
    function BaseEditController() {
        _super.apply(this, arguments);
    }
    BaseEditController.prototype.getData = function () {
        "use strict";
        this.getItem(this.context.$routeParams.id);
    };

    BaseEditController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseEditController;
})(BaseController);
//# sourceMappingURL=base-edit-controller.js.map
