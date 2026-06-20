package com.vskconnect.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@ConditionalOnProperty(name = "socketio.enabled", havingValue = "true", matchIfMissing = true)
public class SocketIOConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SocketIOConfig.class);

    @Value("${socketio.hostname}")
    private String host;

    @Value("${socketio.port}")
    private Integer port;

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);
        config.setOrigin(null); // null means allow all origins in netty-socketio
        // Add ping timeout configurations if necessary
        
        LOGGER.info("Socket profile active");
        LOGGER.info("Socket.IO binding to port {}", port);
        
        return new SocketIOServer(config);
    }
}

// Deployment commit
