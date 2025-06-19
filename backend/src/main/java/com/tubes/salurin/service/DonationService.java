package com.tubes.salurin.service;

import com.tubes.salurin.dto.DonationRequest;
import com.tubes.salurin.entity.Donation;

public interface DonationService {
    Donation createDonation(Long campaignId, DonationRequest request);
}
