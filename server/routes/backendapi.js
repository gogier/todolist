"use strict";
exports.__esModule = true;
exports.BackendApi = void 0;
var BackendApi = /** @class */ (function () {
    function BackendApi() {
    }
    BackendApi.prototype.updateTask = function (req, res) {
        //update the current list
        var fs = require('fs');
        var rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded = JSON.parse(rawdata);
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
