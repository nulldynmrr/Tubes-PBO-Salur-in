package com.tubes.salurin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByOwner_Id(Long ownerId);
    List<Campaign> findByApprovedTrue();
}