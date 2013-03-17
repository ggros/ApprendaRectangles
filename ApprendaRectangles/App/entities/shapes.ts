// Interface
export interface IPoint {
    getDist(): number;
}
export interface IRectangle {
    SayHello(): string;
}

// Class
export class Point implements IPoint {
    // Constructor
    constructor(public x: number, public y: number) { }

    // Instance member
    getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

    // Static member
    static origin = new Point(0, 0);
}
export class Rectangle implements IRectangle {
    // Constructor
    constructor(public left: number, public top: number, public width: number, public height: number) { }

    SayHello() {
        return "hello";
    }
    public Intersection(rect: Rectangle) {
        var x0 = Math.max(this.left, rect.left);
        var x1 = Math.min(this.left + this.width, rect.left + rect.width);

        if (x0 <= x1) {
            var y0 = Math.max(this.top, rect.top);
            var y1 = Math.min(this.top + this.height, rect.top + rect.height);

            if (y0 <= y1) {
                var rect = new Rectangle(x0, y0, x1 - x0, y1 - y0);                
                return rect;
            }
        }
        return null;
    };
    public Contains(rect: Rectangle) {
        return this.left <= rect.left &&
           this.left + this.width >= rect.left + rect.width &&
           this.top <= rect.top &&
           this.top + this.height >= rect.top + rect.height;
    }
}

// Local variables
var p: IPoint = new Point(3, 4);
var dist = p.getDist();