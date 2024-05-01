package com.example.nova_films.controller;

import com.example.nova_films.dto.UserRequest;
import com.example.nova_films.entity.User;
import com.example.nova_films.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping
    public List<User> findAll() {
        return userRepository.findAll();
    }

//    @GetMapping("/{name}")
//    public Movie getMovieByName(@PathVariable String name) {
//        return movieRepository.findByNameIgnoreCase(name);
//    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        User user = userRepository.findById(id).orElse(null);

        if (request.role() != null) {
            user.setRole(request.role());
        }

        user.setName(request.name());
        return userRepository.save(user);
    }

    @PostMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteById(@PathVariable Long id) {
        userRepository.findById(id).ifPresent(userRepository::delete);
    }

    @GetMapping("/current")
    public User getUserById() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String principal = (String) authentication.getPrincipal();

        return userRepository.findByusername(principal);
    }
}
