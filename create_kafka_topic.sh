#!/bin/bash

# Kafka bin directory
KAFKA_BIN=/opt/bitnami/kafka/bin

# Create topic 'java_app'
$KAFKA_BIN/create_kafka_topic.sh --create --bootstrap-server localhost:9092 --topic java_app --partitions 1 --replication-factor 1

echo "Topic 'java_app' created successfully"
