/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    "jquery", 
    "underscore", 
    "backbone", 
    "../externalService/external"
], function ($, _, Backbone, ExternalService) {

    'use strict';

    // Our basic **Todo** model has `title`, `order`, and `done` attributes.
    var SlotModel = Backbone.Model.extend({

        defaults: {
          nameView:    null,
          callSlot:     false,
          callBonus:    false,
          callHelp:     false

        },

        initialize: function(){
          console.log(" -- INICIO SLOT-MODEL");
          // inicio de SLOT-MODEL y agrega el External-Service
          window.externalService = new ExternalService();      
          // Inicia function que escucha cambios del ExternalService
          this.externalServiceOnChange();
                
        },
        
        open: function(nameView) {
          console.log("se abrio SlotModel");
          // add del model al Task Manager
          this.addModel(nameView);
        },

        close: function(){
          console.log('llama a close SlotModel')
          //this.set('closeModel', true);
          this.removeModel();
        },
        pause: function(){
          console.log("se hizo pause SlotModel");
        },
        resume: function(){
          console.log("se hizo resume SlotModel");
        },

        // Le envia al External-Service que haga Spin
        doSpin: function(){
          externalService.doSpin();
        },
        
        // escucha cambios o info que le envia el External-Service
        externalServiceOnChange: function(){
          var that = this;
          externalService.on('change', function(){
            
            // escucha SLOT-MODEL cambios en EXTERNAL-SERVICE dice openFreeSpin: true
            if (externalService.hasChanged("openBonus")) {
              var openBonusState = this.get('openBonus');
              switch (openBonusState) {
                case true:
                  console.log('escucha SLOT-MODEL cambios en EXTERNAL-SERVICE dice openBonus: '+this.get('openBonus'));
                  that.openBonus();
                break;

                case false:
                  console.log('no hubo respuesta de EXTERNAL-SERVICE');
                break;
              }
            }
            
            
          });
        },
        
        // si llega la orden del External-Service que abra OpenBonus/FreeSpin
        openBonus: function() {
          this.set('callBonus', true);
        },
        
        // agrega este modelo al TaskManager y set de variables default del modelo
        addModel: function(nameView) {
            slotCollection.add(this);
            this.set('nameView', nameView);
            console.log('hizo add de model y agrega nameView: '+this.get('nameView'));
            
        },
        
        // quita este modelo del TaskManager
        removeModel: function() {
            slotCollection.pop();
            console.log('hizo REMOVE de model');
            //this.changerViews();
            
        },
        /*
        changerViews: function(){
            var changeView = slotCollection.models[0].get('changeActiveView');
            console.log('view to load: '+changeView);
            location.href = "#/"+changeView;
        }
        */

    });

    return SlotModel;
});
