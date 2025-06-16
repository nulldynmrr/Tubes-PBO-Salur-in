package com.tubes.salurin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tubes.salurin.dto.DonationRequest;
import com.tubes.salurin.dto.DonationResponse;
import com.tubes.salurin.entity.Campaign;
import com.tubes.salurin.entity.Donation;
import com.tubes.salurin.entity.Donor;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.repository.DonationRepository;
import com.tubes.salurin.repository.DonorRepository;
import com.tubes.salurin.service.DonationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;
    private final DonorRepository donorRepository;

    @Override
    public DonationResponse createDonation(DonationRequest request) {
        Donation donation = new Donation();
        donation.setAmount(request.getAmount());
        donation.setMessage(request.getMessage());

        Campaign campaign = campaignRepository.findById(request.getCampaignId())
            .orElseThrow(() -> new RuntimeException("Campaign not found"));
        donation.setCampaign(campaign);
        Donor donor = donorRepository.findById(request.getDonorId())
            .orElseThrow(() -> new RuntimeException("Donor not found"));
        donation.setDonor(donor);

        donationRepository.save(donation);
        return toDto(donation);
    }

    @Override
    public List<DonationResponse> getMyDonations() {
        return donationRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<DonationResponse> getAllDonations() {
        return donationRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public DonationResponse getDonationDetail(Long id) {
        Donation donation = donationRepository.findById(id).orElseThrow();
        return toDto(donation);
    }

    private DonationResponse toDto(Donation d) {
        DonationResponse dto = new DonationResponse();
        dto.setId(d.getId());
        dto.setAmount(d.getAmount());
        dto.setDonorName(d.getDonor().getName());
        dto.setMessage(d.getMessage());
        dto.setCampaignId(d.getCampaign().getId());
        return dto;
    }
}
