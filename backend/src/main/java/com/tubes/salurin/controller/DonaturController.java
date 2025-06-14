package com.tubes.salurin.controller;

import com.tubes.salurin.dto.DonationRequest;  
import com.tubes.salurin.dto.DonationResponse; 
import com.tubes.salurin.model.Donation; 
import com.tubes.salurin.service.DonationService; 

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List; 
@RestController
@RequestMapping("/api/donaters") 
@RequiredArgsConstructor
@PreAuthorize("hasRole('DONATER')") 
public class DonaturController {
    private final DonationService donationService; 
    @PostMapping("/donations")
    public ResponseEntity<String> createDonation(@RequestBody DonationRequest request) {
        try {
            Donation donation = new Donation();
            donationService.donate(donation); 
            
            return ResponseEntity.status(HttpStatus.CREATED).body("Donasi berhasil dibuat.");
        } catch (IllegalArgumentException e) { 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Terjadi kesalahan internal: " + e.getMessage());
        }
    }

    @GetMapping("/donations/my")
    public ResponseEntity<List<DonationResponse>> getMyDonations(@RequestParam Integer donaturId) {
        try {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null); 

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}