var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../entities/shapes', '../../Scripts/tsUnit'], function(require, exports, __Shapes__, __tsUnit__) {
    
    
    var Shapes = __Shapes__;

    var tsUnit = __tsUnit__;

    exports.errors = ko.observableArray([]);
    exports.passes = ko.observableArray([]);
    ;
    function activate() {
        var self = this;
        var target = new Shapes.Point(1, 5);
        var test = new tsUnit.Test();
        test.addTestClass(new PointTests(), "Points Tests");
        var res = test.run();
        exports.errors(res.errors);
        exports.passes(res.passes);
    }
    exports.activate = activate;
    var PointTests = (function (_super) {
        __extends(PointTests, _super);
        function PointTests() {
            _super.apply(this, arguments);

            this.target = new Shapes.Point(0, 5);
        }
        PointTests.prototype.getDistExpect5 = function () {
            var result = this.target.getDist();
            this.areIdentical(5, result);
        };
        PointTests.prototype.originIsZero = function () {
            var origin = Shapes.Point.origin;
            this.areIdentical(0, origin.x);
            this.areIdentical(0, origin.y);
        };
        return PointTests;
    })(tsUnit.TestClass);
    exports.PointTests = PointTests;    
})
