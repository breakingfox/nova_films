package com.example.nova_films.controller;

import com.example.nova_films.dto.AddCategoryRequest;
import com.example.nova_films.dto.CategoryRequest;
import com.example.nova_films.entity.Category;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.repository.CategoryRepository;
import com.example.nova_films.repository.MovieRepository;
import com.example.nova_films.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoriesController {

    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final MovieRepository movieRepository;

    @GetMapping
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @GetMapping("/movies/{id}")
    public Collection<Movie> findMoviesByCategoryId(@PathVariable Long id) {
        return categoryRepository.findById(id).get().getMovies();
    }

    @GetMapping("/{id}")
    public Category findById(@PathVariable Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    //todo rename
    @GetMapping("/{id}/movie")
    public Category findByMovieId(@PathVariable Long id) {
        return categoryRepository.findByMovies_Id(id);
    }

    @PostMapping("/add")
    public Category addCategory(@RequestBody AddCategoryRequest request) {
        return categoryService.addCategory(request);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody CategoryRequest request) {
        //todo update to putmapping
        //  https://qna.habr.com/q/458183
        // https://stackoverflow.com/questions/31265580/cors-request-method-put-is-not-allowed-by-access-control-allow-methods
        return categoryService.updateCategory(id, request);
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteById(@PathVariable Long id) {
        categoryRepository.findById(id).ifPresent(categoryRepository::delete);
    }

}
