package com.example.nova_films.entity;

import com.example.nova_films.dto.MovieDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "release_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    @Column(name = "description")
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "thumbnail_image_id", referencedColumnName = "id")
    private Image thumbnail;

    @Column(name = "video_url")
    private String videoUrl;

    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    @JsonManagedReference
    private Set<Review> reviews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    @JsonManagedReference
    private Set<WatchHistory> watchHistories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "movie", orphanRemoval = true)
    @JsonManagedReference
    private Set<MovieCast> movieCasts = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "category")
    @JoinColumn(name = "category_id")
    private Category category;
}