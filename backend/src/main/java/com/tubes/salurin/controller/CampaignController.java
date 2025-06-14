package com.tubes.salurin.controller;

import com.tubes.salurin.dto.CampaignRequest; 
import com.tubes.salurin.dto.CampaignResponse; 
import com.tubes.salurin.model.Campaign; 
import com.tubes.salurin.service.CampaignService; 

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.web.bind.annotation.*;

import java.util.Collections; 
import java.util.List; 
import jakarta.validation.Valid; 

@RestController
@RequestMapping("/api/campaign") 
@RequiredArgsConstructor
@PreAuthorize("hasRole('CAMPAIGNER')") 
public class CampaignController {

    private final CampaignService campaignService; 
    @PostMapping("/campaign")
    public ResponseEntity<CampaignResponse> createCampaign(@Valid @RequestBody CampaignRequest request) {
        try {
            Campaign createdCampaign = campaignService.createCampaign(request);
        
            CampaignResponse response = CampaignResponse.builder()
                .id(createdCampaign.getId())
                .campaignTitle(createdCampaign.getCampaignTitle())
                .description(createdCampaign.getDescription())
                .targetAmount(createdCampaign.getTargetAmount())
                .accumulatedAmount(createdCampaign.getAccumulatedAmount())
                .startDate(createdCampaign.getStartDate())
                .endDate(createdCampaign.getEndDate())
                .open(createdCampaign.getOpen()) 
                .message("Campaign berhasil dibuat dan menunggu verifikasi admin.")
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CampaignResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CampaignResponse("Terjadi kesalahan internal server: " + e.getMessage()));
        }
    }
    @GetMapping("/campaign/my")
    public ResponseEntity<List<CampaignResponse>> getMyCampaigns() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName(); 
            
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(Collections.emptyList());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}