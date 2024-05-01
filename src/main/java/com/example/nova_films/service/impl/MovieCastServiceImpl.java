package com.example.nova_films.service.impl;

import com.example.nova_films.converter.MovieConverter;
import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.entity.MovieCast;
import com.example.nova_films.repository.MovieCastRepository;
import com.example.nova_films.service.MovieCastService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieCastServiceImpl implements MovieCastService {

    private final MovieCastRepository movieCastRepository;

    @Override
    public List<MovieDto> getMoviesByActorId(Long id) {
        List<MovieCast> movieCasts = movieCastRepository.findByActor_Id(id);
        return movieCasts.stream().map(MovieCast::getMovie).map(MovieConverter::toDto).collect(Collectors.toList());
    }
}
