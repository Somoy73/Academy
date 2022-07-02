package me.somoy.academy;

import me.somoy.academy.config.JwtTokenUtil;
import me.somoy.academy.dao.UserRepository;
import me.somoy.academy.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthControllerTest {
    private static final String API_AUTH = "/api/auth";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    /*Naming Scheme:
     * test_<methodName>_<condition>_<expectedBehavior>
     */

    @Test
    public void test_signIn_withoutCredentials_receiveBadRequest(){
        ResponseEntity<Object> response = signIn(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void test_signIn_withIncorrectCredentials_receiveUnauthorized(){
        ResponseEntity<Object> response = signIn(Object.class, "test-user", "wrong-password");
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void test_signIn_withCorrectCredentials_receiveOk(){
        ResponseEntity<Object> response = signIn(Object.class, "Somoy", "abcd");
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    @Test
    public void test_signIn_withCorrectCredentials_receiveValidToken(){
        ResponseEntity<Object> response = signIn(Object.class, "Somoy", "abcd");
        Map<String, Object> body = (Map<String, Object>)response.getBody();
        assertThat(jwtTokenUtil.getUsernameFromToken((String) body.get("token"))).isEqualTo("Somoy");
    }

    @Test
    public void test_signIn_withCorrectCredentials_receiveProperBodyForFrontend(){
        ResponseEntity<Object> response = signIn(Object.class, "Somoy", "abcd");
        Map<String, Object> body = (Map<String, Object>) response.getBody();
        User user = userRepository.findByUsername("Somoy");
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", (int) user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("email", user.getEmail());
        userInfo.put("address", user.getAddress());
        userInfo.put("age", user.getAge());
        userInfo.put("accessLevel", user.getAccessLevel());

        assertThat(jwtTokenUtil.getUsernameFromToken((String) body.get("token"))).isEqualTo("Somoy");
        body.remove("token");
        body.remove("Authorities");
        assertThat(body).isEqualTo(userInfo);
    }

    @Test
    public void test_signUp_withInvalidUser_receiveNotFound(){
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", "test-user");
        userMap.put("password", "test-password");
        userMap.put("address", "test-address");
        userMap.put("accessLevel", "STUDENT");
        userMap.put("age", 20);
        ResponseEntity<Object> response = testRestTemplate.postForEntity(API_AUTH + "/signup", userMap, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }


    public <T>ResponseEntity<T> signIn(Class<T> responseType){
        return testRestTemplate.postForEntity(API_AUTH + "/signin", null, responseType);
    }

    public <T>ResponseEntity<T> signIn(Class<T> responseType, String username, String password){
        Map<String, String> params = Map.of("username", username, "password", password);
        return testRestTemplate.postForEntity(API_AUTH + "/signin", params, responseType);
    }
}
