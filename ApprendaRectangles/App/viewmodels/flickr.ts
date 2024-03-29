/// <reference path="../durandal/durandal.d.ts" />
/// <reference path="../../scripts/knockout.d.ts" />

import app = module('durandal/app');
import http = module('durandal/http');

export var displayName = 'Flickr';
export var images = ko.observableArray([]);

export function activate() {
    //the router's activator calls this function and waits for it to complete before proceding
    if (this.images().length > 0) {
        return;
    }

    var that = this;
    return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'mount ranier', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function (response) {
        that.images(response.items);
    });
}

export function select(item) {
    //the app model allows easy display of modal dialogs by passing a view model
    //views are usually located by convention, but you an specify it as well with viewUrl
    item.viewUrl = 'views/detail';
    app.showModal(item);
}

export function canDeactivate() {
    //the router's activator calls this function to see if it can leave the screen
    return app.showMessage('Are you sure you want to leave this page ?', 'Navigate', ['Yes', 'No']);
}