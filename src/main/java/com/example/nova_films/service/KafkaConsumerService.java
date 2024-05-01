package com.example.nova_films.service;

import org.springframework.kafka.annotation.KafkaListener;

public interface KafkaConsumerService {
    @KafkaListener(id = "Listener", topics = {"java_app", "cmd_test"})
    void listen(String in);
}
