package com.tubes.salurin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tubes.salurin.dto.CampaignProposalRequest;
import com.tubes.salurin.service.CampaignService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/campaigners/campaigns")
@RequiredArgsConstructor
public class CampaignController {
    private final CampaignService campaignService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CampaignProposalRequest request){
        return ResponseEntity.ok(campaignService.createCampaign(request));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyCampaigns(){
        return ResponseEntity.ok(campaignService.getMyCampaigns());
    }

    @GetMapping
    public ResponseEntity<?> getAllCampaigns(){
        return ResponseEntity.ok(campaignService.getAllCampaigns());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.ok(campaignService.getCampaignById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CampaignProposalRequest request){
        return ResponseEntity.ok(campaignService.updateCampaign(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        campaignService.deleteCampaign(id);
        return ResponseEntity.ok().build();
    }
}
