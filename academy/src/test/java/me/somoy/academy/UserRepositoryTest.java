package me.somoy.academy;

import me.somoy.academy.config.JwtTokenUtil;
import me.somoy.academy.dao.UserRepository;
import me.somoy.academy.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


import static org.assertj.core.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    /*Naming Scheme:
     * test_<methodName>_<condition>_<expectedBehavior>
     */

    @Test
    public void test_findByUsername_withNonExistingUsername_receiveNull() {
        User user = userRepository.findByUsername("test-user");
        assertThat(user).isNull();
    }

    @Test
    public void test_findByUsername_withExistingUsername_receiveUser() {
        User user = userRepository.findByUsername("Somoy");
        assertThat(user).isNotNull();
    }

    @Test
    public void test_findByUsername_withExistingUsername_receiveUserWithCorrectUsername() {
        User user = userRepository.findByUsername("Somoy");
        assertThat(user.getUsername()).isEqualTo("Somoy");
    }

    @Test
    public void test_save_withNewValidUser_receiveUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setEmail("test-email@email.com");
        user.setPassword("test-password");
        user.setAddress("test-address");
        user.setAccessLevel("STUDENT");
        user.setAge(20);
        user = userRepository.save(user);
        assertThat(user).isNotNull();
        userRepository.delete(user);
    }

    @Test
    public void test_delete_withExistingUser_lengthOfUserListDecreases() {
        User user = new User();
        user.setUsername("test-user");
        user.setEmail("test-email@email.com");
        user.setPassword("test-password");
        user.setAddress("test-address");
        user.setAccessLevel("STUDENT");
        user.setAge(20);
        user = userRepository.save(user);
        int numberOfUsers = userRepository.findAll().size();
        userRepository.delete(user);
        assertThat(userRepository.findAll().size()).isEqualTo(numberOfUsers - 1);
    }

    @Test
    public void test_save_withInvalidUser_receiveNull() {
        User user = new User();
        user.setUsername("test-user");
        user.setEmail("");
        user.setPassword("test-password");
        boolean flag = false;
        try{
            user = userRepository.save(user);
            flag = true;
        } catch (Exception e){
            flag = false;
            System.out.println(e.getMessage());
        }
        assertThat(flag).isFalse();
    }



}
