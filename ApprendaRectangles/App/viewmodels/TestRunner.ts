/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />

/// <reference path="../../Scripts/tsUnit.ts" />
/// <reference path="../entities/shapes.ts" />

import app = module('durandal/app');
import system = module('durandal/system');
import Shapes = module('../entities/shapes');
import tsUnit = module('../../Scripts/tsUnit');

export var errors = ko.observableArray([]);
export var passes = ko.observableArray([]);;

export function activate() {

    var self = this;
    //the router's activator calls this function and waits for it to complete before proceding
    var target = new Shapes.Point(1, 5);   

    

    // new instance of tsUnit
    var test = new tsUnit.Test();

    // add your test class (you can call this multiple times)
    test.addTestClass(new PointTests(), "Points Tests");

    var res = test.run();

    errors(res.errors);
    passes(res.passes);

    //return app.showMessage('Errors: '+res.errors.length);
    
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
