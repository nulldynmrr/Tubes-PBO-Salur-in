package com.tubes.salurin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tubes.salurin.model.Campaign;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Integer> {
    Optional<Campaign> findByCampaignTitle(String campaignTitle);
}