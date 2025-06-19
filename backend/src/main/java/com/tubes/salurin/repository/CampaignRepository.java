package com.tubes.salurin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByOwnerId(Long ownerId);
    List<Campaign> findByStatus(String status);
    List<Campaign> findByApprovedTrue();
    List<Campaign> findByApprovedFalse();
}