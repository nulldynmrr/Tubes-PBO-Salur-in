package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    Optional<Donor> findByEmail(String email);
}
