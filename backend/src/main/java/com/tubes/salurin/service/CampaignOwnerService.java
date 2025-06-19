package com.tubes.salurin.service;

import java.util.List;

import com.tubes.salurin.dto.CampaignDTO;
import com.tubes.salurin.dto.CreateCampaignRequest;
import com.tubes.salurin.dto.OwnerDashboardDTO;

public interface CampaignOwnerService {
    OwnerDashboardDTO getDashboardByEmail(String email);
    List<CampaignDTO> getCampaignsByEmail(String email);
    void submitCampaign(CreateCampaignRequest request);
}
