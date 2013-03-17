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
export class Color {
    constructor(public R: number, public G: number, public B: number) { }
}
export class Rectangle implements IRectangle {
    // Constructor
    constructor(public left: number, public top: number, public width: number, public height: number,public name: string) { }
    public color = new Color(255, 0, 0);

    SayHello() {
        return "hello";
    }
    //Intersection of 2 rectangles (not rotated)
    public Intersection(rect: Rectangle):Rectangle {
        var x0 = Math.max(this.left, rect.left);
        var x1 = Math.min(this.left + this.width, rect.left + rect.width);        
        if (x0 <= x1) {
            var y0 = Math.max(this.top, rect.top);
            var y1 = Math.min(this.top + this.height, rect.top + rect.height);

            if (y0 <= y1) {
                var rect = new Rectangle(x0, y0, x1 - x0, y1 - y0,"Intersection");                
                return rect;
            }
        }
        return null;
    };
    //Containement (not rotated)
    public Contains(rect: Rectangle):bool {
        var b:bool = (this.left <= rect.left) &&
           (this.left + this.width >= rect.left + rect.width) &&
           (this.top <= rect.top) &&
           (this.top + this.height >= rect.top + rect.height);
        console.log(b);
        console.log((this.left + this.width) +">="+ (rect.left + rect.width))
        return b;
    }
    public Adjacent(rect: Rectangle): bool {
        var inter = this.Intersection(rect);
        if (inter == null) return false;
        return (inter.width == 0 || inter.height == 0);
    }
}

// Local variables
var p: IPoint = new Point(3, 4);
var dist = p.getDist();