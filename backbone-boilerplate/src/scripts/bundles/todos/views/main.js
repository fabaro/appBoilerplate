/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    '../collections/todoList',
    './todoView',
    'text!../templates/statesTemplate.html'
], function ($, _, Backbone, Mustache, TodosCollection, TodoView, statesTemplate) {

    'use strict';

    var mainView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#todoapp"),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #new-todo":  "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.template = statesTemplate;

            this.Todos = new TodosCollection();
            this.input = this.$("#new-todo");
            this.allCheckbox = this.$("#toggle-all")[0];

            this.listenTo(this.Todos, 'add', this.addOne);
            this.listenTo(this.Todos, 'reset', this.addAll);
            this.listenTo(this.Todos, 'all', this.render);

            this.footer = this.$('footer');
            this.main = $('#main');

            this.Todos.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
            var done = this.Todos.done().length;
            var remaining = this.Todos.remaining().length;

            if (this.Todos.length) {
                this.main.show();
                this.footer.show();
                var rendered = Mustache.to_html(this.template, {done: done, remaining: remaining});
                this.footer.html(rendered);
            } else {
                this.main.hide();
                this.footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(todo) {
            var view = new TodoView({model: todo});
            this.$("#todo-list").append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            this.Todos.each(this.addOne, this);
        },

        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            this.Todos.create({title: this.input.val()});
            this.input.val('');
        },

        // Clear all done todo items, destroying their models.
        clearCompleted: function() {
            _.invoke(this.Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var done = this.allCheckbox.checked;
            this.Todos.each(function (todo) { todo.save({'done': done}); });
        }

    });


    return mainView;
});
