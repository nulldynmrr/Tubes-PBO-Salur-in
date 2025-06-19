package com.tubes.salurin.service;

import java.util.List;

import com.tubes.salurin.dto.CampaignResponse;

public interface CampaignService {
    List<CampaignResponse> getAllCampaigns();
    CampaignResponse getCampaignById(Long id);
}
