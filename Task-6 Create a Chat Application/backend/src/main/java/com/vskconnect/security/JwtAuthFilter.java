package com.vskconnect.security;

import com.vskconnect.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.context.annotation.Profile;

@Component
@RequiredArgsConstructor
@Profile("!socket")
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("====== [JwtAuthFilter] Incoming request to: " + request.getRequestURI() + " ======");
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        System.out.println("[JwtAuthFilter] Authorization Header: " + (authHeader != null ? "PRESENT" : "MISSING or NULL"));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("[JwtAuthFilter] Passing to next filter (no valid Bearer token)");
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(jwt);
            System.out.println("[JwtAuthFilter] Extracted username: " + username);
            
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                com.vskconnect.entity.User user = userRepository.findByUsername(username).orElse(null);
                if (user != null) {
                    System.out.println("[JwtAuthFilter] User found in DB");
                    UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                            .username(user.getUsername())
                            .password(user.getPassword())
                            .roles("USER")
                            .build();
                    if (jwtUtil.validateToken(jwt, userDetails)) {
                        System.out.println("[JwtAuthFilter] Token validation SUCCEEDED");
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        authToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        System.out.println("[JwtAuthFilter] Token validation FAILED");
                    }
                } else {
                    System.out.println("[JwtAuthFilter] User NOT found in DB for username: " + username);
                }
            }
        } catch (Exception e) {
            System.err.println("[JwtAuthFilter] EXCEPTION during token processing: " + e.getMessage());
            e.printStackTrace();
        }
        
        System.out.println("[JwtAuthFilter] SecurityContext Authentication: " + 
            (SecurityContextHolder.getContext().getAuthentication() != null ? "AUTHENTICATED" : "NOT AUTHENTICATED"));
        
        filterChain.doFilter(request, response);
    }
}
