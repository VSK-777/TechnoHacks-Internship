package com.technohacks.studentapi.exception;

public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message) {

    super(message);
    
  }
}
