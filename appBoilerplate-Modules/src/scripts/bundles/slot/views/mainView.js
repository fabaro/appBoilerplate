/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric',
    'mustache',
    '../models/slotModel'
], function ($, _, Backbone, Fabric, Mustache, SlotModel) {

    'use strict';

    var mainView = Backbone.View.extend({

        el: $("#page"),
        name: 'slot',
        initialize: function(){
          
          // init de view slot
          console.log('INICIO SLOT-VIEW');
          var nameView = this.name;
          
          // INICIO MAIN-MODEL
          //window.mainSlotModel = new MainSlotModel();
          mainSlotModel.set('activeView', nameView);
          mainSlotModel.setTemplate(buttons);
          
          // INICIO SLOT-MODEL
          window.slotModel = new SlotModel();
          slotModel.open(nameView);

          // callRender genera vista SLOT-VIEW
          this.callRender();
          this.render();
        },
        
        render: function(){
          
          var that = this;
          this.spin();

          // toma cambios de pantalla de resolution/orientation
          $(window).resize(function() {
              
              canvasResizeModel.resizeScale(canvas);
              that.callRender();
              console.log('estas aqui slotView');
          });

        },

        // function set new canvas y genera figuras ----------------------------------------------------------------------------------
        setSlot: function(){
          var nameCanvas = 'canvasGame';
          var drawX = widthCanvas/2;
          var drawY = heightCanvas/2;
          
          // crea nuevo canvas con fabric.js
          window.canvas = this.__canvas = new fabric.Canvas(nameCanvas, {width: widthCanvas, height: heightCanvas, backgroundColor:'#c6c', selectable:false});
          // set scale de canvas y dibuja el canvas
          mainSlotModel.setFullscreen(canvas, nameCanvas);
          
          // true/false si debe mostrar la botonera, por defecto es true
          switch (buttons) {
            case false:
              this.drawSlot(canvas);
            break;

            default:
              this.drawSlot(canvas);
              mainSlotModel.drawButtons(canvas);
            break;
          }
          
          // function que persive si la pantalla es Landscape o Portrait
          mainSlotModel.update();
          
        },

        // function set widget game y genera nuevo tamaño ----------------------------------------------------------------------------------
        drawSlot: function(canvas){
            var drawX = widthCanvas/2;
            var drawY = heightGame/2;
            
            // crea espacio del GAME
            var gameBox = new fabric.Rect({name:'gameBox', top: drawY, left: drawX, width: widthCanvas, height: heightGame, fill: '#6f6', selectable:false});
            var gameText = new fabric.Text('Game', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial', selectable:false});
            canvas.add(gameBox, gameText);
            
          
        },

        // llama a doSpin en SLOT-MODEL
        spin: function() {
            slotModel.doSpin();
        },

        // callRender llama al template y function CallRender en el MAIN-MODEL
        callRender: function(){
          this.$el.html(compiledTemplate); 
          mainSlotModel.callRender();
          // SET SLOT-VIEW parametros para generar canvas y contenido
          this.setSlot();
          buttonBarModel.doSpin(canvas);
        },

        doRemove: function(){
          //var view = this;
          //console.log(view);
          //var view = this;
          //view.remove();
          //view.unbind();
          console.log('remove SLOT-VIEW');
        }

    });


    return mainView;
});
