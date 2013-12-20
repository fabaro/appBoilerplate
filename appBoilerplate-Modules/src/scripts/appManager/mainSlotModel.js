/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'fabric',
    'mustache',
    'appManager/resizeModel/canvasResize',
    'appManager/buttonBarModel/buttonBar',
    'text!appManager/templates/slotTemplate.html'
], function ($, _, Backbone, Fabric, Mustache, CanvasResizeModel, ButtonBarModel, slotTemplate) {
 
  'use strict';

  var mainSlotModel = Backbone.Model.extend({
    
    defaults: {
        activeView: null,
        changeActiveView: null,
    },
    
    initialize: function(){
      console.log("INICIO MAIN-MODEL");
      //Inicio del canvasResize
      window.canvasResizeModel = new CanvasResizeModel();
      // Inicio de la botonera si se debe mostrar
      window.buttons = canvasResizeModel.get('widgetButtons');
      // inicio la botonera
      window.buttonBarModel = new ButtonBarModel();

      slotCollection.add(this);
      
    },
    
    open: function() {
      console.log("se abrio mainSlotModel");
    },

    close: function(){
      console.log("se cerro mainSlotModel");
    },
    pause: function(){
      console.log("se hizo pause mainSlotModel");
    },
    resume: function(){
      console.log("se hizo resume mainSlotModel");
    },

    // function set WIDTH/HEIGHT en el Template/Canvas ----------------------------------------------------------------------------------
    setTemplate: function(buttons){
        // create de variables para enviar al template de canvas Wrapper y canvas Game
        window.widthWrapper  = canvasResizeModel.get('wrapperW');
        window.heightWrapper = canvasResizeModel.get('wrapperH');
        window.widthCanvas   = canvasResizeModel.get('canvasW');
        window.heightCanvas  = canvasResizeModel.get('canvasH');
        var datos = {     wrapperW : widthWrapper, 
                          wrapperH : heightWrapper,
                          gameW : widthCanvas, 
                          gameH : heightCanvas
                          };
        window.compiledTemplate = _.template( slotTemplate, datos );
        
        // true/ false set height del canvas si muestra la botonera en porcentaje
        switch (buttons) {
          case false:
            window.heightGame = heightCanvas;
            window.heightButtons = 0;
          break;

          default:
            window.heightGame = (heightCanvas*85)/100;
            window.heightButtons = (heightCanvas*15)/100;
          break;
        }      
    },

    // function que da las proporciones de objetos en canvas segun el tamaño de wrapper ------------------------------------------------------------
    setFullscreen: function(canvas, nameCanvas){
            
            
        // variables que setea WIDTH/HEIGHT segun la escala del canvas
        var container = $('#'+nameCanvas);
        
        if (nameCanvas=='canvasGame'){

          $( ".canvas-container" ).last().addClass( "selected" );
          //console.log($(".selected"));
          var divContainer = $(".selected");
          this.centerCanvas(canvas, divContainer);

          // fundamental para el funcionamiento del boton
          canvas.calcOffset();
          canvas.renderAll();
        }
        
        this.centerCanvas(canvas, container);

    },
    // function centrar siempre el canvas
    centerCanvas: function(canvas, nameDiv){

        // variables que determinan la scala del canvas
        var w=window.innerWidth/canvas.width;
        var h=window.innerHeight/canvas.height;
        var scale=Math.min(h,w);
            

        nameDiv.css('width',(canvas.width*scale)+'px');
        nameDiv.css('height',(canvas.height*scale)+'px');
        
        // variables que centran el canvas al wrapper
        nameDiv.css('position','fixed');
        nameDiv.css('left','50%');
        nameDiv.css('top','50%');
        nameDiv.css('margin-left',-(canvas.width*scale)/2+'px');
        nameDiv.css('margin-top',-(canvas.height*scale)/2+'px');

    },

    
    // function set new canvas y genera figuras ----------------------------------------------------------------------------------
    setWrapper: function(nameCanvas){
      var drawWrapX = widthWrapper/2;
      var drawWrapY = heightWrapper/2;
      
      // crea nuevo canvas con fabric.js
      window.wrapper = this.__canvas = new fabric.Canvas(nameCanvas, {width: widthWrapper, height: heightWrapper, backgroundColor:'#ccc', selectable:false});
      
      // set scale de wrapper y dibuja el wrapper X
      this.setFullscreen(wrapper, nameCanvas);
      this.drawWrapper(wrapper, drawWrapX, drawWrapY, widthWrapper, heightWrapper);
      
      // function que persive si la pantalla es Landscape o Portrait
      this.update();
    },

    // function dibuja figura utilizando Fabric.js ----------------------------------------------------------------------------------
    drawWrapper: function(canvas, x, y, width, height) {
        // defino X/Y punto de inio/final de la lineaLeft
        var inicioX = x - width;
        var inicioY = y - height;
        var finalX = x + width;
        var finalY = y + height;
        var arrowLeft = new fabric.Line([inicioX, inicioY, finalX, finalY], {stroke: '#000', strokeWidth: 3, selectable:false});
        
        // defino X/Y punto de inio/final de la lineaRight
        var inicioX = x + width;
        var inicioY = y - height;
        var finalX = x - width;
        var finalY = y + height;
        var arrowRight = new fabric.Line([inicioX, inicioY, finalX, finalY], {stroke: '#000', strokeWidth: 3, selectable:false});
        
        // agrega objetos al canvas
        canvas.add(arrowLeft, arrowRight);
    },

    // function set widget buttons y genera nuevo tamaño ----------------------------------------------------------------------------------
    drawButtons: function(canvas){
        var drawX = widthCanvas/2;
        var drawY = heightCanvas-(heightButtons/2);
          
        // crea espacio de la BOTONERA
        var buttonsBox = new fabric.Rect({name:'buttonsBox', top: drawY, left: drawX, width: widthCanvas, height: heightButtons, fill: '#99f', selectable:false});
        var buttonsText = new fabric.Text('Buttons', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial', selectable:false});
        canvas.add(buttonsBox, buttonsText);
        
        buttonBarModel.drawSpin(canvas, drawX, drawY, widthCanvas, heightButtons);
        
    },
    // update de la vista al tener el nuevo canvas
    update: function() {
        canvasResizeModel.update();
    },
    // function que envia datos a la View que llame a este Model
    callRender: function() {
        this.setTemplate(buttons);
        this.setWrapper('canvasWrapper');
    }


  });

  return mainSlotModel;

});