package me.somoy.academy.util.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Duplicate Data")
public class DuplicateUserExistsException extends RuntimeException {
    private String message;

    public DuplicateUserExistsException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}

