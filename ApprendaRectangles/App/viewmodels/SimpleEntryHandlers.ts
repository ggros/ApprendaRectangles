/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />

//Handlers used in SimpleEntry View


//dummy function
export function test() { }

ko.bindingHandlers['hasFocus'] = {
    init: function (element, valueAccessor) {
        console.log("init hasFocus");
    },
    update: function (element, valueAccessor) { }

}
