package me.somoy.academy.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public @Data class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Name Field can not be Empty.")
    @Size(min= 4, max=255)
    private String name;

    @Size(min= 4, max=1000)
    private String description;

    private String imageUrl;

    @JsonBackReference
    @ManyToMany(mappedBy = "coursesEnrolled")
    private Set<User> users;

}
