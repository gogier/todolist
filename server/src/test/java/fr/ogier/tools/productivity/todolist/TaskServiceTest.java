package fr.ogier.tools.productivity.todolist;

// TaskServiceTest.java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import fr.ogier.tools.productivity.todolist.service.TaskService;
import fr.ogier.tools.productivity.todolist.repository.TaskRepository;
import fr.ogier.tools.productivity.todolist.model.*;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
public class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;
    

    @Test
    @Order(1)    
    public void testGetTasks() {
        // Given
        Task task1 = new Task(UUID.randomUUID().toString(), "Task 1", "User1", "Description 1", "CategoryA", "ProjectA", "15m", "ToDo", 1, null, null, null, null);
        Task task2 = new Task(UUID.randomUUID().toString(), "Task 2", "User2", "Description 2", "CategoryB", "ProjectB", "30m", "In Progress", 2, null, null, null, null);
        Task task3 = new Task(UUID.randomUUID().toString(), "Task 3", "User3", "Description 3", "CategoryA", "ProjectA", "15m", "Done", 3, null, null, null, null);
        Task task4 = new Task(UUID.randomUUID().toString(), "Task 4", "User4", "Description 4", "CategoryC", "ProjectA", "1h", "Archived", 4, null, null, null, null);

        taskRepository.saveAll(List.of(task1, task2, task3, task4));

        // When
        List<Task> allTasks = taskService.getTasks(null, null);
        List<Task> archivedTasks = taskService.getTasks(true, null);
        List<Task> nonArchivedTasks = taskService.getTasks(false, null);
        List<Task> projectATasks = taskService.getTasks(null, "ProjectA");
        List<Task> archivedProjectATasks = taskService.getTasks(true, "ProjectA");

        // Then
        assertEquals(4, allTasks.size());
        assertEquals(1, archivedTasks.size());
        assertEquals(3, nonArchivedTasks.size());
        assertEquals(3, projectATasks.size());
        assertEquals(1, archivedProjectATasks.size());
    }


    @Test
    @Order(2)    
    public void testCreateTask() {
        // Create a sample task
        TaskCreationRequest task = new TaskCreationRequest();
        task.setTitle("[Category] Sample Task");
        task.setActor("User1");
        task.setDescription("Sample description");
        task.setProject("SampleProject");
        task.setEstimate("1h");

        // Call the service method to create the task
        Task createdTask = taskService.createTask(task);

        // Retrieve the task from the repository
        Task retrievedTask = taskRepository.findById(createdTask.getId()).orElse(null);

        // Assert that the task was created and retrieved successfully
        assertNotNull(createdTask);
        assertNotNull(retrievedTask);
        assertEquals("Category", createdTask.getCategory());
        assertEquals("Category", retrievedTask.getCategory()); // Assuming category is set in the title
        assertEquals("Sample Task", createdTask.getTitle()); // Assuming title without category
        assertEquals("Sample Task", retrievedTask.getTitle());

        // Add more assertions based on your specific task properties
    }

    @Test
    @Order(3)    
    public void testGetTaskById() {
        // Create a sample task and save it to the repository
        TaskCreationRequest task = new TaskCreationRequest();
        task.setTitle("Sample Task");
        task.setActor("User1");
        task.setDescription("Sample description");
        task.setProject("SampleProject");
        task.setEstimate("1h");
        Task savedTask = taskService.createTask(task);

        // Call the service method to get the task by ID
        String taskId = savedTask.getId();
        Task retrievedTask = taskService.getTaskById(taskId);

        // Assert that the task was retrieved successfully
        assertNotNull(retrievedTask);
        assertEquals(savedTask.getId(), retrievedTask.getId());
        assertEquals(savedTask.getTitle(), retrievedTask.getTitle());
        assertEquals(savedTask.getActor(), retrievedTask.getActor());
        assertEquals(savedTask.getDescription(), retrievedTask.getDescription());

        // Add more assertions based on your specific task properties
    }

    @Test
    @Order(4)    
    public void testGetTaskById_NotFound() {
        // Call the service method with a non-existent ID
        String nonExistentTaskId = "non-existent-id";
        Task retrievedTask = taskService.getTaskById(nonExistentTaskId);

        // Assert that the task is null when not found
        assertNull(retrievedTask);
    }

    @Test
    @Order(5)    
    public void testUpdateTask_GenuineUpdate() {
        // Create a sample task
        TaskCreationRequest existingTask = new TaskCreationRequest();
        existingTask.setTitle("[Old Category] Old Title");
        existingTask.setActor("Old Actor");
        existingTask.setDescription("Old Description");
        existingTask.setEstimate("Old Estimate");
        
        Task createdTask = taskService.createTask(existingTask);

        System.out.println(" CreatedDate=" + createdTask.getUpdateDate().getNano());

        // Create a task update request with new values
        TaskUpdateRequest taskUpdateRequest = new TaskUpdateRequest();
        taskUpdateRequest.setTitle("New Title");
        taskUpdateRequest.setActor("New Actor");
        taskUpdateRequest.setDescription("New Description");
        taskUpdateRequest.setCategory("New Category");
        taskUpdateRequest.setEstimate("New Estimate");

        // Call the service method to update the task
        Task updatedTask = taskService.updateTask(createdTask.getId(), taskUpdateRequest);

        System.out.println(" updatedTask=" + updatedTask.getUpdateDate().getNano());

        // Verify that the task is updated
        
        assertEquals(createdTask.getId(), updatedTask.getId());
        assertEquals("New Title", updatedTask.getTitle());
        assertEquals("New Actor", updatedTask.getActor());
        assertEquals("New Description", updatedTask.getDescription());
        assertEquals("New Category", updatedTask.getCategory());
        assertEquals("New Estimate", updatedTask.getEstimate());
        assertNotEquals(createdTask.getUpdateDate().getNano(), updatedTask.getUpdateDate().getNano()); // Verify that updateDate is updated
         
    }

    @Test
    @Order(6)    
    public void testUpdateTask_NoUpdate() {
        // Create a sample task
        TaskCreationRequest existingTask = new TaskCreationRequest();
        existingTask.setTitle("[Old Category] Old Title");
        existingTask.setActor("Old Actor");
        existingTask.setDescription("Old Description");
        existingTask.setEstimate("Old Estimate");
        
        Task createdTask = taskService.createTask(existingTask);

        System.out.println(" - NoUpdate - CreatedDate=" + createdTask.getUpdateDate().getNano());
        // Create a task update request with the same values as existing task
        TaskUpdateRequest taskUpdateRequest = new TaskUpdateRequest();
        taskUpdateRequest.setTitle("Old Title");
        taskUpdateRequest.setActor("Old Actor");
        taskUpdateRequest.setDescription("Old Description");
        taskUpdateRequest.setCategory("Old Category");
        taskUpdateRequest.setEstimate("Old Estimate");

        // Call the service method to update the task
        Task updatedTask = taskService.updateTask(createdTask.getId(), taskUpdateRequest);

        System.out.println(" - NoUpdate - updatedTask=" + updatedTask.getUpdateDate().getNano());
        // Verify that the task is not updated
        assertEquals(createdTask.getId(), updatedTask.getId());
        assertEquals("Old Title", updatedTask.getTitle());
        assertEquals("Old Actor", updatedTask.getActor());
        assertEquals("Old Description", updatedTask.getDescription());
        assertEquals("Old Category", updatedTask.getCategory());
        assertEquals("Old Estimate", updatedTask.getEstimate());
        //assertEquals(createdTask.getUpdateDate().getNano(), updatedTask.getUpdateDate().getNano()); // Verify that updateDate remains the same
    }

    @Test
    @Order(7)    
    public void testUpdateTask_TaskNotFound() {

        // Call the service method to update the task
        Task updatedTask = taskService.updateTask("1", new TaskUpdateRequest());

        // Verify that the task is not found
        assertNull(updatedTask);
    }
    @Test
    public void testUpdateTaskStatus_Success() {
        // Create a task with status 'ToDo'
        // Create a sample task
        TaskCreationRequest existingTask = new TaskCreationRequest();
        existingTask.setTitle("[Old Category] Old Title");
        existingTask.setActor("Old Actor");
        existingTask.setDescription("Old Description");
        existingTask.setEstimate("Old Estimate");
        
        Task createdTask = taskService.createTask(existingTask);

        
        System.out.println(" - UpdateTaskStatus - createdTask=" + createdTask.getId());


        // Update the status to 'In Progress'
        Task updatedTask = taskService.updateTaskStatus(createdTask.getId());
        
        System.out.println(" - UpdateTaskStatus - updatedTask=" + updatedTask.getId());

        // Retrieve the task from the database to check its updated status
        Optional<Task> retrievedTask = taskRepository.findById(createdTask.getId());

        
        System.out.println(" - UpdateTaskStatus - retrievedTask=" + retrievedTask.map(Task::getId).orElse(null));

        // Assert that the task status is updated to 'In Progress'
        assertEquals("In Progress", retrievedTask.map(Task::getStatus).orElse(null));
        // Assert that the updateDate is also updated
        //assertEquals(updatedTask.getUpdateDate(), retrievedTask.map(Task::getUpdateDate).orElse(null));
    }
    @Test
    public void testUpdateTaskStatus_TaskNotFound() {
        // Attempt to update the status of a non-existent task
        Task updatedTask = taskService.updateTaskStatus("nonExistentId");

        // Assert that the updated task is null
        assertNull(updatedTask);
    }

}
