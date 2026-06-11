package com.vsk.authsystem.service;

import com.vsk.authsystem.dto.AuthDto.AuthenticationRequest;
import com.vsk.authsystem.dto.AuthDto.AuthenticationResponse;
import com.vsk.authsystem.dto.AuthDto.RegisterRequest;
import com.vsk.authsystem.model.Role;
import com.vsk.authsystem.model.User;
import com.vsk.authsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        log.info("Attempting to register new user with email: {}", request.getEmail());

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Registration failed: Email {} is already in use.", request.getEmail());
            throw new IllegalArgumentException("Email already in use");
        }
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            log.warn("Registration failed: Username {} is already taken.", request.getUsername());
            throw new IllegalArgumentException("Username already in use");
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
                
        repository.save(user);
        log.info("User {} successfully registered.", user.getEmail());

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .username(user.getActualUsername())
                .email(user.getEmail())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        log.info("Attempting to authenticate user: {}", request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.error("User {} authenticated but missing from database.", request.getEmail());
                    return new UsernameNotFoundException("User not found with email: " + request.getEmail());
                });
                
        log.info("User {} successfully authenticated.", user.getEmail());
        var jwtToken = jwtService.generateToken(user);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .username(user.getActualUsername())
                .email(user.getEmail())
                .build();
    }
}
