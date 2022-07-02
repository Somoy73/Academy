package me.somoy.academy.dao;

import me.somoy.academy.model.Course;
import me.somoy.academy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Course findByName(String name);

    Course findCourseByUsers(User user);

}
