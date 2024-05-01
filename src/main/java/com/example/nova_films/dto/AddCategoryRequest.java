package com.example.nova_films.dto;

import java.util.Collection;

public record AddCategoryRequest(String categoryName, Collection<Long> movieIds) {

}
