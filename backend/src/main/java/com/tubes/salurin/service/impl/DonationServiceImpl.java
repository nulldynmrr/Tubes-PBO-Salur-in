package com.tubes.salurin.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tubes.salurin.dto.DonationRequest;
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
    private final DonationRepository donationRepo;
    private final CampaignRepository campaignRepo;
    private final DonorRepository donorRepo;

    @Override
    @Transactional
    public Donation createDonation(Long campaignId, DonationRequest request) {
        Campaign campaign = campaignRepo.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        long donorCount = donorRepo.count();
        Donor donor = new Donor();
        donor.setName("donor" + (donorCount + 1));
        donor = donorRepo.save(donor);

        Donation donation = new Donation();
        donation.setCampaign(campaign);
        donation.setDonor(donor);
        donation.setAmount(request.getAmount());
        donation.setPaymentMethod(request.getPaymentMethod());
        donation.setPaymentProvider(request.getPaymentProvider());

        double updated = campaign.getAccumulated() + request.getAmount();
        campaign.setAccumulated(updated);
        if (updated >= campaign.getTargetAmount()) {
            campaign.setStatus("COMPLETED");
        }

        campaignRepo.save(campaign);
        return donationRepo.save(donation);
    }
}
