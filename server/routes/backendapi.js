"use strict";
exports.__esModule = true;
exports.BackendApi = void 0;
var uuid_1 = require("uuid");
var BackendApi = /** @class */ (function () {
    function BackendApi() {
    }
    BackendApi.prototype.updateTask = function (req, res) {
        //update the current list
        var fs = require('fs');
        var rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded = JSON.parse(rawdata);
        var taskFound = req.body;
        var itemFound = false;
        currentTasksLoaded.forEach(function (item) {
            if (item.id == req.params.id) {
                console.log("ID Found : " + item.id);
                item.id = req.body.id;
                item.title = req.body.title;
                item.actor = req.body.actor;
                item.description = req.body.description;
                item.category = req.body.category;
                item.estimate = req.body.estimate;
                item.status = req.body.status;
                item.updateDate = req.body.updateDate;
                item.startDate = req.body.startDate;
                item.endDate = req.body.endDate;
                item.creationDate = req.body.creationDate;
                item.order = req.body.order;
                console.log("Order Found : " + req.body.order);
                console.log("New Order : " + item.order);
                taskFound = item;
                itemFound = true;
            }
        });
        if (!itemFound) {
            //New task to add
            currentTasksLoaded.push(req.body);
        }
        //Save in file
        var data = JSON.stringify(currentTasksLoaded, null, 2);
        fs.writeFileSync('server/data/saveTasks.json', data);
        res.json(taskFound);
    };
    BackendApi.prototype.createTask = function (req, res) {
        //update the current list
        var fs = require('fs');
        var rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded = JSON.parse(rawdata);
        var taskFound = req.body;
        var itemFound = false;
        var newTaskToCreate = {
            id: (0, uuid_1.v4)(),
            title: taskFound.title,
            actor: taskFound.actor,
            description: taskFound.description,
            category: taskFound.category,
            estimate: taskFound.estimate,
            status: 'todo',
            order: -1,
            creationDate: new Date(),
            updateDate: new Date(0),
            startDate: new Date(0),
            endDate: new Date(0)
        };
        currentTasksLoaded.push(req.body);
        //Save in file
        var data = JSON.stringify(currentTasksLoaded, null, 2);
        fs.writeFileSync('server/data/saveTasks.json', data);
        res.json(taskFound);
    };
    BackendApi.prototype.updateTasks = function (req, res) {
        //update the current list
        var currentTasksLoaded = req.body;
        var fs = require('fs');
        //Save in file
        var data = JSON.stringify(currentTasksLoaded, null, 2);
        fs.writeFileSync('server/data/saveTasks.json', data);
        res.json(data);
    };
    BackendApi.prototype.getTasks = function (req, res) {
        var fs = require('fs');
        var rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded = JSON.parse(rawdata);
        res.json(currentTasksLoaded);
    };
    return BackendApi;
}());
exports.BackendApi = BackendApi;
