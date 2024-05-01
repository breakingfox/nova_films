package com.example.nova_films.service.impl;

import com.example.nova_films.converter.MovieConverter;
import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.dto.UpdateMovieRequest;
import com.example.nova_films.entity.Actor;
import com.example.nova_films.entity.Image;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.entity.MovieCast;
import com.example.nova_films.repository.ActorRepository;
import com.example.nova_films.repository.CategoryRepository;
import com.example.nova_films.repository.ImageRepository;
import com.example.nova_films.repository.MovieCastRepository;
import com.example.nova_films.repository.MovieRepository;
import com.example.nova_films.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ImageRepository imageRepository;
    private final ActorRepository actorRepository;
    private final MovieCastRepository movieCastRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void addActorToMovie(Long movieId, Long actorId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        Optional<Actor> optionalActor = actorRepository.findById(actorId);

        if (optionalMovie.isPresent() && optionalActor.isPresent()) {
            Movie movie = optionalMovie.get();
            Actor actor = optionalActor.get();

            if (movie.getMovieCasts().stream().anyMatch(mc -> mc.getActor().equals(actor))) {
                throw new IllegalArgumentException("Actor is already associated with the movie.");
            }

            MovieCast movieCast = new MovieCast();
            movieCast.setMovie(movie);
            movieCast.setActor(actor);

            movieCastRepository.save(movieCast);
        } else {
            throw new IllegalArgumentException("Movie or Actor not found.");
        }
    }

    @Override
    public Movie updateMovie(Long id, UpdateMovieRequest updateMovieRequest, MultipartFile file) throws IOException {
        // Check if the movie with the given ID exists
        Optional<Movie> existingMovie = movieRepository.findById(updateMovieRequest.id());
        if (existingMovie.isPresent()) {
            // Update the existing movie with the provided data
            Movie movieToUpdate = existingMovie.get();
            movieToUpdate.setName(updateMovieRequest.name());
            movieToUpdate.setDescription(updateMovieRequest.description());
            movieToUpdate.setCategory(categoryRepository.findById(updateMovieRequest.categoryId()).orElse(null));
            movieToUpdate.setVideoUrl(updateMovieRequest.videoUrl());

            // Update other fields as needed
            if (file != null && !file.isEmpty()) {
                Image image = updateImage(movieToUpdate, file);
                movieToUpdate.setThumbnail(image);
            }


            movieToUpdate = movieRepository.save(movieToUpdate);


            Collection<Long> newActorIds = updateMovieRequest.actorIds();

            Set<MovieCast> existingMovieCasts = movieToUpdate.getMovieCasts();
            Set<MovieCast> toDelete = new HashSet<>();
            //todo check if its working
            existingMovieCasts.removeIf(movieCast -> {
                boolean shouldDelete = !newActorIds.contains(movieCast.getActor().getId());
                if (shouldDelete) {
                    toDelete.add(movieCast);
                }
                return shouldDelete;
            });

            for (Long actorId : newActorIds) {
                if (existingMovieCasts.stream().noneMatch(mc -> mc.getActor().getId().equals(actorId))) {
                    Actor actor = actorRepository.findById(actorId)
                            .orElse(null);

                    MovieCast movieCast = new MovieCast();
                    movieCast.setActor(actor);
                    movieCast.setMovie(movieToUpdate);

                    existingMovieCasts.add(movieCast);
                }
            }

            //todo check if its working
            movieCastRepository.deleteAll(toDelete);
            movieCastRepository.saveAll(existingMovieCasts);

            return movieToUpdate;

        } else {
            // Movie with the given ID not found
            throw new RuntimeException("Movie not found with ID: " + id);
        }
    }

    @Override
    public Movie saveMovie(MovieDto movieDto, MultipartFile file) throws IOException {
        Movie movie = MovieConverter.fromDto(movieDto, categoryRepository);
        if (file != null && !file.isEmpty()) {
            Image image = createImage(movie, file);
            movie.setThumbnail(image);
        }

        return movieRepository.save(movie);
    }

    @Override
    public Image createImage(Movie movie, MultipartFile multipartFile) throws IOException {
        Image image = new Image();
        image.setName(movie.getName());
        image.setType(multipartFile.getContentType());
        image.setPicByte(multipartFile.getBytes());

        return imageRepository.save(image);
    }

    @Override
    public Image updateImage(Movie movie, MultipartFile multipartFile) throws IOException {
        Image image = movie.getThumbnail() != null ? movie.getThumbnail() : new Image();

        image.setName(movie.getName());
        image.setType(multipartFile.getContentType());
        image.setPicByte(multipartFile.getBytes());

        return imageRepository.save(image);
    }

}
