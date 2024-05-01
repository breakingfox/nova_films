package com.example.nova_films.controller;

import com.example.nova_films.dto.UpdateMovieRequest;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.dto.MovieDto;
import com.example.nova_films.repository.MovieRepository;
import com.example.nova_films.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MoviesController {

    private final MovieRepository movieRepository;
    private final MovieService movieService;

    @GetMapping
    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

//    @GetMapping("/{name}")
//    public Movie getMovieByName(@PathVariable String name) {
//        return movieRepository.findByNameIgnoreCase(name);
//    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    @GetMapping("/uncategorized")
    public List<Movie> getMoviesWithoutCategory() {
        return movieRepository.findByCategoryNull();
    }


    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public Movie addMovie(@RequestPart("movie") MovieDto movie,
                          @RequestPart("imageFile") MultipartFile file) throws IOException {
        return movieService.saveMovie(movie, file);
    }

    //todo remove
    @PostMapping(value = "/add/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public String addImageFile(@RequestPart("imageFile") MultipartFile file) throws IOException {
        System.out.println("IMAGEIMGAEGGESDF");
        System.out.println(file.getName());
        return "IMAGEIMGAEGGESDF:";
    }
//   @PostMapping(value = "/add/movie", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////    @PreAuthorize("hasAuthority('ADMIN')")
//    @ResponseStatus(HttpStatus.OK)
//    public String addImageFile(@RequestPart("imageFile") MultipartFile file) throws IOException {
//        System.out.println("IMAGEIMGAEGGESDF");
//        System.out.println(file.getName());
//        return "IMAGEIMGAEGGESDF:";
//    }


    @PostMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public Movie updateMovie(@PathVariable Long id, @RequestPart("movie") UpdateMovieRequest updatedMovie, @RequestPart(value = "imageFile", required = false) MultipartFile file) throws IOException {
        return movieService.updateMovie(id, updatedMovie, file);
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteById(@PathVariable Long id) {
        movieRepository.findById(id).ifPresent(movieRepository::delete);
    }

    @PostMapping("/{movieId}/actors/{actorId}")
    public ResponseEntity<String> addActorToMovie(@PathVariable Long movieId, @PathVariable Long actorId) {
        try {
            movieService.addActorToMovie(movieId, actorId);

            return ResponseEntity.ok("Actor added to the movie successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

