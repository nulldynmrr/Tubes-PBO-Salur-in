package com.tubes.salurin.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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
    public List<CampaignResponse> getAllCampaigns(){
        return campaignRepo.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CampaignResponse getCampaignById(Long id){
        Campaign campaign = campaignRepo.findById(id).orElseThrow();
        return toDto(campaign);
    }

    private CampaignResponse toDto(Campaign c){
        CampaignResponse dto = new CampaignResponse();
        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setDescription(c.getDescription());
        dto.setTargetAmount(c.getTargetAmount());
        dto.setAccumulated(c.getAccumulated());
        dto.setImagePath(c.getImagePath());
        dto.setProposalPdfPath(c.getProposalPdfPath());
        dto.setStatus(c.getStatus());
        dto.setStartDate(c.getDateStart());
        dto.setEndDate(c.getDateEnd());
        dto.setKategori(c.getCategory());
        dto.setAlamat(c.getAddress());
        return dto;
    }
}
