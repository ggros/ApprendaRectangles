/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />
/// <reference path="../../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../entities/shapes.ts" />
/// <reference path="./SimpleEntry.ts" />

//Binding Handlers used in SimpleEntry View

//import viewModel
import vm = module("SimpleEntry");

//dummy function
export function test() { }

ko.bindingHandlers['hasFocus'] = {
    init: function (element, valueAccessor) {
        console.log("init hasFocus");
    },
    update: function (element, valueAccessor) { }
}

//Binding handler to bind an array of ObservableRectangle to a canvas using easeljs
ko.bindingHandlers['rectangles'] = {
    lastArray: [],
    doupdate: false,
    stage: null,
    container: null,
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var self = this;
        var tick = function () {
            //console.log("FPS:"+self.doupdate);
            if (self.doupdate) {
                self.doupdate = false;
                self.stage.update();
            }
        };
        self.stage = new createjs.Stage(element);
        self.stage.enableMouseOver(1);
        self.container = new createjs.Container();
        self.stage.addChild(self.container);


        self.stage.update();
        self.doupdate = false;
        createjs.Ticker.addEventListener("tick", tick);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var self = this;
        var arr = <vm.ObservableRect[]>ko.utils.unwrapObservable(valueAccessor());
        var doupdate = false;
        var modelValue = valueAccessor();        
        var canvas = element;

        //wrapper function to provide scope for events
        var h = function (target, rect) {            
            target.onPress = function (e) {
                //canvas.style.cursor = 'pointer';
                $(canvas).css('cursor', 'pointer');
                // bump the target in front of it's siblings:
                self.container.addChild(target);
                var offset = { x: target.x - e.stageX, y: target.y - e.stageY };

                e.onMouseMove = function (ev) {
                    //No need to set target.x it will be done because
                    //there is an observer on left and top
                    rect.left(ev.stageX + offset.x);
                    rect.top(ev.stageY + offset.y);
                };
            };
            target.onMouseOver = function () {
            };
            target.onMouseOut = function () {
            };
        };
        var testArr = ko.utils.compareArrays(this.lastArray, arr);
        var added = ko.utils.arrayFilter(testArr, function (item) { return (item.status == "added") });
        var removed = ko.utils.arrayFilter(testArr, function (item) { return (item.status == "removed") });
        self.lastArray = ko.utils.arrayMap(arr, function (x) { return x; });
        //create rectangles that have been added on stage main container
        ko.utils.arrayForEach(added, function (obj) {
            var rect:vm.ObservableRect = obj.value;
            //var rect = ko.utils.unwrapObservable(r);
            console.log("rendering rect: " + rect._rect.name);
            var shape = new createjs.Shape();
            var label = new createjs.Text(rect._rect.name, "bold 14px Arial", "#FFFFFF");
            label.textAlign = "center";
            label.x = rect.width() / 2;
            label.y = -7 + rect.height() / 2;
            var color = rect._rect.color;
            shape.graphics.beginFill(createjs.Graphics.getRGB(color.R, color.G, color.B)).drawRect(0, 0, rect.width(), rect.height());
            //set origin at 0,0
            //shape.regX = 0;
            //shape.regY = 0;

            var shape1 = new createjs.Container();
            shape1.x = rect.left();
            shape1.y = rect.top();
            shape1.addChild(shape, label);
            h(shape1, rect);
            self.container.addChild(shape1);

            //observe
            rect.left.subscribe(function (newValue) {
                shape1.x = newValue;
                self.doupdate = true;
            });
            rect.top.subscribe(function (newValue) {
                shape1.y = newValue;
                self.doupdate = true;
            });
            var updateSize = function (newValue) {
                shape.graphics.clear();
                shape.graphics.beginFill(createjs.Graphics.getRGB(color.R, color.G, color.B)).drawRect(0, 0, rect.width(), rect.height());
                self.stage.update();
            };
            rect.width.subscribe(updateSize);
            rect.height.subscribe(updateSize);
        });
        self.doupdate = true;
        //TODO: also remove? Not implemented in view anyway
        

        
        
    }
};
