package com.tubes.salurin.controller;

import com.tubes.salurin.dto.CampaignRequest;
import com.tubes.salurin.model.Campaign;
import com.tubes.salurin.service.CampaignService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@Valid @RequestBody CampaignRequest request) {
        Campaign created = campaignService.createCampaign(request);
        return ResponseEntity.ok(created);
    }
}