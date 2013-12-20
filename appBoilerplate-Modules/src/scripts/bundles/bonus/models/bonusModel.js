/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    "jquery", 
    "underscore", 
    "backbone", 
    "../externalService/external"
], function ($, _, Backbone, ExternalService) {

    'use strict';

    var BonusModel = Backbone.Model.extend({

    defaults: {
      nameView:    null,
      callSlot:     false,
      callBonus:    false,
      callHelp:     false

    },
    
    initialize: function(){
      console.log(" -- INICIO BONUS-MODEL");
      // inicio de SLOT-MODEL y agrega el External-Service
      window.externalService = new ExternalService();
    },

    open: function(nameView) {
      console.log("se abrio bonusModel");
      // add del model al Task Manager
      this.addModel(nameView);
    },

    close: function(){
      console.log("llama a close bonusModel");
      this.removeModel();
    },
    pause: function(){
      console.log("se hizo pause bonusModel");
    },
    resume: function(){
      console.log("se hizo resume bonusModel");
    },

    // agrega este modelo al TaskManager y set de variables default del modelo
    addModel: function(nameView) {
        slotCollection.add(this);
        //console.log(slotCollection);
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
        location.href = "#"+changeView;
    }*/     

  });

  return BonusModel;
});
