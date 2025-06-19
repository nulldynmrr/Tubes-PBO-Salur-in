package com.tubes.salurin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tubes.salurin.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getAdminDashboard(@RequestParam String email){
        return ResponseEntity.ok(adminService.getAdminByEmail(email));
    }
    
    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approveCampaign(@PathVariable Long id){
        adminService.approveCampaign(id);
        return ResponseEntity.ok("Campaign approved");
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<?> rejectCampaign(@PathVariable Long id){
        adminService.rejectCampaign(id);
        return ResponseEntity.ok("Campaign rejected");
    }

    @GetMapping("/owners")
    public ResponseEntity<?> getAllOwners(){
        return ResponseEntity.ok(adminService.getAllCampaignOwners());
    }

    @DeleteMapping("/owners/{id}")
    public ResponseEntity<?> deleteOwner(@PathVariable Long id){
        adminService.deleteOwnerById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/campaigns/{id}")
    public ResponseEntity<?> deleteCampaign(@PathVariable Long id){
        adminService.deleteCampaignById(id);
        return ResponseEntity.ok().build();
    }
}
