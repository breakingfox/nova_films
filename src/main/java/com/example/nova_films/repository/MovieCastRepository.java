package com.example.nova_films.repository;

import com.example.nova_films.entity.MovieCast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MovieCastRepository extends JpaRepository<MovieCast, Long>, JpaSpecificationExecutor<MovieCast> {
    List<MovieCast> findByActor_Id(Long id);
}