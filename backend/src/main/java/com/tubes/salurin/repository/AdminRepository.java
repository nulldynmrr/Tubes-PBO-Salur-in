package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}