package fr.ogier.tools.productivity.todolist.controller;

import fr.ogier.tools.productivity.todolist.service.ProjectService;
import fr.ogier.tools.productivity.todolist.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        List<Project> projects = projectService.getProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectCreationRequest projectCreationRequest) {
        Project createdProject = projectService.createProject(projectCreationRequest);
        return new ResponseEntity<>(createdProject, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable String projectId) {
        // Assuming you have a service to handle project deletion
        boolean deleted = projectService.deleteProject(projectId);

        if (deleted) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{projectId}/select")
    public ResponseEntity<String> selectProject(@PathVariable String projectId) {
        // Assuming you have a service to handle project deletion
        boolean selected = projectService.selectProject(projectId);

        if (selected) {
            return ResponseEntity.ok("true");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

