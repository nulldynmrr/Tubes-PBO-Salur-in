package com.tubes.salurin.service;

import com.tubes.salurin.dto.CampaignProposalRequest;
import com.tubes.salurin.dto.CampaignResponse;

import java.util.List;

public interface CampaignService {
    CampaignResponse createCampaign(CampaignProposalRequest request);
    List<CampaignResponse> getMyCampaigns();
    List<CampaignResponse> getAllCampaigns();
    CampaignResponse getCampaignById(Long id);
    CampaignResponse updateCampaign(Long id, CampaignProposalRequest request);
    void deleteCampaign(Long id);
}
