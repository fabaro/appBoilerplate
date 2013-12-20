/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric'
], function ($, _, Backbone, Fabric) {

  'use strict';

  
  var CanvasObjectsModel = Backbone.Model.extend({
  	// FUNCTION CONTROL OBJECT IN CANVAS
    initialize: function(object, selector){
          object.hasControls = object.hasBorders = false;
          
          if (selector!=true){
          	object.selectable = false;
            object.hasRotatingPoint = object.lockRotation = true;
    		    object.lockMovementY = object.lockMovementX = true;
    		    object.lockScalingX = object.lockScalingY = true;

          } else {
          	object.selectable = true;
  	      	object.hasRotatingPoint = object.lockRotation = true;
  	      	object.lockMovementY = object.lockMovementX = true;
  	      	object.lockScalingX = object.lockScalingY = true;
  	      	object.hoverCursor = 'pointer';
          }
    }

  });
  
  return CanvasObjectsModel;

});