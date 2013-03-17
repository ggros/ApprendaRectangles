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
            this.left(rect && rect.left || 0);
            this.top(rect && rect.top || 0);
            this.width(rect && rect.width || 100);
            this.height(rect && rect.height || 100);
        }
        ObservableRect.prototype.getRect = function () {
            this._rect.left = this.left();
            this._rect.top = this.top();
            this._rect.width = this.width();
            this._rect.height = this.height();
            return this._rect;
        };
        return ObservableRect;
    })();
    exports.ObservableRect = ObservableRect;    
    exports.displayName = 'Simple Entry';
    exports.rect1 = new ObservableRect(new Shapes.Rectangle(0, 0, 100, 100, "rect 1"));
    exports.rect2 = new ObservableRect(new Shapes.Rectangle(50, 50, 100, 100, "rect 2"));
    exports.rectangles = ko.observableArray([
        exports.rect1, 
        exports.rect2
    ]);
    function testRectangles() {
        var inter = exports.rect1.getRect().Intersection(exports.rect2.getRect());
        console.log(inter);
        return app.showMessage('Test Inter');
    }
    exports.testRectangles = testRectangles;
    function activate() {
        handlers.test();
    }
    exports.activate = activate;
})
//@ sourceMappingURL=SimpleEntry.js.map
