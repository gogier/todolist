package fr.ogier.tools.productivity.todolist.model;
import lombok.Data;

// Task.java
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Data
@Entity(name="TASKS")
public class Task {

    @Id
    private String id;
    private String title;
    private String actor;
    private String description;
    private String category;
    private String project;
    private String estimate;
    private String status;
    private Integer orderInList;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime creationDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime updateDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime endDate;

    // Constructors, getters, and setters

    // Implement constructors, getters, and setters based on your requirements
   
    public Task() {};

    public Task(String id, String title, String actor, String description, String category, String project, String estimate, String status, Integer order, LocalDateTime creationDate, LocalDateTime updateDate, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.title = title;
        this.actor = actor;
        this.description = description;
        this.category = category;
        this.project = project;
        this.estimate = estimate;
        this.status = status;
        this.orderInList = order;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
