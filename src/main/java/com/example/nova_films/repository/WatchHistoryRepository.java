package com.example.nova_films.repository;

import com.example.nova_films.entity.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long>, JpaSpecificationExecutor<WatchHistory> {
}