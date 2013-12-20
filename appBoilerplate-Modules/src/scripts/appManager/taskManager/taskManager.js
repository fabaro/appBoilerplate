/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */
define([
    "jquery",
    "underscore",
    "backbone",
    "backboneLocalStorage"
], function ($, _, Backbone, BackboneLocalStorage) {

    'use strict';

    var TaskManagerCollection = Backbone.Collection.extend({

        initialize: function() {
          console.log("INICIO TASK-MANAGER");
          this.listenerModels();        
        },

        listenerModels: function(){
          var that = this;
          this.on('change', function(model){ 
            // escucha si tiene que llamar a la vista callSlot
            if (model.hasChanged("callSlot")) {
              var callShowState = model.get('callSlot');
              switch(callShowState){
                case false:
                  //model.open();
                break;

                case true:
                  console.log('callSlot:true entonces primero close actual model: '+this.models[0].get('activeView'));
                  model.close();
                  this.models[0].set('changeActiveView', 'slot');
                  
                break;
              }
            }

            // escucha si tiene que llamar a la vista CallBonus
            if (model.hasChanged("callBonus")) {
              var callShowState = model.get('callBonus');
              switch(callShowState){
                case false:
                  //model.open();
                break;

                case true:
                  console.log('callBonus:true entonces primero close actual model: '+this.models[0].get('activeView'));
                  model.close();
                  this.models[0].set('changeActiveView', 'bonus');
                  
                break;
              }
            }

            // escucha si tiene que llamar a la vista callHelp
            if (model.hasChanged("callHelp")) {
              var callShowState = model.get('callHelp');
              switch(callShowState){
                case false:
                  //model.open();
                break;

                case true:
                  console.log('callHelp:true entonces primero close actual model: '+this.models[0].get('activeView'));
                  model.close();
                  this.models[0].set('changeActiveView', 'help');
                  
                break;
              }
            }

            
          });
        },

    });

    return TaskManagerCollection;
});
