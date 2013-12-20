/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric',
    '../resizeModel/canvasObjects'
], function ($, _, Backbone, Fabric, CanvasObjectsModel) {

  'use strict';

  var ButtonBarModel = Backbone.Model.extend({
    initialize: function(){
      console.log(" -- INICIO BUTTON-BAR");
    },
    
    open: function() {
      console.log("se abrio buttonBarModel");
    },

    close: function(){
      console.log("se cerro buttonBarModel");
    },
    pause: function(){
      console.log("se hizo pause buttonBarModel");
    },
    resume: function(){
      console.log("se hizo resume buttonBarModel");
    },

    // function set widget buttons y genera nuevo tamaño ----------------------------------------------------------------------------------
    drawSpin: function(canvas, drawX, drawY, widthCanvas, heightButtons){
        var btnSpin     = new fabric.Rect({name:'btnSpin', top: drawY, left: drawX, width: 100, height: 25, fill: '#f55'});
        var btnSpinText = new fabric.Text('SPIN', {top:drawY, left:drawX, fontSize: 14, textAlign:'left', fontFamily: 'Arial'});
        //var btnFreeSpin     = new fabric.Rect({name:'btnFreeSpin', top: drawY/2, left: drawX/2, width: 100, height: 25, fill: '#f55'});
        //var btnFreeSpinText = new fabric.Text('FREESPIN', {top:drawY/2, left:drawX/2, fontSize: 14, textAlign:'left', fontFamily: 'Arial'});
       
        canvas.add(btnSpin, btnSpinText);
        var canvasObjectsModel = new CanvasObjectsModel(btnSpin, true);
        var canvasObjectsModel = new CanvasObjectsModel(btnSpinText, false);
        //var canvasObjectsModel = new CanvasObjectsModel(btnFreeSpin, true);
        //var canvasObjectsModel = new CanvasObjectsModel(btnFreeSpinText, false);
        
    },
    // function que dispara el evento segun donde se hace click
    doSpin: function(canvas){
        canvas.on('mouse:down', function(e) {
              if (e.target) {
                  if (e.target.name=='btnSpin'){
                      console.log('hizo click spin, eventos: null');
                  } /*else if (e.target.name=='btnFreeSpin'){
                      console.log('hizo click FREEspin, eventos: null');
                  }                  
                  */
                  //canvas.calcOffset();
                  //canvas.renderAll();
              }
        });
    } 

  
  });

  return ButtonBarModel;

});