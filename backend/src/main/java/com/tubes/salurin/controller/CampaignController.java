package com.tubes.salurin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public class CampaignController {
    // Di CampaignController (baru, atau yang sudah ada)
    @GetMapping("/campaigns")
    public ResponseEntity<List<CampaignDTO>> getAllCampaigns() {
        List<CampaignDTO> campaigns = campaignService.findAllCampaigns(); // Dari Service Layer
        return ResponseEntity.ok(campaigns);
    }
}
    