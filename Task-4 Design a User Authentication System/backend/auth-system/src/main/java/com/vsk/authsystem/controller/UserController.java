package com.vsk.authsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(Authentication authentication) {
        log.info("Fetching profile details for authenticated user.");
        
        com.vsk.authsystem.model.User user = (com.vsk.authsystem.model.User) authentication.getPrincipal();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to the protected dashboard!");
        response.put("email", user.getEmail());
        response.put("username", user.getActualUsername());
        
        log.info("Profile retrieved successfully for: {}", user.getEmail());
        return ResponseEntity.ok(response);
    }
}
