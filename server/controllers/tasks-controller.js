"use strict";
exports.__esModule = true;
exports.TasksController = void 0;
var TasksController = /** @class */ (function () {
    function TasksController() {
    }
    TasksController.prototype.getTasksFromFile = function () {
        var fs = require('fs');
        var rawdata = fs.readFileSync('data/saveTasks.json');
        var currentTasksLoaded = JSON.parse(rawdata);
        return currentTasksLoaded;
    };
    return TasksController;
}());
exports.TasksController = TasksController;
