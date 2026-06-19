package com.vskconnect.config;

import com.vskconnect.entity.User;
import com.vskconnect.repository.UserRepository;
import com.vskconnect.util.AvatarUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create an AI Agent user if it doesn't exist
        if (!userRepository.existsByUsername("ai_agent")) {
            User aiUser = User.builder()
                    .username("ai_agent")
                    .email("vajjhasaikrishna@gmail.com")
                    .password(passwordEncoder.encode("supersecret_ai_password_123")) // Doesn't really matter
                    .avatarUrl(AvatarUtil.generateAvatar("ai_agent"))
                    .status(com.vskconnect.entity.UserStatus.ONLINE)
                    .build();
            userRepository.save(aiUser);
            System.out.println("AI Agent user created successfully!");
        }
    }
}
