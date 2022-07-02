package me.somoy.academy.dao;

import me.somoy.academy.model.Course;
import me.somoy.academy.model.User;
import me.somoy.academy.util.exceptions.FacultyAlreadyExistsException;
import me.somoy.academy.util.exceptions.StudentAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

    public CourseRepository getRepository() {
        return this.courseRepository;
    }

    public Course getCourseById(Long id){
        return this.courseRepository.findById(id).get();
    }

    public Course createCourse(Course course){
        return this.courseRepository.save(course);
    }

    public Course updateCourse(Course course){
        return this.courseRepository.save(course);
    }

    public String enrollUserInCourse(Course course, User user) throws StudentAlreadyExistsException, FacultyAlreadyExistsException {
        Set<User> users = course.getUsers();
        if(users.contains(user)){
            throw new StudentAlreadyExistsException("User already enrolled in course");
        }
        if(user.getAccessLevel().equalsIgnoreCase("FACULTY")) {
            List<User> faculty = users
                    .stream()
                    .filter(u -> u.getAccessLevel().equalsIgnoreCase("FACULTY"))
                    .collect(Collectors.toList());
            if(faculty.size() > 0){
                throw new FacultyAlreadyExistsException("Only one faculty can be enrolled in a course");
            }
        }
        user.getCoursesEnrolled().add(course);
        this.userRepository.save(user);
        return "User enrolled in course";
    }

    public String addStudentToCourse(String courseId, String studentId) {
        Course course = this.courseRepository.findById(Long.parseLong(courseId)).get();
        User student = this.userRepository.findById(Long.parseLong(studentId)).get();
        System.out.println(student.getUsername());
        return enrollUserInCourse(course, student);
    }

    public void unEnrollUserFromCourse(Course course, User user){
        course.getUsers().remove(user);
        this.courseRepository.save(course);
    }

    public Set<User> getStudentsByCourse(String id){
        Course course = this.courseRepository.findById(Long.parseLong(id)).get();
        return course.getUsers();
    }


    public void deleteCourseById(Long id){
        Course course = getCourseById(id);
        this.courseRepository.delete(course);
    }

}
