package fr.ogier.tools.productivity.todolist.controller;

// TaskController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import fr.ogier.tools.productivity.todolist.service.TaskService;
import fr.ogier.tools.productivity.todolist.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(@PathVariable String projectId, @RequestParam(required = false) Boolean archive) {
        return taskService.getTasks(archive, projectId);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@PathVariable String projectId, @RequestBody TaskCreationRequest task) {
        Task createdTask = taskService.createTask(projectId, task);
        if (createdTask != null) {
            logger.debug("Task created : {}", createdTask.getId());
            return new ResponseEntity<>(createdTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable String projectId, @PathVariable String taskId) {
        Task task = taskService.getTaskByIdAndProjectId(projectId, taskId);
        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable String projectId, @PathVariable String taskId, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        Task updatedTask = taskService.updateTask(projectId, taskId, taskUpdateRequest);
        if (updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping("/{taskId}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable String projectId, @PathVariable String taskId) {
        Task updatedTask = taskService.updateTaskStatus(projectId, taskId);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/ordering")
    public ResponseEntity<Void> updateTasksOrder(@PathVariable String projectId, @RequestBody List<String> taskOrderList) {
        taskService.updateTasksOrder(projectId, taskOrderList);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/archive")
    public ResponseEntity<Void> archiveTasks(@PathVariable String projectId) {
        taskService.archiveTasks(projectId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/purge")
    public ResponseEntity<Void> purgeTasks(@PathVariable String projectId) {
        taskService.purgeTasks(projectId);
        return ResponseEntity.ok().build();
    }
}
