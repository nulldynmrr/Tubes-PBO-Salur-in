package com.tubes.salurin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tubes.salurin.dto.CampaignDTO;
import com.tubes.salurin.dto.CreateCampaignRequest;
import com.tubes.salurin.service.CampaignOwnerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owner")
@RequiredArgsConstructor
public class CampaignOwnerController {

    private final CampaignOwnerService ownerService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardData(@RequestParam String email){
        return ResponseEntity.ok(ownerService.getDashboardByEmail(email));
    }

    @GetMapping("/campaigns")
    public ResponseEntity<List<CampaignDTO>> getCampaignsByOwnerEmail(@RequestParam String email){
        return ResponseEntity.ok(ownerService.getCampaignsByEmail(email));
    }

    @PostMapping("/proposal")
    public ResponseEntity<String> submitCampaignProposal(@ModelAttribute CreateCampaignRequest request){
        try {
            ownerService.submitCampaign(request);
            return ResponseEntity.ok("Campaign proposal berhasil dikirimkan.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Gagal submit campaign: " + e.getMessage());
        }
    }

}
