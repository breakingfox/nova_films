package com.example.nova_films.service;

import com.example.nova_films.dto.UpdateMovieRequest;
import com.example.nova_films.entity.Image;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.dto.MovieDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MovieService {
    void addActorToMovie(Long movieId, Long actorId);



    Movie updateMovie(Long id, UpdateMovieRequest updatedMovie, MultipartFile file) throws IOException;

    Movie saveMovie(MovieDto movieDto, MultipartFile file) throws IOException;

    Image createImage(Movie movie, MultipartFile multipartFile) throws IOException;

    Image updateImage(Movie movie, MultipartFile multipartFile) throws IOException;
}
