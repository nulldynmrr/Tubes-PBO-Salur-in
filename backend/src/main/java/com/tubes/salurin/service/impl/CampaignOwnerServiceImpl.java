package com.tubes.salurin.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tubes.salurin.dto.CampaignDTO;
import com.tubes.salurin.dto.CreateCampaignRequest;
import com.tubes.salurin.dto.OwnerDashboardDTO;
import com.tubes.salurin.entity.Campaign;
import com.tubes.salurin.entity.CampaignOwner;
import com.tubes.salurin.repository.CampaignOwnerRepository;
import com.tubes.salurin.service.CampaignOwnerService;
import com.tubes.salurin.service.FileStorageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampaignOwnerServiceImpl implements CampaignOwnerService {
    private final CampaignOwnerRepository campaignOwnerRepository;
    private final FileStorageService fileStorageService;

    @Override
    public OwnerDashboardDTO getDashboardByEmail(String email){
        CampaignOwner owner = campaignOwnerRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Campaign owner not found with email: " + email));
        
        return new OwnerDashboardDTO(
            owner.getId(),
            owner.getName(),
            owner.getEmail()
        );
    }

    @Override
    public List<CampaignDTO> getCampaignsByEmail(String email){
        CampaignOwner owner = campaignOwnerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner tidak ditemukan dengan email " + email));

        return owner.getCampaigns().stream()
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
    public void submitCampaign(CreateCampaignRequest request){
        CampaignOwner owner = campaignOwnerRepository.findByEmail(request.getOwnerEmail())
            .orElseThrow(() -> new RuntimeException("Owner tidak ditemukan"));

        try {
            String imagePath = fileStorageService.save(request.getImageFile(), "images");
            String pdfPath = fileStorageService.save(request.getProposalFile(), "proposals");

            Campaign campaign = new Campaign();
            campaign.setOwner(owner);
            campaign.setTitle(request.getTitle());
            campaign.setDescription(request.getDescription());
            campaign.setCategory(request.getCategory());
            campaign.setAddress(request.getAddress());
            campaign.setTargetAmount(request.getTargetAmount());
            campaign.setDateStart(request.getDateStart());
            campaign.setDateEnd(request.getDateEnd());
            campaign.setImagePath(imagePath);
            campaign.setProposalPdfPath(pdfPath);
            campaign.setApproved(false);
            campaign.setStatus("PENDING");

            owner.getCampaigns().add(campaign);
            campaignOwnerRepository.save(owner);
        } catch (IOException e) {
            throw new RuntimeException("Gagal menyimpan file: " + e.getMessage());
        }
    }
}