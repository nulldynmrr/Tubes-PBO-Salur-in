package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.CampaignOwner;

public interface CampaignOwnerRepository extends JpaRepository<CampaignOwner, Long> {
    Optional<CampaignOwner> findByEmail(String email);
}