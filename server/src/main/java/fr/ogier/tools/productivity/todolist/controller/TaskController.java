package fr.ogier.tools.productivity.todolist.controller;

// TaskController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import fr.ogier.tools.productivity.todolist.service.TaskService;
import fr.ogier.tools.productivity.todolist.model.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(@RequestParam(required = false) Boolean archive,
                               @RequestParam(required = false) String project) {
        return taskService.getTasks(archive, project);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskCreationRequest task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.OK);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable String taskId) {
        Task task = taskService.getTaskById(taskId);
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable String taskId, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        Task updatedTask = taskService.updateTask(taskId, taskUpdateRequest);
        if (updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable String taskId) {
        Task updatedTask = taskService.updateTaskStatus(taskId);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/ordering")
    public ResponseEntity<Void> updateTasksOrder(@RequestBody List<String> taskOrderList) {
        taskService.updateTasksOrder(taskOrderList);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/archive")
    public ResponseEntity<Void> archiveTasks() {
        taskService.archiveTasks();
        return ResponseEntity.ok().build();
    }

}
