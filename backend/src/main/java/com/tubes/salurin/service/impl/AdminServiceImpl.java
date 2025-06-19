package com.tubes.salurin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tubes.salurin.dto.CampaignDTO;
import com.tubes.salurin.dto.CampaignOwnerDTO;
import com.tubes.salurin.entity.Admin;
import com.tubes.salurin.entity.Campaign;
import com.tubes.salurin.entity.CampaignOwner;
import com.tubes.salurin.repository.AdminRepository;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final CampaignRepository campaignRepo;
    private final CampaignOwnerRepository ownerRepo;
    private final AdminRepository adminRepository;

    @Override
    public Admin getAdminByEmail(String email){
        return adminRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Admin tidak ditemukan dengan email " + email));
    }
    @Override
    public void approveCampaign(Long id){
        Campaign campaign = campaignRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign tidak ditemukan"));
        campaign.setApproved(true);
        campaign.setStatus("ONGOING");
        campaignRepo.save(campaign);
    }

    @Override
    public void rejectCampaign(Long id){
        Campaign campaign = campaignRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign tidak ditemukan"));
        campaign.setApproved(false);
        campaign.setStatus("REJECTED");
        campaignRepo.save(campaign);
    }

    @Override
    public void deleteOwnerById(Long id){
        CampaignOwner owner = ownerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign owner tidak ditemukan"));
        ownerRepo.delete(owner);
    }

    @Override
    public void deleteCampaignById(Long id){
        Campaign campaign = campaignRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign tidak ditemukan"));
        campaignRepo.delete(campaign);
    }

    @Override
    public List<CampaignDTO> getAllPendingCampaigns(){
        return campaignRepo.findByApprovedFalse()
                .stream()
                .map(c -> new CampaignDTO(
                        c.getId(),
                        c.getTitle(),
                        c.getDescription(),
                        c.getTargetAmount(),
                        c.getAccumulated(),
                        c.getStatus(),
                        c.getDateEnd().toString()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<CampaignOwnerDTO> getAllCampaignOwners(){
        return ownerRepo.findAll().stream()
                .map(o -> new CampaignOwnerDTO(
                        o.getId(),
                        o.getName(),
                        o.getEmail(),
                        o.getPhone(),
                        o.getOrganization()))
                .collect(Collectors.toList());
    }
}
