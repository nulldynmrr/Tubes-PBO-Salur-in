package com.tubes.salurin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tubes.salurin.entity.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByCampaignId(Long campaignId);
}