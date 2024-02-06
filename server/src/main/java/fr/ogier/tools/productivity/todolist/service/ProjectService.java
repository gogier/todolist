package fr.ogier.tools.productivity.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.ogier.tools.productivity.todolist.repository.ProjectRepository;
import fr.ogier.tools.productivity.todolist.model.*;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class ProjectService {

    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);


    private final ProjectRepository projectRepository;
    private final TaskService taskService;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, TaskService taskService) {
        this.projectRepository = projectRepository;
        this.taskService = taskService;
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

    public boolean deleteProject(String projectId) {
        
        logger.debug("Deleting project: {}", projectId);

        Project project = projectRepository.findById(projectId).orElse(null);



        if (project != null) {
            // Assuming you have a method in your repository to delete a project
        
            logger.debug("Project to delete found");

            taskService.deleteAllProjectTasks(projectId);

            projectRepository.delete(project);
            
            logger.debug("Project deleted");
            return true; // Project deleted successfully
        } else {
            
            logger.debug("Project to delete NOT found");
            return false; // Project not found or couldn't be deleted
        }
    }

    public boolean selectProject(String projectId) {
        
        logger.debug("Select project: {}", projectId);

        Project project = projectRepository.findById(projectId).orElse(null);

        if (project != null) { 
            
            logger.debug("Project to select found");

            unselectAllProjects();


            project.setSelected(true);
            projectRepository.save(project);
            
            logger.debug("Project Selected");
            return true; // Project deleted successfully
        } else {
            
            if("".compareTo(projectId)==0 || "all".compareTo(projectId)==0) {
                
                unselectAllProjects();

                logger.debug("Default project to select");
                return true; // Project deleted successfully

            } else {

                logger.debug("Project to select NOT found");
                return false; // Project not found or couldn't be deleted
            }

        }
    }

    public void unselectAllProjects() {
        List<Project> projects = projectRepository.findAll();
        projects.forEach(proj -> proj.setSelected(false));
        projectRepository.saveAll(projects);

        logger.debug("All Projects deselected");
    }
}
