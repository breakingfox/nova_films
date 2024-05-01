package com.example.nova_films.repository;

import com.example.nova_films.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {

    Optional<Movie> findById(Long aLong);

    Movie findByName(String name);

    Movie findByNameIgnoreCase(String name);

    @Query("select m from Movie m where m.category is null")
    List<Movie> findByCategoryNull();

    @Query("select m from Movie m where m.id in ?1")
    Set<Movie> findByIdIn(Collection<Long> ids);
}