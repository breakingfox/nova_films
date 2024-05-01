package com.example.nova_films.service.impl;

import com.example.nova_films.dto.ActorRequest;
import com.example.nova_films.entity.Actor;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.entity.MovieCast;
import com.example.nova_films.repository.ActorRepository;
import com.example.nova_films.repository.MovieCastRepository;
import com.example.nova_films.repository.MovieRepository;
import com.example.nova_films.service.ActorService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ActorServiceImpl implements ActorService {

    private final ActorRepository actorRepository;
    private final MovieRepository movieRepository;
    private final MovieCastRepository movieCastRepository;

    @Override
    public Actor addActor(ActorRequest request) {
        Actor actor = new Actor();
        actor.setName(request.name());
        actor = actorRepository.save(actor);

        if (CollectionUtils.isNotEmpty(request.movieIds())) {
            List<MovieCast> movieCasts = new ArrayList<>();
            Set<Movie> movies = movieRepository.findByIdIn(request.movieIds());
            for (Movie movie : movies) {
                MovieCast movieCast = new MovieCast();
                movieCast.setMovie(movie);
                movieCast.setActor(actor);

                movieCasts.add(movieCast);
            }
            movieCastRepository.saveAll(movieCasts);
//            Actor finalActor = actor;
//            movies.forEach(movie -> movie.getMovieCasts(finalActor));
//            movieRepository.saveAll(movies);
        }
//        movieRepository.sa

        return actor;
    }

    @Override
    public Actor updateActor(Long actorId, ActorRequest request) {
        Actor actor = actorRepository.findById(actorId).orElse(null);
        actor.setName(request.name());
        actor = actorRepository.save(actor);

        Collection<Long> newMovieIds = request.movieIds();

        Set<MovieCast> existingMovieCasts = actor.getMovieCasts();
        Set<MovieCast> toDelete = new HashSet<>();
        //todo check if its working
        existingMovieCasts.removeIf(movieCast -> {
            boolean shouldDelete = !newMovieIds.contains(movieCast.getMovie().getId());
            if (shouldDelete) {
                toDelete.add(movieCast);
            }
            return shouldDelete;
        });

        for (Long movieId : newMovieIds) {
            if (existingMovieCasts.stream().noneMatch(mc -> mc.getMovie().getId().equals(movieId))) {
                Movie movie = movieRepository.findById(movieId)
                        .orElse(null);

                MovieCast movieCast = new MovieCast();
                movieCast.setActor(actor);
                movieCast.setMovie(movie);

                existingMovieCasts.add(movieCast);
            }
        }

        //todo check if its working
        movieCastRepository.deleteAll(toDelete);
        movieCastRepository.saveAll(existingMovieCasts);

        return actor;
    }

}
