package com.example.nova_films.controller;

import com.example.nova_films.dto.ActorRequest;
import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.entity.Actor;
import com.example.nova_films.repository.ActorRepository;
import com.example.nova_films.service.ActorService;
import com.example.nova_films.service.MovieCastService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/actors")
@RequiredArgsConstructor
public class ActorsController {

    private final ActorRepository actorRepository;
    private final ActorService actorService;
    private final MovieCastService movieCastService;

    @GetMapping
    public List<Actor> findAll() {
        return actorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Actor getActorById(@PathVariable Long id) {
        return actorRepository.findById(id).orElse(null);
    }

//    @GetMapping("/{name}")
//    public Actor getActorByName(@PathVariable String name) {
//        return actorRepository.findByNameIgnoreCase(name);
//    }

    @GetMapping("/movie/{id}")
    public List<Actor> getActorsByMovieId(@PathVariable Long id) {
        return actorRepository.findByMovieId(id);
    }

    @GetMapping("/{id}/movies")
    public List<MovieDto> getMoviesByActorId(@PathVariable Long id) {
        return movieCastService.getMoviesByActorId(id);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Actor addActor(@RequestBody ActorRequest request) {
        return actorService.addActor(request);
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteById(@PathVariable Long id) {
        actorRepository.findById(id).ifPresent(actorRepository::delete);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/{id}")
    public Actor updateActor(@PathVariable Long id, @RequestBody ActorRequest request) {
        //todo update to putmapping
        //  https://qna.habr.com/q/458183
        // https://stackoverflow.com/questions/31265580/cors-request-method-put-is-not-allowed-by-access-control-allow-methods
        return actorService.updateActor(id, request);
    }

}

