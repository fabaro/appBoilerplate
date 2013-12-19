/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    "underscore", 
    "backbone"
], function (_, Backbone) {

    'use strict';

     // Router
    var Router = Backbone.Router.extend({
        loadModule: function (module) {
            require([module], function (module) {
                module();
            });
        }
    });

    return new Router();
});
