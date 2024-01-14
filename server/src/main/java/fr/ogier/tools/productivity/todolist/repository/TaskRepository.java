package fr.ogier.tools.productivity.todolist.repository;

// TaskRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import fr.ogier.tools.productivity.todolist.model.*;
import java.util.UUID;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, String> {

    List<Task> findAll(Sort sort);
    List<Task> findByStatus(String status, Sort sort);

    Optional<Task> findByIdAndProjectId(String id, String projectId);

    List<Task> findByStatusNot(String status, Sort sort);
    
    default Map<String, Task> findByStatusNotAndProjectIdMap(String status, String projectId, Sort sort)     {
        return findByStatusNotAndProjectId(status,projectId, sort).stream().collect(Collectors.toMap(Task::getId, v -> v));
    }

    List<Task> findByProjectId(String projectId, Sort sort);

    List<Task> findByStatusAndProjectId(String status, String projectId, Sort sort);

    List<Task> findByStatusNotAndProjectId(String status, String projectId, Sort sort);
    

}
