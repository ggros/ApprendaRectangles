/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />
/// <reference path="../../Scripts/tsUnit.ts" />
/// <reference path="../entities/shapes.ts" />
/// <reference path="./SimpleEntry.ts" />
/// <reference path="../../scripts/typings/requirejs/require.d.ts" />

import app = module('durandal/app');
import system = module('durandal/system');
import Shapes = module('../entities/shapes');
import viewmodel = module('./SimpleEntry');
import tsUnit = module('../../Scripts/tsUnit');

export var errors = ko.observableArray([]);
export var passes = ko.observableArray([]);
var oldShowMessage;
export function activate() {

    var self = this;
    //save original showMessage so it can be mocked
    oldShowMessage = app.showMessage;
    app.showMessage = function () {
        return null
    };

    // new instance of tsUnit
    var test = new tsUnit.Test();

    // add your test class (you can call this multiple times)
    test.addTestClass(new PointTests(), "Points Tests");
    test.addTestClass(new RectangleTests(), "Rectangle Tests");
    test.addTestClass(new SimpleEntryTests(), "SimpleEntry VM Tests");
    

    var res = test.run();

    errors(res.errors);
    passes(res.passes);

    app.showMessage('test 12');
}
export function canDeactivate() {
    //the router's activator calls this function to see if it can leave the screen
    //restore app
    app.showMessage = oldShowMessage;
    return true;
}
export class PointTests extends tsUnit.TestClass {

    private target = new Shapes.Point(0,5);

    getDistExpect5() {
        var result = this.target.getDist()

        this.areIdentical(5, result);
    }
    originIsZero() {
        var origin = Shapes.Point.origin;
        this.areIdentical(0, origin.x);
        this.areIdentical(0, origin.y);

    }
}
export class RectangleTests extends tsUnit.TestClass {
    shouldNotIntersect() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(200, 0, 100, 100);
        var inter = rect1.Intersection(rect2);
        this.isTrue(inter == null);
    }
    interExpect5050() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(50, 50, 100, 100);
        var inter = rect1.Intersection(rect2);
        this.areIdentical(50, inter.left);
        this.areIdentical(50, inter.top);
        this.areIdentical(50, inter.width);
        this.areIdentical(50, inter.height);
    }
    testZeroInter() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(100, 100, 100, 100);
        var inter = rect1.Intersection(rect2);
        this.areIdentical(100, inter.left);
        this.areIdentical(100, inter.top);
        this.areIdentical(0, inter.width);
        this.areIdentical(0, inter.height);
    }
    testNoContainementSeparatedRect() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(100, 100, 100, 100);
        this.isFalse(rect1.Contains(rect2));
    }
    testNoContainementIntersectingRect() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(50, 50, 100, 100);
        this.isFalse(rect1.Contains(rect2));
    }
    testContainementOk() {
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(50, 50, 50, 50);
        this.isTrue(rect1.Contains(rect2));
    }
    testAdjacentOk() {
        //left
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(100, 50, 50, 50);
        this.isTrue(rect1.Adjacent(rect2));
        //below
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(50, 100, 50, 50);
        this.isTrue(rect1.Adjacent(rect2));
    }
    testNotAdjacentOk() {
        //separated
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(100, 150, 50, 50);
        this.isFalse(rect1.Adjacent(rect2));
        //inter
        var rect1 = new Shapes.Rectangle(0, 0, 100, 100);
        var rect2 = new Shapes.Rectangle(50, 50, 50, 50);
        this.isFalse(rect1.Adjacent(rect2));
    }
}

export class SimpleEntryTests extends tsUnit.TestClass {
    setUp() {
        console.log("setUp");
    }

    tearDown() {
        console.log("tearDown");
    }
    
    testInitialStateOfRect() {
        this.areIdentical(0, viewmodel.rect1.left());
        this.areIdentical(0, viewmodel.rect1.top());
        this.areIdentical(100, viewmodel.rect1.width());
        this.areIdentical(100, viewmodel.rect1.height());

        this.areIdentical(50, viewmodel.rect2.left());
        this.areIdentical(50, viewmodel.rect2.top());
        this.areIdentical(100, viewmodel.rect2.width());
        this.areIdentical(100, viewmodel.rect2.height());

        this.areIdentical(2, viewmodel.rectangles().length);
    }
    IntersectionShouldAddRectangleToModel() {
        //ideally we should mock the IRectangle.Intersection() to return a static val
        //this way a bug in Intersection() would not affect this test...
        viewmodel.testIntersection();
        this.areIdentical(3, viewmodel.rectangles().length);
        var interObs = viewmodel.rectangles()[2];
        
        this.areIdentical(50, interObs.left());
        this.areIdentical(50, interObs.top());
        this.areIdentical(50, interObs.width());
        this.areIdentical(50, interObs.height());
    }
    NoIntersectionShouldPopMessage() {
        viewmodel.rect2.left(500);
        viewmodel.rect2.top(500);
        var message = "";
        app.showMessage = function (m) {
            message = m;
            return null;
        }
        viewmodel.testIntersection();
        this.areIdentical(3, viewmodel.rectangles().length);
        this.areIdentical("No Intersection", message);
    }
    NoContainementShouldPopMessage() {
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
        }
        viewmodel.testContainement();

        this.areIdentical("No Containement", message);
    }
    ContainementShouldPopMessage() {
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
        }
        viewmodel.testContainement();
        
        this.areIdentical("Rect 1 contains Rect 2", message);
    }
    NoAdjacencyShouldPopMessage() {
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
        }
        viewmodel.testAdjacency();

        this.areIdentical("Rectangles are not adjacents", message);
    }
    AdjacencyShouldPopMessage() {
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
        }
        viewmodel.testAdjacency();

        this.areIdentical("Rectangle are adjacents", message);
    }
    
    
}


