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
})
//@ sourceMappingURL=SimpleEntryHandlers.js.map
