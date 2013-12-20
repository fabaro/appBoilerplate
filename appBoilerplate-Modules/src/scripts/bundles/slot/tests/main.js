/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, QUnit, ok */
define(function (require) {

    // Import depdendencies.
    var Todo = require("../models/todo");

    QUnit.module("todos/models/todo");

    QUnit.test("Is set to complete true", function () {
        var todo = new Todo({completed: true});
        ok(todo.get('completed') === true, "We expect complete true");
        ok(todo.isCompleted() === true, "We expect complete true");
    });

});
