package com.tubes.salurin.controller;

import com.tubes.salurin.dto.CampaignProposalRequest;
import com.tubes.salurin.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/campaigners/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CampaignProposalRequest request) {
        return ResponseEntity.ok(campaignService.createCampaign(request));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyCampaigns() {
        return ResponseEntity.ok(campaignService.getMyCampaigns());
    }

    @GetMapping
    public ResponseEntity<?> getAllCampaigns() {
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(campaignService.getCampaignById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CampaignProposalRequest request) {
        return ResponseEntity.ok(campaignService.updateCampaign(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.ok().build();
    }
}
