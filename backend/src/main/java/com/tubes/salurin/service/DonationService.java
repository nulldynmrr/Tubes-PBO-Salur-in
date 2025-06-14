package com.tubes.salurin.service;

import com.tubes.salurin.model.Campaign;
import com.tubes.salurin.model.Donation;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.repository.DonationRepository;
import com.tubes.salurin.interfaces.Donateable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class DonationService implements Donateable {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;

    @Override
    @Transactional
    public void donate(Donation donation) {
        Campaign campaign = donation.getCampaign();

        if (campaign == null) {
            throw new IllegalArgumentException("Campaign tidak boleh null");
        }

        campaign.donate(donation);

        campaignRepository.save(campaign);
        donationRepository.save(donation); 
    }
}
