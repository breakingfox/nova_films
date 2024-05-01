package com.example.nova_films.dto;

import java.util.Collection;

public record ActorRequest(String name, Collection<Long> movieIds) {

}
