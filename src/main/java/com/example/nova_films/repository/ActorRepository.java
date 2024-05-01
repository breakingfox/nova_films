package com.example.nova_films.repository;

import com.example.nova_films.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Long>, JpaSpecificationExecutor<Actor> {
    Actor findByNameIgnoreCase(String name);

    @Query("select a from Actor a inner join a.movieCasts movieCasts where movieCasts.movie.id = ?1")
    List<Actor> findByMovieId(Long id);

    @Query("select a from Actor a where a.id in ?1")
    List<Actor> findByIdIn(Collection<Long> ids);
}