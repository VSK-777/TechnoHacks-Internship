package com.vskconnect.controller;

import com.vskconnect.dto.ApiDto.AuthRequest;
import com.vskconnect.dto.ApiDto.AuthResponse;
import com.vskconnect.dto.ApiDto.RegisterRequest;
import com.vskconnect.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.context.annotation.Profile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Profile("!socket")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<com.vskconnect.dto.ApiDto.UserDto> getMe(java.security.Principal principal) {
        return ResponseEntity.ok(authService.getMe(principal.getName()));
    }
}
