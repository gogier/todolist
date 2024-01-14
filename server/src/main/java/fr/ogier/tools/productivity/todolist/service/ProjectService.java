package fr.ogier.tools.productivity.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.ogier.tools.productivity.todolist.repository.ProjectRepository;
import fr.ogier.tools.productivity.todolist.model.*;
import java.util.UUID;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(ProjectCreationRequest projectCreationRequest) {
        Project project = new Project();
        project.setId(UUID.randomUUID().toString());
        project.setName(projectCreationRequest.getName());
        return projectRepository.save(project);
    }
}
