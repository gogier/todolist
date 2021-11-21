import * as express from 'express'; 
import { TasksController } from "../controllers/tasks-controller";
import { Task } from '../models/tasks';
  
export class BackendApi { 
    

    public updateTask(req: express.Request, res: express.Response) {

        //update the current list
        const fs = require('fs');

        let rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);

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

        res.json(data);
    } 
	
	
	public getTasks(req: express.Request, res: express.Response) { 
        const fs = require('fs');

        let rawdata = fs.readFileSync('server/data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);
        
        res.json(currentTasksLoaded); 
    }


}	