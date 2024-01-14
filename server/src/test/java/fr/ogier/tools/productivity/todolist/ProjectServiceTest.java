package fr.ogier.tools.productivity.todolist;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import fr.ogier.tools.productivity.todolist.service.ProjectService;
import fr.ogier.tools.productivity.todolist.repository.ProjectRepository;
import fr.ogier.tools.productivity.todolist.model.*;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
public class ProjectServiceTest {


    @Autowired
    private ProjectService projectService;

    @Test
    public void testCreateProject() {
        // Create a project
        ProjectCreationRequest projectToCreate = new ProjectCreationRequest();
        projectToCreate.setName("Test Project");

        Project createdProject = projectService.createProject(projectToCreate);

        // Verify that the project has been created with a UUID
        List<Project> retrievedProjects = projectService.getProjects();

        assertFalse(retrievedProjects.isEmpty());
        assertEquals("Test Project", retrievedProjects.get(0).getName());
    }
}
