package com.example.nova_films.dto;

import java.util.Collection;

public record CategoryRequest(String categoryName, Collection<Long> movieIds) {

}
