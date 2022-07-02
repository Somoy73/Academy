package me.somoy.academy.dao;


import me.somoy.academy.model.User;
import me.somoy.academy.util.exceptions.DuplicateUserExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    UserRepository userRepository;
    BCryptPasswordEncoder passwordEncoder;

    public UserService(){}

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User createNewUser(User user) throws DuplicateUserExistsException {
        User inDbName = userRepository.findByUsername(user.getUsername());
        User inDbEmail = userRepository.findByEmail(user.getEmail());
        if(inDbName != null || inDbEmail != null){
            throw new DuplicateUserExistsException("User already exists");
        }
        if(user.getAccessLevel() == null){
            user.setAccessLevel("STUDENT");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    public UserRepository getRepository(){
        return this.userRepository;
    }
    public User getUserById(Long id){
        return this.userRepository.findById(id).get();
    }

    public void deleteUserById(Long id){
        User user = getUserById(id);
        this.userRepository.delete(user);
    }

    public User getUserByUsername(String username){
        return this.userRepository.findByUsername(username);
    }

}
