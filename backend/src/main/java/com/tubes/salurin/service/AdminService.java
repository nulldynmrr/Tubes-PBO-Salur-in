package com.tubes.salurin.service;

import java.util.List;

import com.tubes.salurin.dto.CampaignDTO;
import com.tubes.salurin.dto.CampaignOwnerDTO;
import com.tubes.salurin.entity.Admin;

public interface AdminService {
    Admin getAdminByEmail(String email);
    void approveCampaign(Long id);
    void rejectCampaign(Long id);
    void deleteOwnerById(Long id);
    void deleteCampaignById(Long id);
    List<CampaignDTO> getAllPendingCampaigns();
    List<CampaignOwnerDTO> getAllCampaignOwners();
}
