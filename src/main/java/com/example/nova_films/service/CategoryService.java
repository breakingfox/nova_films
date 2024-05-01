package com.example.nova_films.service;

import com.example.nova_films.dto.AddCategoryRequest;
import com.example.nova_films.dto.CategoryRequest;
import com.example.nova_films.entity.Category;

public interface CategoryService {
    Category addCategory(AddCategoryRequest request);

    Category updateCategory(Long categoryId, CategoryRequest request);
}
