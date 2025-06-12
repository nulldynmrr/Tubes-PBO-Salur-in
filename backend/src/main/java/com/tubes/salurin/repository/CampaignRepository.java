package com.tubes.salurin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tubes.salurin.model.Campaign;
import com.tubes.salurin.model.enums.CampaignStatus;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Integer> {
    List<Campaign> findByStatus(CampaignStatus status);
    List<Campaign> findByCampaignerId(Integer campaignerId);
    List<Campaign> findByCampaignName(String campaignName);
}