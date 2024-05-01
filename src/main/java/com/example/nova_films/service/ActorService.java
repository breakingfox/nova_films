package com.example.nova_films.service;

import com.example.nova_films.dto.ActorRequest;
import com.example.nova_films.entity.Actor;

public interface ActorService {
    Actor addActor(ActorRequest request);

    Actor updateActor(Long actorId, ActorRequest request);
}
