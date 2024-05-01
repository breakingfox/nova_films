package com.example.nova_films.dto;

import com.example.nova_films.entity.Movie;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link Movie}
 */
public record MovieDto(Long id, String name, LocalDate releaseDate, String description, String videoUrl,
                       Long categoryId) implements Serializable {

}