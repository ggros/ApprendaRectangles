define(["require", "exports"], function(require, exports) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.getDist = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Point.origin = new Point(0, 0);
        return Point;
    })();
    exports.Point = Point;    
    var Color = (function () {
        function Color(R, G, B) {
            this.R = R;
            this.G = G;
            this.B = B;
        }
        return Color;
    })();
    exports.Color = Color;    
    var Rectangle = (function () {
        function Rectangle(left, top, width, height, name) {
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
            this.name = name;
            this.color = new Color(255, 0, 0);
        }
        Rectangle.prototype.SayHello = function () {
            return "hello";
        };
        Rectangle.prototype.Intersection = function (rect) {
            var x0 = Math.max(this.left, rect.left);
            var x1 = Math.min(this.left + this.width, rect.left + rect.width);
            if(x0 <= x1) {
                var y0 = Math.max(this.top, rect.top);
                var y1 = Math.min(this.top + this.height, rect.top + rect.height);
                if(y0 <= y1) {
                    var rect = new Rectangle(x0, y0, x1 - x0, y1 - y0, "Intersection");
                    return rect;
                }
            }
            return null;
        };
        Rectangle.prototype.Contains = function (rect) {
            return this.left <= rect.left && this.left + this.width >= rect.left + rect.width && this.top <= rect.top && this.top + this.height >= rect.top + rect.height;
        };
        return Rectangle;
    })();
    exports.Rectangle = Rectangle;    
    var p = new Point(3, 4);
    var dist = p.getDist();
})
//@ sourceMappingURL=shapes.js.map
