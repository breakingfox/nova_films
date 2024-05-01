package com.example.nova_films.dto;

import com.example.nova_films.entity.Movie;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link Movie}
 */
public record UpdateMovieRequest(Long id, String name, String description, String videoUrl,
                                 Long categoryId, List<Long> actorIds) implements Serializable {

}