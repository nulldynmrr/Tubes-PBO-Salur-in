package com.tubes.salurin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tubes.salurin.dto.DonationRequest;
import com.tubes.salurin.service.DonationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping("/{campaignId}/donate")
    public ResponseEntity<?> donate(@PathVariable Long campaignId, @RequestBody DonationRequest request){
        return ResponseEntity.ok(donationService.createDonation(campaignId, request));
    }
}
