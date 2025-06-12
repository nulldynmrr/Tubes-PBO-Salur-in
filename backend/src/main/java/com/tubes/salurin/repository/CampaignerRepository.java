package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tubes.salurin.model.Campaigner;

@Repository
public interface CampaignerRepository extends JpaRepository<Campaigner, Integer> {
    Optional<Campaigner> findByEmail(String email);
}