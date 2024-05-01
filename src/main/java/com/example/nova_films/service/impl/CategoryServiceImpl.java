package com.example.nova_films.service.impl;

import com.example.nova_films.dto.AddCategoryRequest;
import com.example.nova_films.dto.CategoryRequest;
import com.example.nova_films.entity.Category;
import com.example.nova_films.entity.Movie;
import com.example.nova_films.repository.CategoryRepository;
import com.example.nova_films.repository.MovieRepository;
import com.example.nova_films.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MovieRepository movieRepository;

    @Override
    public Category addCategory(AddCategoryRequest request) {
        Category category = new Category();
        category.setName(request.categoryName());
        category = categoryRepository.save(category);

        if (CollectionUtils.isNotEmpty(request.movieIds())) {
            Set<Movie> movies = movieRepository.findByIdIn(request.movieIds());
            Category finalCategory = category;
            movies.forEach(movie -> movie.setCategory(finalCategory));
            movieRepository.saveAll(movies);
        }

        return category;
    }

    @Override
    public Category updateCategory(Long categoryId, CategoryRequest request) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        category.setName(request.categoryName());
        category = categoryRepository.save(category);


        if (CollectionUtils.isNotEmpty(request.movieIds())) {
            Set<Movie> movies = movieRepository.findByIdIn(request.movieIds());

            List<Movie> toRemoveCategory = new ArrayList<>();

            Set<Movie> prevMovies = category.getMovies();
            prevMovies.forEach(prevMovie -> {
                if (!movies.contains(prevMovie)) {
                    prevMovie.setCategory(null);
                    toRemoveCategory.add(prevMovie);
                }
            });
            movieRepository.saveAll(toRemoveCategory);

            Category finalCategory = category;
            movies.forEach(movie -> movie.setCategory(finalCategory));
            movieRepository.saveAll(movies);
        }

        return category;
    }

}
