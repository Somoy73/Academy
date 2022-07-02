package me.somoy.academy.controller;


import me.somoy.academy.dao.CourseService;
import me.somoy.academy.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    CourseService courseService;

    @RequestMapping(value="/api/courses", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllCourses() {
        return new ResponseEntity<>(courseService.getRepository().findAll(), HttpStatus.OK);
    }

    @RequestMapping(value="/api/courses", method = RequestMethod.POST)
    public ResponseEntity<Object> createCourse(@Valid @RequestBody Course course) {
        return new ResponseEntity<>(courseService.createCourse(course), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/courses/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCourse(@PathVariable("id") Long id) {
        return new ResponseEntity<>(courseService.getCourseById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/courses/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateCourse(@PathVariable("id") Long id, @Valid @RequestBody Course course) {
        Course courseUpdated = courseService.getCourseById(id);
        if(courseUpdated != null){
            courseUpdated.setName(course.getName());
            courseUpdated.setDescription(course.getDescription());
        }
        return new ResponseEntity<>(courseService.getCourseById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/courses/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCourse(@PathVariable("id") Long id) {
        courseService.deleteCourseById(id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value="/api/courses/{id}/students", method = RequestMethod.GET)
    public ResponseEntity<Object> getStudentsByCourse(@PathVariable("id") String id) {
        return new ResponseEntity<>(courseService.getStudentsByCourse(id), HttpStatus.OK);
    }

    @RequestMapping(value="/api/courses/{id}/students", method = RequestMethod.POST)
    public ResponseEntity<Object> addStudentToCourse(@PathVariable("id") String id, @RequestBody Map<String, String> requestMap) {
        return new ResponseEntity<>(courseService.addStudentToCourse(id, requestMap.get("studentId")), HttpStatus.OK);
    }
}
