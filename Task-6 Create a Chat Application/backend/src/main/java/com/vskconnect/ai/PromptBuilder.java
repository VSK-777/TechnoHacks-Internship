package com.vskconnect.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(String message, String username, String context) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("User: ").append(username).append("\n");
        if (context != null && !context.isEmpty()) {
            prompt.append("Previous Context: ").append(context).append("\n");
        }
        prompt.append("Current Message: ").append(message).append("\n");
        prompt.append("Please provide a helpful and concise response.");
        
        return prompt.toString();
    }
}
