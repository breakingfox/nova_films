package com.example.nova_films.converter;

import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.entity.Category;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

// MovieConverter.java
public class MovieConverter {

    public static Movie fromDto(MovieDto movieDto, CategoryRepository categoryRepository) {
        Movie movie = new Movie();
        movie.setId(movieDto.id());
        movie.setName(movieDto.name());
        movie.setDescription(movieDto.description());
        movie.setReleaseDate(movieDto.releaseDate());
        movie.setVideoUrl(movieDto.videoUrl());

      if (movieDto.categoryId() != null) {
          Category category = categoryRepository.findById(movieDto.categoryId()).get();
          movie.setCategory(category);
      }

        return movie;
    }

    public static MovieDto toDto(Movie movie) {
        return new MovieDto(
                movie.getId(),
                movie.getName(),
                movie.getReleaseDate(),
                movie.getDescription(),
                movie.getVideoUrl(),
                movie.getCategory() != null ? movie.getCategory().getId() : null
        );
    }
}
