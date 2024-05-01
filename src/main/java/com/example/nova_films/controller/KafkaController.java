package com.example.nova_films.controller;

import com.example.nova_films.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @PostMapping("/publish")
    public String sendMessageToKafka(@RequestBody String message) {
        kafkaProducerService.sendMessage(message);
        return "Message sent to Kafka topic successfully!";
    }

    @PostMapping("/publish/{topic}")
    public String sendMessageToKafkaTopic(@PathVariable("topic") String topic, @RequestBody String message) {
        kafkaProducerService.sendMessage(topic, message);
        return "Message sent to Kafka topic '" + topic + "' successfully!";
    }
}
