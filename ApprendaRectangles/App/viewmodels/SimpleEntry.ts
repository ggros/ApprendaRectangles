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
        this.left(rect && rect.left || 0);
        this.top(rect && rect.top || 0);
        this.width(rect && rect.width || 100);
        this.height(rect && rect.height || 100);
    }
    public getRect(): Shapes.Rectangle {
        //copie observable values to original
        this._rect.left = this.left();
        this._rect.top = this.top();
        this._rect.width = this.width();
        this._rect.height = this.height();
        
        return this._rect;
    }
}

export var displayName = 'Simple Entry';
export var rect1 = new ObservableRect(new Shapes.Rectangle(0,0,100,100,"rect 1"));
export var rect2 = new ObservableRect(new Shapes.Rectangle(50, 50, 100, 100,"rect 2"));
export var rectangles = ko.observableArray([rect1, rect2]);

export function testRectangles() {
    var inter = rect1.getRect().Intersection(rect2.getRect());
    console.log(inter);
    //alert(inter.left);
    return app.showMessage('Test Inter');    
}


export function activate() {
    //the router's activator calls this function and waits for it to complete before proceding
    //GG:we need to use the dependency otherwise the typescript compiler optimize
    //and removes the deps from AMD Module
    handlers.test();
    
}