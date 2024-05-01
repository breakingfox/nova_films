package com.example.nova_films.dto;

import com.example.nova_films.entity.Role;

import java.util.Collection;

public record UserRequest (String name, Role role) {
}
