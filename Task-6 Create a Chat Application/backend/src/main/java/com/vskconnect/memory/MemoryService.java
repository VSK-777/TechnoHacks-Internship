package com.vskconnect.memory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MemoryService {

    private final MemoryContextBuilder memoryContextBuilder;
    private final MemorySummarizer memorySummarizer;
    
    // In-memory storage for simplicity. In production, use Redis or a database.
    private final ConcurrentHashMap<String, String> userMemories = new ConcurrentHashMap<>();

    public String getContext(String username) {
        return userMemories.getOrDefault(username, "");
    }

    public void addInteraction(String username, String userMessage, String aiResponse) {
        String currentContext = getContext(username);
        String updatedContext = memoryContextBuilder.appendInteraction(currentContext, userMessage, aiResponse);
        
        // Summarize if context gets too long
        if (updatedContext.length() > 2000) {
            updatedContext = memorySummarizer.summarize(updatedContext);
        }
        
        userMemories.put(username, updatedContext);
    }
}
