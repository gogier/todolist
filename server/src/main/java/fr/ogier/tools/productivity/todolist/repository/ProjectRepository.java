package fr.ogier.tools.productivity.todolist.repository;

// TaskRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import fr.ogier.tools.productivity.todolist.model.*;
import java.util.UUID;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

public interface ProjectRepository extends JpaRepository<Project, String> {
    

}
