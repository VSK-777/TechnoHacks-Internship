package com.vskconnect.ai;

import com.vskconnect.memory.MemoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIChatService {

    private final RestTemplate groqRestTemplate;
    private final PromptBuilder promptBuilder;
    private final MemoryService memoryService;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    public String getAIResponse(String userMessage, String username) {
        String context = memoryService.getContext(username);
        String prompt = promptBuilder.buildPrompt(userMessage, username, context);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "You are VSK Connect AI, a helpful, friendly chat assistant."));
        messages.add(Map.of("role", "user", "content", prompt));
        
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7);

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody);
            ResponseEntity<Map> response = groqRestTemplate.exchange(apiUrl, HttpMethod.POST, entity, Map.class);
            
            if (response.getBody() != null && response.getBody().containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    String reply = (String) message.get("content");
                    
                    // Update memory
                    memoryService.addInteraction(username, userMessage, reply);
                    
                    return reply;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "I'm sorry, I'm having trouble connecting right now.";
        }
        return "I'm not sure how to respond to that.";
    }
}
