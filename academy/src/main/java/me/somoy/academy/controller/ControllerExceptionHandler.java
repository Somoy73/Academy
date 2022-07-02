package me.somoy.academy.controller;

import me.somoy.academy.util.error.ApiError;
import me.somoy.academy.util.exceptions.DuplicateUserExistsException;
import me.somoy.academy.util.exceptions.FacultyAlreadyExistsException;
import me.somoy.academy.util.exceptions.StudentAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerExceptionHandler {

    //UserController Exceptions
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiError handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Validation error", request.getServletPath());
        BindingResult result = ex.getBindingResult();
        Map<String, String> validationError = new HashMap<>();

        for(FieldError fieldError: result.getFieldErrors()) {
            validationError.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationError);
        return apiError;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicateUserExistsException.class)
    public ApiError handleDuplicateDataException(DuplicateUserExistsException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Duplicate Data", request.getServletPath());
        Map<String, String> validationError = new HashMap<>();
        validationError.put("message", ex.getMessage());
        apiError.setValidationErrors(validationError);
        return apiError;
    }


    //Course Controller Exceptions
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(FacultyAlreadyExistsException.class)
    public ApiError handleFacultyAlreadyExistsException(FacultyAlreadyExistsException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Faculty Exists", request.getServletPath());
        Map<String, String> validationError = new HashMap<>();
        validationError.put("message", ex.getMessage());
        apiError.setValidationErrors(validationError);
        return apiError;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(StudentAlreadyExistsException.class)
    public ApiError handleStudentAlreadyExistsException(StudentAlreadyExistsException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Student Exists", request.getServletPath());
        Map<String, String> validationError = new HashMap<>();
        validationError.put("message", ex.getMessage());
        apiError.setValidationErrors(validationError);
        return apiError;
    }
}
