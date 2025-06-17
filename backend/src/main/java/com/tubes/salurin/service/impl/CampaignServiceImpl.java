package com.tubes.salurin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tubes.salurin.dto.CampaignProposalRequest;
import com.tubes.salurin.dto.CampaignResponse;
import com.tubes.salurin.entity.Campaign;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.service.CampaignService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {
    private final CampaignRepository campaignRepo;

    @Override
    public CampaignResponse createCampaign(CampaignProposalRequest request) {
        Campaign campaign = new Campaign();
        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setTargetAmount(request.getTargetAmount());
        campaign.setImagePath(request.getImagePath());
        campaign.setProposalPdfPath(request.getProposalPdfPath());
        campaign.setStatus("PENDING");
        campaignRepo.save(campaign);
        return toDto(campaign);
    }

    @Override
    public List<CampaignResponse> getMyCampaigns() {
        return campaignRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<CampaignResponse> getAllCampaigns() {
        return campaignRepo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public CampaignResponse getCampaignById(Long id) {
        Campaign campaign = campaignRepo.findById(id).orElseThrow();
        return toDto(campaign);
    }

    @Override
    public CampaignResponse updateCampaign(Long id, CampaignProposalRequest request) {
        Campaign campaign = campaignRepo.findById(id).orElseThrow();
        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setTargetAmount(request.getTargetAmount());
        campaign.setImagePath(request.getImagePath());
        campaign.setProposalPdfPath(request.getProposalPdfPath());
        campaignRepo.save(campaign);
        return toDto(campaign);
    }

    @Override
    public void deleteCampaign(Long id) {
        campaignRepo.deleteById(id);
    }

    private CampaignResponse toDto(Campaign c) {
        CampaignResponse dto = new CampaignResponse();
        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setDescription(c.getDescription());
        dto.setTargetAmount(c.getTargetAmount());
        dto.setImagePath(c.getImagePath());
        dto.setProposalPdfPath(c.getProposalPdfPath());
        dto.setStatus(c.getStatus());
        return dto;
    }
}
