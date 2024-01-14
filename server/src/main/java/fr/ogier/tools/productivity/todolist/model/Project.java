package fr.ogier.tools.productivity.todolist.model;

import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Data
@Entity(name="PROJECTS")
public class Project {

    @Id
    private String id;
    private String name;

    // Constructors, getters, and setters
}
