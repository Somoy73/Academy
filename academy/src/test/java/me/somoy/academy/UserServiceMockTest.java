package me.somoy.academy;

import me.somoy.academy.dao.UserService;
import me.somoy.academy.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserServiceMockTest {

    @MockBean
    UserService userService;

    //Mock Tests

    @Test
    public void test_getUserByUsername_withMock_receiveUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setEmail("test@user.com");
        user.setPassword("test-password");
        user.setAddress("test-address");
        user.setAccessLevel("STUDENT");
        user.setAge(20);

        //Optional<User> optUser = Optional.of(user);
        when(userService.getUserByUsername("test-user")).thenReturn(user);
        assertThat(userService.getUserByUsername("test-user")).isEqualTo(user);
    }
    @Test
    public void test_getUserByUsername_withMock_receiveUser2() {
        User user = new User();
        user.setUsername("test");
        user.setEmail("test@user.com");
        user.setPassword("test-password");
        user.setAddress("test-address");
        user.setAccessLevel("STUDENT");
        user.setAge(20);

        //Optional<User> optUser = Optional.of(user);
        when(userService.getUserByUsername("test")).thenReturn(user);
        assertThat(userService.getUserByUsername("test")).isEqualTo(user);
    }

    @Test
    public void test_getUserById_withMock_receiveUser(){
        User user = new User();
        user.setUsername("test-user");
        user.setEmail("test@user.com");
        user.setPassword("test-password");
        user.setAddress("test-address");
        user.setAccessLevel("STUDENT");
        user.setAge(20);

        when(userService.getUserById(1L)).thenReturn(user);
        assertThat(userService.getUserById(1L)).isEqualTo(user);
    }

}
