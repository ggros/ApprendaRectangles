var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'durandal/app', '../entities/shapes', './SimpleEntry', '../../Scripts/tsUnit'], function(require, exports, __app__, __Shapes__, __viewmodel__, __tsUnit__) {
    var app = __app__;

    
    var Shapes = __Shapes__;

    var viewmodel = __viewmodel__;

    var tsUnit = __tsUnit__;

    exports.errors = ko.observableArray([]);
    exports.passes = ko.observableArray([]);
    var oldShowMessage;
    function activate() {
        var self = this;
        oldShowMessage = app.showMessage;
        app.showMessage = function () {
            return null;
        };
        var test = new tsUnit.Test();
        test.addTestClass(new PointTests(), "Points Tests");
        test.addTestClass(new RectangleTests(), "Rectangle Tests");
        test.addTestClass(new SimpleEntryTests(), "SimpleEntry VM Tests");
        var res = test.run();
        exports.errors(res.errors);
        exports.passes(res.passes);
        app.showMessage('test 12');
    }
    exports.activate = activate;
    function canDeactivate() {
        app.showMessage = oldShowMessage;
        return true;
    }
    exports.canDeactivate = canDeactivate;
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
    var RectangleTests = (function (_super) {
        __extends(RectangleTests, _super);
        function RectangleTests() {
            _super.apply(this, arguments);

        }
        RectangleTests.prototype.shouldNotIntersect = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(200, 0, 100, 100);
            var inter = rect1.Intersection(rect2);
            this.isTrue(inter == null);
        };
        RectangleTests.prototype.interExpect5050 = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(50, 50, 100, 100);
            var inter = rect1.Intersection(rect2);
            this.areIdentical(50, inter.left);
            this.areIdentical(50, inter.top);
            this.areIdentical(50, inter.width);
            this.areIdentical(50, inter.height);
        };
        RectangleTests.prototype.testZeroInter = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(100, 100, 100, 100);
            var inter = rect1.Intersection(rect2);
            this.areIdentical(100, inter.left);
            this.areIdentical(100, inter.top);
            this.areIdentical(0, inter.width);
            this.areIdentical(0, inter.height);
        };
        RectangleTests.prototype.testNoContainementSeparatedRect = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(100, 100, 100, 100);
            this.isFalse(rect1.Contains(rect2));
        };
        RectangleTests.prototype.testNoContainementIntersectingRect = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(50, 50, 100, 100);
            this.isFalse(rect1.Contains(rect2));
        };
        RectangleTests.prototype.testContainementOk = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(50, 50, 50, 50);
            this.isTrue(rect1.Contains(rect2));
        };
        RectangleTests.prototype.testAdjacentOk = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(100, 50, 50, 50);
            this.isTrue(rect1.Adjacent(rect2));
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(50, 100, 50, 50);
            this.isTrue(rect1.Adjacent(rect2));
        };
        RectangleTests.prototype.testNotAdjacentOk = function () {
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(100, 150, 50, 50);
            this.isFalse(rect1.Adjacent(rect2));
            var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
            var rect2 = new Shapes.Rectangle(50, 50, 50, 50);
            this.isFalse(rect1.Adjacent(rect2));
        };
        return RectangleTests;
    })(tsUnit.TestClass);
    exports.RectangleTests = RectangleTests;    
    var SimpleEntryTests = (function (_super) {
        __extends(SimpleEntryTests, _super);
        function SimpleEntryTests() {
            _super.apply(this, arguments);

        }
        SimpleEntryTests.prototype.setUp = function () {
            console.log("setUp");
        };
        SimpleEntryTests.prototype.tearDown = function () {
            console.log("tearDown");
        };
        SimpleEntryTests.prototype.testInitialStateOfRect = function () {
            this.areIdentical(0, viewmodel.rect1.left());
            this.areIdentical(0, viewmodel.rect1.top());
            this.areIdentical(100, viewmodel.rect1.width());
            this.areIdentical(100, viewmodel.rect1.height());
            this.areIdentical(50, viewmodel.rect2.left());
            this.areIdentical(50, viewmodel.rect2.top());
            this.areIdentical(100, viewmodel.rect2.width());
            this.areIdentical(100, viewmodel.rect2.height());
            this.areIdentical(2, viewmodel.rectangles().length);
        };
        SimpleEntryTests.prototype.IntersectionShouldAddRectangleToModel = function () {
            viewmodel.testIntersection();
            this.areIdentical(3, viewmodel.rectangles().length);
            var interObs = viewmodel.rectangles()[2];
            this.areIdentical(50, interObs.left());
            this.areIdentical(50, interObs.top());
            this.areIdentical(50, interObs.width());
            this.areIdentical(50, interObs.height());
        };
        SimpleEntryTests.prototype.NoIntersectionShouldPopMessage = function () {
            viewmodel.rect2.left(500);
            viewmodel.rect2.top(500);
            var message = "";
            app.showMessage = function (m) {
                message = m;
                return null;
            };
            viewmodel.testIntersection();
            this.areIdentical(3, viewmodel.rectangles().length);
            this.areIdentical("No Intersection", message);
        };
        SimpleEntryTests.prototype.NoContainementShouldPopMessage = function () {
            viewmodel.rect1.left(0);
            viewmodel.rect1.top(0);
            viewmodel.rect1.width(100);
            viewmodel.rect1.height(100);
            viewmodel.rect2.left(500);
            viewmodel.rect2.top(500);
            viewmodel.rect2.width(50);
            viewmodel.rect2.height(50);
            var message = "";
            app.showMessage = function (m) {
                message = m;
                return null;
            };
            viewmodel.testContainement();
            this.areIdentical("No Containement", message);
        };
        SimpleEntryTests.prototype.ContainementShouldPopMessage = function () {
            viewmodel.rect1.left(0);
            viewmodel.rect1.top(0);
            viewmodel.rect1.width(100);
            viewmodel.rect1.height(100);
            viewmodel.rect2.left(50);
            viewmodel.rect2.top(50);
            viewmodel.rect2.width(50);
            viewmodel.rect2.height(50);
            var message = "";
            app.showMessage = function (m) {
                message = m;
                return null;
            };
            viewmodel.testContainement();
            this.areIdentical("Rect 1 contains Rect 2", message);
        };
        SimpleEntryTests.prototype.NoAdjacencyShouldPopMessage = function () {
            viewmodel.rect1.left(0);
            viewmodel.rect1.top(0);
            viewmodel.rect1.width(100);
            viewmodel.rect1.height(100);
            viewmodel.rect2.left(500);
            viewmodel.rect2.top(500);
            viewmodel.rect2.width(50);
            viewmodel.rect2.height(50);
            var message = "";
            app.showMessage = function (m) {
                message = m;
                return null;
            };
            viewmodel.testAdjacency();
            this.areIdentical("Rectangles are not adjacents", message);
        };
        SimpleEntryTests.prototype.AdjacencyShouldPopMessage = function () {
            viewmodel.rect1.left(0);
            viewmodel.rect1.top(0);
            viewmodel.rect1.width(100);
            viewmodel.rect1.height(100);
            viewmodel.rect2.left(100);
            viewmodel.rect2.top(0);
            viewmodel.rect2.width(50);
            viewmodel.rect2.height(50);
            var message = "";
            app.showMessage = function (m) {
                message = m;
                return null;
            };
            viewmodel.testAdjacency();
            this.areIdentical("Rectangle are adjacents", message);
        };
        return SimpleEntryTests;
    })(tsUnit.TestClass);
    exports.SimpleEntryTests = SimpleEntryTests;    
})
//@ sourceMappingURL=TestRunner.js.map
