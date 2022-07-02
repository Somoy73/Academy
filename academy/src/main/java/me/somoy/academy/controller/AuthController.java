package me.somoy.academy.controller;

import me.somoy.academy.config.JwtTokenUtil;
import me.somoy.academy.dao.UserService;
import me.somoy.academy.model.User;
import me.somoy.academy.service.AuthUserService;
import me.somoy.academy.util.error.ApiError;
import me.somoy.academy.util.exceptions.DuplicateUserExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private AuthUserService authUserService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @RequestMapping(value = "api/auth/signup", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user) throws DuplicateUserExistsException {
        userService.createNewUser(user);
        logger.info("User created: {}", user);
        return new ResponseEntity<>("User registered", HttpStatus.CREATED);
    }

    @RequestMapping(value="api/auth/signin", method = RequestMethod.POST)
    Map<String, Object> handleLogin(@RequestBody User authenticationUser) throws AccessDeniedException {
        logger.info("Credentials Entered By User: {} password: {}",
                authenticationUser.getUsername(), authenticationUser.getPassword());
        authenticate(authenticationUser.getUsername(), authenticationUser.getPassword());
        final UserDetails userDetails = authUserService.loadUserByUsername(authenticationUser.getUsername());
        final User user = userService.getRepository().findByUsername(authenticationUser.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("email", user.getEmail());
        userInfo.put("address", user.getAddress());
        userInfo.put("age", user.getAge());
        userInfo.put("accessLevel", user.getAccessLevel());
        userInfo.put("Authorities", user.getAuthorities());
        userInfo.put("token", token);
        logger.info("User logged in: {}", user);
        return userInfo;
    }

    private void authenticate(String username, String password) throws AccessDeniedException {
        if (username == null || password == null) {
            throw new AccessDeniedException("Invalid username or password");
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch(Exception e){
            throw new AccessDeniedException("Invalid username or password");
        }
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Unauthorized")
    ApiError handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(401, "Unauthorized", request.getServletPath());
        return apiError;
    }


}
