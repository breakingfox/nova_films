package com.example.nova_films.service;

import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.entity.Movie;

import java.util.List;

public interface MovieCastService {

    List<MovieDto> getMoviesByActorId(Long id);
}
