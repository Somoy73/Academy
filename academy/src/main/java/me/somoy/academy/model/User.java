package me.somoy.academy.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;


@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private long id;

    @NotBlank(message = "Name Field can not be Empty.")
    @Size(min= 4, max=255)
    @Getter @Setter
    private String username;

    @NotBlank(message= "Email Field can not be empty.")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+")
    @Getter @Setter
    private String email;

    @Getter @Setter
    private String address;

    @Getter @Setter
    private int age;

    @Getter @Setter
    private String accessLevel;

    @NotBlank(message = "Password is required.")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min= 4, max=255)
    @Getter @Setter
    private String password;

    @Getter @Setter
    @JsonBackReference
    @ManyToMany
    @JoinTable(
            name="course_enroll",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="course_id")
    )
    private Set<Course> coursesEnrolled;

    @Override
    @Transient
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(this.accessLevel));
    }

    @Override
    @Transient
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @Transient
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @Transient
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @Transient
    public boolean isEnabled() {
        return true;
    }
}

