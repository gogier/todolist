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
}

