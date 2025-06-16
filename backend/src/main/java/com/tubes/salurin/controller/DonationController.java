package com.tubes.salurin.controller;

import com.tubes.salurin.dto.DonationRequest;
import com.tubes.salurin.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donaters/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<?> donate(@RequestBody DonationRequest request) {
        return ResponseEntity.ok(donationService.createDonation(request));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyDonations() {
        return ResponseEntity.ok(donationService.getMyDonations());
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.getDonationDetail(id));
    }
}
