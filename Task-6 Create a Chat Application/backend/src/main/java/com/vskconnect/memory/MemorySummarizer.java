package com.vskconnect.memory;

import org.springframework.stereotype.Component;

@Component
public class MemorySummarizer {

    public String summarize(String context) {
        // Simple truncation for now.
        // In a real implementation, you might call the AI to generate a summary.
        int keepLength = 1000;
        if (context.length() <= keepLength) {
            return context;
        }
        return "... " + context.substring(context.length() - keepLength);
    }
}
