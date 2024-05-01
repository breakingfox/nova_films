package com.example.nova_films.controller;

import com.example.nova_films.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RolesController {
    @GetMapping
    public Role[] findAll() {
        return Role.values();
    }
}
