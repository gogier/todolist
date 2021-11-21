 
import { Task } from '../models/tasks';

export class TasksController { 
    
    public getTasksFromFile(): Task[] {

        const fs = require('fs');

        let rawdata = fs.readFileSync('data/saveTasks.json');
        var currentTasksLoaded: Task[] = JSON.parse(rawdata);
        
        return currentTasksLoaded; 

    }
}