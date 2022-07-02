package me.somoy.academy;

import me.somoy.academy.dao.CourseRepository;
import me.somoy.academy.dao.CourseService;
import me.somoy.academy.model.Course;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertEquals;

public class CourseModelBlackBoxTest {
    @Autowired
    Course course;

    @Autowired
    CourseRepository courseRepository;

    @Before
    public void setup() {
        System.out.println("....Unit Test Started....");
        course = new Course();
        course.setDescription("Java Course");
        course.setImageUrl("http://www.google.com");
    }

    @Test
    public void test_setName1(){
        course.setName("");
        assertEquals("Checking course name", "", course.getName());
    }
    @Test
    public void test_setName2(){
        assertEquals("Checking course name", "", course.getName());
    }

    @Test
    public void test_setName3(){
        assertEquals("Checking course name", null, course.getName());
    }

    @Test
    public void test_setName4(){
        course.setName("Java");
        assertEquals("Checking course name", "", course.getName());
    }
    @Test
    public void test_setName5(){
        course.setName("Java");
        assertEquals("Checking course name", "Java", course.getName());
    }

    @Test
    public void test_setName6(){
        course.setName("Java");
        assertEquals("Checking course name", "Javaa", course.getName());
    }

    @Test
    public void test_setName7(){
        String name = "";
        for(int i=0; i<100; i++){
            name += "a";
        }
        course.setName(name);
        assertEquals("Checking course name", name, course.getName());
    }



    @After
    public void tearDown() {
        System.out.println("....Unit Test Ended....");
    }


}
