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
var BaseShowController = (function (_super) {
    __extends(BaseShowController, _super);
    function BaseShowController() {
        _super.apply(this, arguments);
    }
    BaseShowController.prototype.getData = function () {
        "use strict";
        this.getItem(this.context.$routeParams.id);
    };

    BaseShowController.prototype.doSubmit = function (isValid) {
        "use strict";
        this.updateItem(this.viewModel);
    };
    return BaseShowController;
})(BaseController);
//# sourceMappingURL=base-show-controller.js.map
