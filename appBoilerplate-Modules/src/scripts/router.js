/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    "underscore", 
    "backbone",
    "appManager/taskmanager/taskManager",
    "appManager/mainSlotModel"
], function (_, Backbone, taskManagerCollection, MainSlotModel) {

    'use strict';

     // Router
    var Router = Backbone.Router.extend({
        initialize: function(el) {
          console.log('INICIO ROUTER');
          this.el = el;
          // inicio del Task Manager
          window.slotCollection = new taskManagerCollection([]);
          //inicio de MainModel (carga: CanvasResize/ButtonBar/SlotTemplate)
          window.mainSlotModel = new MainSlotModel();
          
          
        },
        routes: {
            "*actions": "home",
            //"bonus": "bonus"
            
        },

        currentView: null,

        loadModule: function (module) {
            require([module], function (module) {
                module();
            });
        }
    });

    return new Router();
});
