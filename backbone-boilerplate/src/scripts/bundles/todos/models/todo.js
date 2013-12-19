/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    "jquery", 
    "underscore", 
    "backbone", 
    "../collections/todoList"
], function ($, _, Backbone, TodosCollection) {

    'use strict';

    // Our basic **Todo** model has `title`, `order`, and `done` attributes.
    var Todo = Backbone.Model.extend({

        // Default attributes for the todo item.
        defaults: function () {
            this.todos = new TodosCollection();
            return {
                title: "empty todo...",
                order: this.todos.nextOrder(),
                done: false
            };
        },

        // Ensure that each todo created has `title`.
        initialize: function () {
            if (!this.get("title")) {
                this.set({"title": this.defaults().title});
            }
        },

        // Toggle the `done` state of this todo item.
        toggle: function () {
            this.save({done: !this.get("done")});
        }

    });

    return Todo;
});
