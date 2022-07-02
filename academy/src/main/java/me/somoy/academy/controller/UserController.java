package me.somoy.academy.controller;


import me.somoy.academy.dao.UserService;
import me.somoy.academy.model.CurrentUser;
import me.somoy.academy.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    private Map<String, Object> mappedUsers(User user, User loggedInUser){
        Map<String, Object> response = new HashMap<>();
        if(user != null){
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("address", user.getAddress());
            response.put("accessLevel", user.getAccessLevel().toString());
        }
        if(loggedInUser.getAccessLevel().equalsIgnoreCase("admin")){
            response.put("age", user.getAge());
        }
        return response;
    }
    @RequestMapping(value= "api/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllUser(@CurrentUser User loggedInUser) {
        List<User> users = userService.getRepository().findAll();
        List<Object> responses = new ArrayList<>();
        users.stream().forEach(user -> {
            responses.add(mappedUsers(user, loggedInUser));
        });
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserById(@CurrentUser User loggedInUser, @PathVariable("id") String id) {
        User user = userService.getUserById(Long.parseLong(id));
        Map<String, Object> response = mappedUsers(user, loggedInUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value="api/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateUser(@PathVariable("id") String id,@Valid @RequestBody User user){
        User userUpdated = userService.getUserById(Long.parseLong(id));
        if(userUpdated != null){
            userUpdated.setUsername(user.getUsername());
            userUpdated.setAge(user.getAge());
            userUpdated.setAddress(user.getAddress());
            userUpdated.setEmail(user.getEmail());
        }
        return new ResponseEntity<>(userService.getUserById(Long.parseLong(id)), HttpStatus.OK);
    }

    @RequestMapping(value="api/users/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUser(@PathVariable("id") String id){
        userService.deleteUserById(Long.parseLong(id));
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "api/users/students", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllStudent(@CurrentUser User loggedInUser) {
        List<User> students = userService.getRepository().findUserByAccessLevel("STUDENT");
        List<Object> responses = new ArrayList<>();
        students.stream().forEach(student -> {
            responses.add(mappedUsers(student, loggedInUser));
        });
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @RequestMapping(value = "api/users/role/{accessLevel}", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllUserByAccessLevel(@PathVariable("accessLevel") String accessLevel,
                                                          @CurrentUser User loggedInUser) {
        List<User> users = userService.getRepository().findUserByAccessLevel(accessLevel);
        List<Object> responses = new ArrayList<>();
        users.stream().forEach(user -> {
            responses.add(mappedUsers(user, loggedInUser));
        });
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
