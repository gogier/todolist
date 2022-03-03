import * as express from 'express'; 
import { TasksController } from "../controllers/tasks-controller";
import { NewTask, Task } from '../models/tasks';
import { v4 as uuidv4 } from 'uuid';
  
export class BackendApi { 
    

    public updateTask(req: express.Request, res: express.Response) {

        //update the current list
        const fs = require('fs');

        let rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);
        var taskFound : Task = req.body;
        var itemFound = false;

        currentTasksLoaded.forEach(item =>{
            if(item.id == req.params.id){
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

        if(!itemFound) {
            //New task to add
            currentTasksLoaded.push(req.body);
        }
        
        //Save in file
        let data = JSON.stringify(currentTasksLoaded, null, 2);
        
        fs.writeFileSync('server/data/saveTasks.json', data);       

        res.json(taskFound);
    } 

    public createTask(req: express.Request, res: express.Response) {

        //update the current list
        const fs = require('fs');

        let rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);
        var taskFound : NewTask = req.body;
        var itemFound = false;

        var newTaskToCreate : Task = {
            id: uuidv4(),
            title: taskFound.title,
            actor: taskFound.actor,
            description: taskFound.description,
            category: taskFound.category,
            estimate: taskFound.estimate,
            status:'todo',
            order: -1,
            creationDate: new Date(),
            updateDate:  new Date(0),
            startDate: new Date(0),
            endDate: new Date(0),
          };
          
        currentTasksLoaded.push(req.body);    
        
        //Save in file
        let data = JSON.stringify(currentTasksLoaded, null, 2);
        
        fs.writeFileSync('server/data/saveTasks.json', data);       

        res.json(taskFound);
    }
	


    public updateTasks(req: express.Request, res: express.Response) {

        //update the current list
        var currentTasksLoaded: Task[] = req.body;

        const fs = require('fs');
        //Save in file
        let data = JSON.stringify(currentTasksLoaded, null, 2);
        
        fs.writeFileSync('server/data/saveTasks.json', data);       

        res.json(data);
    } 

	
	public getTasks(req: express.Request, res: express.Response) { 
        const fs = require('fs');

        let rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);
        
        res.json(currentTasksLoaded); 
    }


}	