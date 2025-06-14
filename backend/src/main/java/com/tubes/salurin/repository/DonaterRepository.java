package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tubes.salurin.model.Donater;

@Repository
public interface DonaterRepository extends JpaRepository<Donater, Integer> {
    Optional<Donater> findByEmail(String email);
}