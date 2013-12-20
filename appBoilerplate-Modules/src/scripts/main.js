/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require */

(function () {

    'use strict';

    requirejs.config({
        baseUrl: "scripts/",
        paths: {
            "jquery": "vendors/jquery/jquery",
            "underscore": "vendors/underscore-amd/underscore",
            "backbone": "vendors/backbone-amd/backbone",
            "mustache": "vendors/mustache/mustache",
            "backboneLocalStorage": "vendors/backbone.localStorage/backbone.localStorage",
            "fabric": 'vendors/fabric/fabric-min',
            
            "text": "vendors/requirejs-text/text"
        }
    });

    require(['app'], function (app) {
        app.initialize();
    });

}());
