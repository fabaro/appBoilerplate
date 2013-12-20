/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([ "./views/mainView"], function (MainView) {

    'use strict';

    return function () {

        // This function will be the initialization function
        // everytime this bundle is requested from the Router
        //
        // So add all your logic here. Eg: loading views, models, setup events etc..
        var mainView = new MainView();
    };

});
