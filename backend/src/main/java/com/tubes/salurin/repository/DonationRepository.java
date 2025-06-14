package com.tubes.salurin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tubes.salurin.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer> {
    List<Donation> findByDonaterId(Integer donaterId);
}