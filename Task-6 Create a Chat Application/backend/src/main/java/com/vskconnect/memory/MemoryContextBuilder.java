package com.vskconnect.memory;

import org.springframework.stereotype.Component;

@Component
public class MemoryContextBuilder {

    public String appendInteraction(String currentContext, String userMessage, String aiResponse) {
        StringBuilder builder = new StringBuilder(currentContext);
        if (!currentContext.isEmpty()) {
            builder.append("\n");
        }
        builder.append("User: ").append(userMessage).append("\n");
        builder.append("AI: ").append(aiResponse);
        return builder.toString();
    }
}
