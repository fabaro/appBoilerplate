/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric',
    'mustache',
    '../models/bonusModel'
], function ($, _, Backbone, Fabric, Mustache, BonusModel) {

    'use strict';

    var mainView = Backbone.View.extend({

        el: $("#page"),
        name: 'bonus',
        initialize: function(){
          
          // init de view slot
          console.log('INICIO BONUS-VIEW');
          var nameView = this.name;
          
          // INICIO MAIN-MODEL
          mainSlotModel.set('activeView', nameView);
          mainSlotModel.setTemplate(buttons);
          
          // INICIO SLOT-MODEL
          window.bonusModel = new BonusModel();
          bonusModel.open(nameView);

          // callRender genera vista BONUS-VIEW
          this.callRender();

          this.render();
        },
        
        render: function(){
      
          var that = this;
          
          // toma cambios de pantalla de resolution/orientation
          $(window).resize(function() {
              
              canvasResizeModel.resizeScale(canvas);
              that.callRender();
              console.log('estas aqui BonusView');
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
            var gameBox = new fabric.Rect({name:'gameBox', top: drawY, left: drawX, width: widthCanvas, height: heightGame, fill: '#66f', selectable:false});
            var gameText = new fabric.Text('---Bonus---', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial', selectable:false});
            canvas.add(gameBox, gameText);
            
        },

        // callRender llama al template y function CallRender en el MAIN-MODEL
        callRender: function(){
          this.$el.html(compiledTemplate); 
          mainSlotModel.callRender();
          // SET SLOT-VIEW parametros para generar canvas y contenido
          this.setSlot();
          buttonBarModel.doSpin(canvas);
        }

    });


    return mainView;
});
