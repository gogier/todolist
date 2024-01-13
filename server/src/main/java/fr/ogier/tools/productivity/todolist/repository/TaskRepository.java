package fr.ogier.tools.productivity.todolist.repository;

// TaskRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import fr.ogier.tools.productivity.todolist.model.*;
import java.util.UUID;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

public interface TaskRepository extends JpaRepository<Task, String> {

    List<Task> findByStatus(String status);

    List<Task> findByStatusNot(String status);
    
    default Map<String, Task> findByStatusNotMap(String status)     {
        return findByStatusNot(status).stream().collect(Collectors.toMap(Task::getId, v -> v));
    }


    List<Task> findByProjectIgnoreCase(String project);

    List<Task> findByStatusAndProjectIgnoreCase(String status, String project);

    List<Task> findByStatusNotAndProjectIgnoreCase(String status, String project);
    

}
