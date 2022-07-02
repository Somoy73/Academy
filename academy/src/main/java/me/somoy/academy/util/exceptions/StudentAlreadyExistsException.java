package me.somoy.academy.util.exceptions;

public class StudentAlreadyExistsException extends RuntimeException {
    private String message;
    public StudentAlreadyExistsException(String message) {
        this.message = message;
    }
    @Override
    public String getMessage() {
        return this.message;
    }
}
