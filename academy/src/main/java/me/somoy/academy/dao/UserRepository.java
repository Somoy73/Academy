package me.somoy.academy.dao;

import me.somoy.academy.model.Course;
import me.somoy.academy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User findByEmail(String email);

    User findUserByCoursesEnrolled(Course course);

    List<User> findUserByAccessLevel(String accessLevel);

}