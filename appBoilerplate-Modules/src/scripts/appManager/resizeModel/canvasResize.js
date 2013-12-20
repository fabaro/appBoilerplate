/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric'
], function ($, _, Backbone, Fabric) {
 
  'use strict';

  var CanvasResizeModel = Backbone.Model.extend({
    defaults: {
      wrapperW : window.innerWidth,
      wrapperH : window.innerHeight,
      canvasW: null,
      canvasH: null,
      widgetButtons: true
    },

    initialize: function(){
        console.log("-- INICIO CANVAS-RESIZE");
        //inicio del resize siempre al comienzo
        this.resizeScale();
        
    },

    // function que hace el scale del canvas
    resizeScale: function(canvasName) {

        var wrapperWidth = window.innerWidth;
        var wrapperHeight = window.innerHeight;
          

        if (canvasName==null){
          var width=768;
          var height= 480;
          var w=wrapperWidth/width;
          var h=wrapperHeight/height;
          var scale=Math.min(h,w);
          var canvasWidth = width*scale;
          var canvasHeight = height*scale;

        } else {
          var w=wrapperWidth/canvasName.width;
          var h=wrapperHeight/canvasName.height;
          var scale=Math.min(h,w);
          canvasWidth = canvasName.width*scale;
          canvasHeight = canvasName.height*scale;
        }
        //console.log('resolutions set new: '+window.innerWidth+'x'+window.innerHeight+' yyy '+canvasWidth+'x'+canvasHeight);

        this.set('wrapperW', wrapperWidth);
        this.set('wrapperH', wrapperHeight);
        this.set('canvasW', canvasWidth);
        this.set('canvasH', canvasHeight);

    },
    // function set si debe mostrar botonera
    setWidgetButtons: function(widgetButtonsState){
      this.set('widgetButtons', widgetButtonsState);
    },

    // Update viewport orientation
    //---------------------------------------------------------------------------------------------------------------------------------------------
    updateOrientation : function() {
      this.orientation = window.orientation;
      if(this.orientation === undefined) {
        // No JavaScript orientation support. Work it out.
        if(document.documentElement.innerWidth > document.documentElement.innerHeight) {
          this.orientation = 'landscape';
        } else {
          this.orientation = 'portrait';
        }

      } else if (this.orientation === 0 || this.orientation === 180){
        this.orientation = 'portrait';
      } else {
        this.orientation = 'landscape'; // Assumed default, most laptop and PC screens.
      }
      
    },

    // Get current scale
    //-------------------
    getScale : function() {
      this.viewportScale = undefined;

      // Get viewport width
      var viewportWidth = document.documentElement.innerWidth;

      // Abort. Screen width is greater than the viewport width (not fullscreen).
      if(screen.width > viewportWidth) {
        console.log('Aborted viewport scale measurement. Screen width > viewport width');
        return;

      }

      // Get the orientation corrected screen width
      this.updateOrientation();
      this.screenWidth = screen.width;

      if(this.orientation === 'portrait') {
        // Take smaller of the two dimensions
        if(screen.width > screen.height) this.screenWidth = screen.height;

      }
      else {
        // Take larger of the two dimensions
        if(screen.width < screen.height) this.screenWidth = screen.height;

      }

      // Calculate viewport scale
      this.viewportScale = this.screenWidth / window.innerWidth;
      return this.viewportScale;

    },

    // Update
    //--------  
    update : function(callback) {
      // Clear timeout if already set
      if(this.timeout !== undefined) {
        clearTimeout(this.timeout);
        this.timeout = undefined;

      }

      if(this.delay > 0) {
        // Delay compensates for viewport bounce
        var viewScale = this;

        this.timeout = setTimeout(function() {
          viewScale.getScale();
          if(callback !== undefined) callback();

        }, this.delay);

      }
      else {
        // Immediate scale update
        this.getScale();
        if(callback !== undefined) callback();

      }

    }
    

  });
  
  return CanvasResizeModel;

});
