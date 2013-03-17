/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />
/// <reference path="../../scripts/typings/easeljs/easeljs.d.ts" />

/// <reference path="SimpleEntryHandlers.ts" />
/// <reference path="../entities/shapes.ts" />

import app = module('durandal/app');
import system = module('durandal/system');
import Shapes = module('../entities/shapes');
import handlers = module('./SimpleEntryHandlers');

export class ObservableRect {
    public _rect: Shapes.Rectangle;
    public left = ko.observable(0);
    public top = ko.observable(0);
    public width = ko.observable(0);
    public height = ko.observable(100);

    constructor(public rect: Shapes.Rectangle) {
        this._rect = rect;//save original
        this.left(rect.left);
        this.top(rect.top);
        this.width(rect.width);
        this.height(rect.height);
    }
    public getRect(): Shapes.Rectangle {
        //copie observable values to original
        this._rect.left = +this.left.peek();
        this._rect.top = +this.top.peek();
        this._rect.width = +this.width.peek();
        this._rect.height = +this.height.peek();
        
        return this._rect;
    }
}

export var displayName = 'Simple Entry';
export var rect1 = new ObservableRect(new Shapes.Rectangle(0,0,100,100,"rect 1"));
export var rect2 = new ObservableRect(new Shapes.Rectangle(50, 50, 100, 100, "rect 2"));
rect2._rect.color = new Shapes.Color(0, 0, 255);
export var rectangles = ko.observableArray([rect1, rect2]);

export function testIntersection() {
    var inter = rect1.getRect().Intersection(rect2.getRect());
    if (inter == null) {
        return app.showMessage('No Intersection');
    }
    inter.color = new Shapes.Color(0, 255, 0);//Green
    var oRect = new ObservableRect(inter);
    rectangles.push(oRect);
}

export function testContainement() {
    if (rect1.getRect().Contains(rect2.getRect())) {
        return app.showMessage("Rect 1 contains Rect 2");
    }
    if (rect2.getRect().Contains(rect1.getRect())) {
        return app.showMessage("Rect 2 contains Rect 1");
    }
    return app.showMessage("No Containement");
}
export function testAdjacency() {
    if (rect1.getRect().Adjacent(rect2.getRect())) {
        return app.showMessage('Rectangle are adjacents');
    }
    return app.showMessage("Rectangles are not adjacents");

}
export function activate() {
    //the router's activator calls this function and waits for it to complete before proceding
    //GG:we need to use the dependency otherwise the typescript compiler optimize
    //and removes the deps from AMD Module
    handlers.test();
    
}