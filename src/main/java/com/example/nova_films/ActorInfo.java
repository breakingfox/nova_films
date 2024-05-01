package com.example.nova_films;

import com.example.nova_films.entity.Actor;

/**
 * Projection for {@link Actor}
 */
public interface ActorInfo {
    Long getId();

    String getName();
}