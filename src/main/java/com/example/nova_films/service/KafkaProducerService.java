package com.example.nova_films.service;

public interface KafkaProducerService {
    void sendMessage(String message);

    void sendMessage(String topic, String message);
}
