package me.somoy.academy.util.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Faculty Exists")
public class FacultyAlreadyExistsException extends RuntimeException {
    private String message;
    public FacultyAlreadyExistsException(String message) {
        this.message = message;
    }
    @Override
    public String getMessage() {
        return this.message;
    }
}
