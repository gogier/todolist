package fr.ogier.tools.productivity.todolist.service;

// TaskService.java
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import fr.ogier.tools.productivity.todolist.repository.TaskRepository;
import fr.ogier.tools.productivity.todolist.model.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public static final String STATUS_TODO = "ToDo";
    public static final String STATUS_INPROGRESS = "In Progress";
    public static final String STATUS_DONE = "Done";
    public static final String STATUS_ARCHIVED = "Archived";
    

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    // Implement your task retrieval logic here
    public List<Task> getTasks(Boolean archive, String projectId) {
        if (archive == null && projectId == null) {
            // No filtering, return all tasks
            return taskRepository.findAll(Sort.by("orderInList"));
        } else if (archive != null && projectId == null) {
            // Filtering based on archive status
            if (archive) {
                return taskRepository.findByStatus(STATUS_ARCHIVED, Sort.by("orderInList"));
            } else {
                return taskRepository.findByStatusNot(STATUS_ARCHIVED, Sort.by("orderInList"));
            }
        } else if (archive == null && projectId != null) {
            // Filtering based on project
            return taskRepository.findByProjectId(projectId, Sort.by("orderInList"));
        } else {
            // Filtering based on both archive status and project
            if (archive) {
                return taskRepository.findByStatusAndProjectId(STATUS_ARCHIVED, projectId, Sort.by("orderInList"));
            } else {
                return taskRepository.findByStatusNotAndProjectId(STATUS_ARCHIVED, projectId, Sort.by("orderInList"));
            }
        }
    }
    
    public Task getTaskById(String taskId) {
        return taskRepository.findById(taskId).orElse(null);
    }
    public Task getTaskByIdAndProjectId(String projectId, String taskId) {
        return taskRepository.findByIdAndProjectId(taskId, projectId).orElse(null);
    }
    
    public Task createTask(String projectId, TaskCreationRequest taskToCreate) {
        // Extract category from the title and set it in the task
        Task task = new Task();
        String title = taskToCreate.getTitle();
        String category = extractCategoryFromTitle(title);
        if(category!=null) {
            title = title.replace("[" + category + "]", "").trim();
        }
        task.setTitle(title);
        task.setCategory(category);
        task.setActor(taskToCreate.getActor());
        task.setProjectId(projectId);
        task.setDescription(taskToCreate.getDescription());
        task.setEstimate(taskToCreate.getEstimate());

        task.setId(UUID.randomUUID().toString());
        task.setCreationDate(LocalDateTime.now());
        task.setUpdateDate(LocalDateTime.now());
        task.setStatus(STATUS_TODO);

        // Perform any additional logic/validation if needed
        return taskRepository.save(task);
    }

    private String extractCategoryFromTitle(String title) {
        // Extract logic based on your specific requirements
        // For example, if the title starts with [xxx], set xxx as the category
        if (title != null && title.startsWith("[") && title.contains("]")) {
            int endIndex = title.indexOf("]");
            return title.substring(1, endIndex);
        }
        return null; // Default category if not found
    }


    public Task updateTask(String projectId, String taskId, TaskUpdateRequest taskUpdateRequest) {
        Task existingTask = taskRepository.findByIdAndProjectId(taskId, projectId).orElse(null);

         if (existingTask != null) {
            // Check if task properties need to be updated
            boolean taskUpdated = false;

            // Update task properties based on the request
            if (taskUpdateRequest.getTitle() != null && existingTask.getTitle() !=null && taskUpdateRequest.getTitle().compareTo(existingTask.getTitle())!=0) {
                existingTask.setTitle(taskUpdateRequest.getTitle());
                taskUpdated = true;
                
        System.out.println(" - Update - setTitle");
            }
            if (taskUpdateRequest.getActor() != null && existingTask.getActor() !=null  && taskUpdateRequest.getActor().compareTo(existingTask.getActor())!=0) {
                existingTask.setActor(taskUpdateRequest.getActor());
                taskUpdated = true;
                System.out.println(" - Update - getActor");
            }
            if (taskUpdateRequest.getDescription() != null && existingTask.getDescription() !=null  && taskUpdateRequest.getDescription().compareTo(existingTask.getDescription())!=0) {
                existingTask.setDescription(taskUpdateRequest.getDescription());
                taskUpdated = true;
                System.out.println(" - Update - getDescription");
            }
            if (taskUpdateRequest.getCategory() != null && existingTask.getCategory() !=null  && taskUpdateRequest.getCategory().compareTo(existingTask.getCategory())!=0) {
                existingTask.setCategory(taskUpdateRequest.getCategory());
                taskUpdated = true;
                System.out.println(" - Update - getCategory");
            }
            if (taskUpdateRequest.getEstimate() != null && existingTask.getEstimate() !=null  && taskUpdateRequest.getEstimate().compareTo(existingTask.getEstimate())!=0) {
                existingTask.setEstimate(taskUpdateRequest.getEstimate());
                taskUpdated = true;
                System.out.println(" - Update - getEstimate");
            }

            // Update the updateDate field if the task has been genuinely updated
            if (taskUpdated) {
                existingTask.setUpdateDate(LocalDateTime.now());
                System.out.println(" - Update - update date");
            }

            // Save the updated task
            return taskRepository.save(existingTask);
        } else {
            return null;
        }
    
    }


    public Task updateTaskStatus(String projectId, String taskId) {
        Task task = taskRepository.findByIdAndProjectId(taskId, projectId).orElse(null);

        if (task != null) {
            // Implement logic to update task status
            String currentStatus = task.getStatus();
            String newStatus = getNextStatus(currentStatus);

            System.out.println(" - updateTaskStatus - getNextStatus=" + newStatus);

            if (newStatus != null) {
                // Set the update date if the status has been updated
                task.setUpdateDate(LocalDateTime.now());
                task.setStatus(newStatus);

                // Update startDate and endDate based on the new status if needed
                updateStartAndEndDate(task);

                System.out.println(" - updateTaskStatus - updated");


                // Save the updated task
                return taskRepository.save(task);
            }
        }

        return null;
    }

    private String getNextStatus(String currentStatus) {

        if(currentStatus==null) return null;
        // implement a lifecycle logic like ToDo->In Progress->Done->toArchive->ToDo
        switch(currentStatus) {
            case STATUS_TODO: 
                return STATUS_INPROGRESS;
            case STATUS_INPROGRESS: 
                return STATUS_DONE;
            case STATUS_DONE: 
                return STATUS_TODO;
            default: return null;
        }


        // Return null if there is no next status (e.g., if the task is already archived)
    }

    private void updateStartAndEndDate(Task task) {

        //  set startDate when status changes to 'In Progress'
        // and set endDate when status changes to 'Done'
        if(STATUS_INPROGRESS.compareTo(task.getStatus())==0) {
            task.setStartDate(LocalDateTime.now());
        } else {
            if(STATUS_DONE.compareTo(task.getStatus())==0) {
                task.setEndDate(LocalDateTime.now());
            }
        }
    }


    public boolean updateTasksOrder(String projectId, List<String> taskOrderList) {
        boolean orderListDone = false;
        // Implement logic to update the order of non-archived tasks based on the provided order list
         Map<String, Task> tasksToUpdateOrder = taskRepository.findByStatusNotAndProjectIdMap(STATUS_ARCHIVED, projectId, Sort.by("orderInList"));

         if (tasksToUpdateOrder.size() == taskOrderList.size()) {
             // Update the order field for each task based on the order in the list
             for (int i = 0; i < taskOrderList.size(); i++) {
                 Task task = tasksToUpdateOrder.get(taskOrderList.get(i));
                 task.setOrderInList(i + 1); // Assuming order starts from 1
             }
 
             // Save the updated tasks
             taskRepository.saveAll(new ArrayList<Task>(tasksToUpdateOrder.values()));

             orderListDone = true;
         } 
         
         return orderListDone;
    }

    public void archiveTasks(String projectId) {
        // Implement logic to archive tasks with status 'toArchive' and set status to 'archived'
        List<Task> tasksToArchive = taskRepository.findByStatusAndProjectId(STATUS_DONE, projectId, null);

        for (Task task : tasksToArchive) {
            task.setStatus(STATUS_ARCHIVED);
            task.setUpdateDate(LocalDateTime.now());
        }

        taskRepository.saveAll(tasksToArchive);

    }
}
