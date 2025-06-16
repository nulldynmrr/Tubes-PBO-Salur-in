package com.tubes.salurin.service;

import com.tubes.salurin.dto.DonationRequest;
import com.tubes.salurin.dto.DonationResponse;

import java.util.List;

public interface DonationService {
    DonationResponse createDonation(DonationRequest request);
    List<DonationResponse> getMyDonations();
    List<DonationResponse> getAllDonations();
    DonationResponse getDonationDetail(Long id);
}
