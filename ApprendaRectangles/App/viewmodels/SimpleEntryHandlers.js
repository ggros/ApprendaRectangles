define(["require", "exports"], function(require, exports) {
    
    function test() {
    }
    exports.test = test;
    ko.bindingHandlers['hasFocus'] = {
        init: function (element, valueAccessor) {
            console.log("init hasFocus");
        },
        update: function (element, valueAccessor) {
        }
    };
    ko.bindingHandlers['rectangles'] = {
        lastArray: [],
        doupdate: false,
        stage: null,
        container: null,
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var self = this;
            var tick = function () {
                if(self.doupdate) {
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
            var arr = ko.utils.unwrapObservable(valueAccessor());
            var doupdate = false;
            var modelValue = valueAccessor();
            var canvas = element;
            var h = function (target, rect) {
                target.onPress = function (e) {
                    $(canvas).css('cursor', 'pointer');
                    self.container.addChild(target);
                    var offset = {
                        x: target.x - e.stageX,
                        y: target.y - e.stageY
                    };
                    e.onMouseMove = function (ev) {
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
            var added = ko.utils.arrayFilter(testArr, function (item) {
                return (item.status == "added");
            });
            var removed = ko.utils.arrayFilter(testArr, function (item) {
                return (item.status == "removed");
            });
            self.lastArray = ko.utils.arrayMap(arr, function (x) {
                return x;
            });
            ko.utils.arrayForEach(added, function (obj) {
                var rect = obj.value;
                console.log("rendering rect: " + rect._rect.name);
                var shape = new createjs.Shape();
                var label = new createjs.Text(rect._rect.name, "bold 14px Arial", "#FFFFFF");
                label.textAlign = "center";
                label.x = rect.width() / 2;
                label.y = -7 + rect.height() / 2;
                var color = rect._rect.color;
                shape.graphics.beginFill(createjs.Graphics.getRGB(color.R, color.G, color.B)).drawRect(0, 0, rect.width(), rect.height());
                var shape1 = new createjs.Container();
                shape1.x = rect.left();
                shape1.y = rect.top();
                shape1.addChild(shape, label);
                h(shape1, rect);
                self.container.addChild(shape1);
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
        }
    };
})
