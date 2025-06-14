package com.tubes.salurin.service;

import com.tubes.salurin.dto.CampaignRequest;
import com.tubes.salurin.model.Campaign;
import com.tubes.salurin.model.Campaigner;
import com.tubes.salurin.repository.CampaignRepository;
import com.tubes.salurin.repository.CampaignerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CampaignerRepository campaignerRepository;

    public Campaign createCampaign(CampaignRequest request){
        Campaigner campaigner = campaignerRepository.findById(request.getCampaignerId())
            .orElseThrow(() -> new RuntimeException("Campaigner tidak ditemukan"));

        if (request.getTargetAmount() <= 0) {
            throw new IllegalArgumentException("Target dana harus lebih dari 0");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new IllegalArgumentException("Tanggal selesai tidak boleh sebelum tanggal mulai");
        }

        if (campaignRepository.findByCampaignTitle(request.getCampaignTitle()).isPresent()) {
            throw new RuntimeException("Judul campaign sudah digunakan");
        }

        Campaign campaign = new Campaign();
        campaign.setCampaignTitle(request.getCampaignTitle());
        campaign.setDescription(request.getDescription());
        campaign.setTargetAmount(request.getTargetAmount());
        campaign.setStartDate(request.getStartDate());
        campaign.setEndDate(request.getEndDate());
        campaign.setAccumulatedAmount(0);
        campaign.setCampaigner(campaigner);
        campaign.setOpen(false); // harus diverifikasi admin

        return campaignRepository.save(campaign);
    }
}
