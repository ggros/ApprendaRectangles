define(["require", "exports", 'durandal/app', '../entities/shapes', './SimpleEntryHandlers'], function(require, exports, __app__, __Shapes__, __handlers__) {
    var app = __app__;

    
    var Shapes = __Shapes__;

    var handlers = __handlers__;

    var ObservableRect = (function () {
        function ObservableRect(rect) {
            this.rect = rect;
            this.left = ko.observable(0);
            this.top = ko.observable(0);
            this.width = ko.observable(0);
            this.height = ko.observable(100);
            this._rect = rect;
            this.left(rect.left);
            this.top(rect.top);
            this.width(rect.width);
            this.height(rect.height);
        }
        ObservableRect.prototype.getRect = function () {
            this._rect.left = +this.left.peek();
            this._rect.top = +this.top.peek();
            this._rect.width = +this.width.peek();
            this._rect.height = +this.height.peek();
            return this._rect;
        };
        return ObservableRect;
    })();
    exports.ObservableRect = ObservableRect;    
    exports.displayName = 'Simple Entry';
    exports.rect1 = new ObservableRect(new Shapes.Rectangle(0, 0, 100, 100, "rect 1"));
    exports.rect2 = new ObservableRect(new Shapes.Rectangle(50, 50, 100, 100, "rect 2"));
    exports.rect2._rect.color = new Shapes.Color(0, 0, 255);
    exports.rectangles = ko.observableArray([
        exports.rect1, 
        exports.rect2
    ]);
    function testIntersection() {
        var inter = exports.rect1.getRect().Intersection(exports.rect2.getRect());
        if(inter == null) {
            return app.showMessage('No Intersection');
        }
        inter.color = new Shapes.Color(0, 255, 0);
        var oRect = new ObservableRect(inter);
        exports.rectangles.push(oRect);
    }
    exports.testIntersection = testIntersection;
    function testContainement() {
        if(exports.rect1.getRect().Contains(exports.rect2.getRect())) {
            return app.showMessage("Rect 1 contains Rect 2");
        }
        if(exports.rect2.getRect().Contains(exports.rect1.getRect())) {
            return app.showMessage("Rect 2 contains Rect 1");
        }
        return app.showMessage("No Containement");
    }
    exports.testContainement = testContainement;
    function testAdjacency() {
        if(exports.rect1.getRect().Adjacent(exports.rect2.getRect())) {
            return app.showMessage('Rectangle are adjacents');
        }
        return app.showMessage("Rectangles are not adjacents");
    }
    exports.testAdjacency = testAdjacency;
    function activate() {
        handlers.test();
    }
    exports.activate = activate;
})
