/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    'jquery',
    'underscore',
    'backbone',
    'backboneLocalStorage',
    'mustache',
    'router'
], function ($, _, Backbone, Mustache, BackboneLocalStorage, router) {

    'use strict';

    // Add your modules routing here
    router.on("route:home", function (actions) {
        this.loadModule("bundles/todos/main");
        console.log('ingresa a url');
    });

    // Add your modules routing here
    router.on("route:foo", function () {
        this.loadModule("bundles/foo/main");
    });

    var root = $("[data-main][data-root]").data("root");
    root = root ? root : '/';

    return {
        initialize: function () {
            Backbone.history.start({
                pushState: true,
                root: root
            });
        }
    };
});
