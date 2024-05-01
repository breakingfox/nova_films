package com.example.nova_films.service.impl;

import com.example.nova_films.service.KafkaConsumerService;
import org.springframework.kafka.annotation.KafkaListener;

public class KafkaConsumerServiceImpl implements KafkaConsumerService {

    @Override
    @KafkaListener(id = "Listener", topics = {"java_app", "cmd_test"})
    public void listen(String in) {
        System.out.println(in);
    }
}
