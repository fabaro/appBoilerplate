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
        
        // si cambia en TaskManager valor de: changeActiveView cambia la VIEW
        slotCollection.on('change:changeActiveView', function(){
            console.log('-------- cambio changeActiveView value = ---------'+slotCollection.models[0].get('changeActiveView'));
            // llama a la function CALLVIEW
            callView(slotCollection.models[0].get('changeActiveView'));
        });
        
        // SI ES LA 1ERA VEZ CARGA VISTA DEFAULT  
        if (this.currentView==null){
            callView(slotCollection.models[0].get('activeView'));
        }

    });

     var callView = function(activeCallView){
        // Switch carga vista segun valor de activeCallView
        switch (activeCallView){
          case 'slot':
            console.log('ROUTER CALL SLOT-VIEW');
            router.loadModule("bundles/"+activeCallView+"/main");
          break;

          case 'bonus':
            console.log('ROUTER CALL BONUS-VIEW');
            router.loadModule("bundles/"+activeCallView+"/main");
          break;

          default:
            console.log('ROUTER CALL DEFAULT VIEW');
            // cambio valor de CURRENTVIEW para que la proxima ves pida un valor
            router.currentView = activeCallView;
            router.loadModule("bundles/slot/main");
          break;
        }
    };

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
